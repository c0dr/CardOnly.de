import { Card, RatingProfile } from '../types';

const locale = 'de';

const clamp = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max);

const textValue = (value: any) =>
  String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export const isZeroLike = (value: any): boolean => {
  if (value === 0) {
    return true;
  }

  if (value === null || value === undefined || value === '' || value === 'null') {
    return false;
  }

  if (typeof value === 'number') {
    return value <= 0;
  }

  const normalized = textValue(value)
    .replace(/\s+/g, '')
    .replace(/,/g, '.');

  return (
    normalized.includes('gebuhrenfrei') ||
    normalized.includes('kostenlos') ||
    /^0(\.0+)?(€|eur|euro)?ab100(€|eur|euro)?/.test(normalized) ||
    /^0(\.0+)?(%|eur|euro)?$/.test(normalized)
  );
};

const parseNumber = (value: any): number | null => {
  if (value === null || value === undefined || value === '' || value === 'null') {
    return null;
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  const match = String(value).replace(',', '.').match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : null;
};

const hasTextSignal = (card: Card, signals: string[]) => {
  const haystack = textValue([card.Issuer, card.Label, card.notes, card.legalnotes].filter(Boolean).join(' '));
  return signals.some((signal) => haystack.includes(signal));
};

export const hasCashbackSignal = (card: Card) =>
  hasTextSignal(card, ['cashback', 'payback', 'gutschrift', 'ruckvergutung', 'punkte', 'membership rewards']);

const hasRewardsSignal = (card: Card) => card.miles === true || hasCashbackSignal(card);

const hasCashAdvanceInterestSignal = (card: Card) =>
  card.cashAdvanceImmediate === true ||
  hasTextSignal(card, [
    'abhebungen werden ab',
    'bargeldabhebungen werden ab',
    'ab buchungstag verzinst',
    'sofort mit',
    'sofortiger verzinsung',
    'nicht ganz kostenlos',
  ]);

const hasRepaymentRiskSignal = (card: Card) =>
  hasTextSignal(card, [
    'teilzahlung standardmaessig',
    'teilzahlung standardmassig',
    'manueller ausgleich',
    'keine zinsfreien tage',
    'mindesttilgung',
  ]);

const annualFeeCurve = [
  { fee: 0, score: 1 },
  { fee: 12, score: 0.9 },
  { fee: 36, score: 0.72 },
  { fee: 60, score: 0.52 },
  { fee: 96, score: 0.3 },
  { fee: 144, score: 0.12 },
  { fee: 240, score: 0 },
];

const annualFeeScore = (card: Card, maxPoints: number) => {
  const fee = parseNumber(card.yearlyFee);

  if (fee === null) {
    return maxPoints * 0.2;
  }

  if (fee <= 0) {
    return maxPoints;
  }

  let lower = annualFeeCurve[0];
  for (const point of annualFeeCurve) {
    if (fee >= point.fee) {
      lower = point;
    }
  }

  const upper = annualFeeCurve.find((point) => fee <= point.fee) || annualFeeCurve[annualFeeCurve.length - 1];

  if (lower === upper) {
    return maxPoints * lower.score;
  }

  const progress = (fee - lower.fee) / (upper.fee - lower.fee);
  const score = lower.score + (upper.score - lower.score) * progress;

  return clamp(maxPoints * score, 0, maxPoints);
};

const percentFeeScore = (value: any, maxPoints: number) => {
  if (isZeroLike(value)) {
    return maxPoints;
  }

  const percent = parseNumber(value);
  if (percent === null) {
    return 0;
  }

  if (percent <= 1) {
    return maxPoints * 0.72;
  }

  if (percent <= 1.7) {
    return maxPoints * 0.58;
  }

  if (percent <= 2.2) {
    return maxPoints * 0.36;
  }

  return maxPoints * 0.12;
};

const foreignPaymentScore = (card: Card, maxPoints: number) => {
  if (isZeroLike(card.fees_pos_foreign)) return maxPoints;
  const percent = parseNumber(card.fees_pos_foreign);
  if (percent === null) return 0;
  if (percent <= 1) return maxPoints * 0.3;
  return 0;
};

const atmOutsideEuropeScore = (card: Card, maxPoints: number) => {
  let score = percentFeeScore(card.fees_atm_foreign, maxPoints);

  if (score === 0 && isZeroLike(card.fees_atm_eur)) {
    score = maxPoints * 0.25;
  }

  if (hasCashAdvanceInterestSignal(card)) {
    score -= maxPoints * 0.25;
  }

  return clamp(score, 0, maxPoints);
};

const flexibilityScore = (card: Card, maxPoints: number) => {
  if (card.charge === 'credit') return maxPoints;
  if (card.charge === 'charge') return maxPoints * 0.85;
  if (card.charge === 'debit') return maxPoints * 0.5;
  if (card.charge === 'prepaid') return maxPoints * 0.25;
  return maxPoints * 0.2;
};

const safetyBenefitScore = (card: Card, maxPoints: number) => {
  if (card.insurance) return maxPoints;
  if (card.secure) return maxPoints * 0.5;
  return 0;
};

const rewardsScore = (card: Card, maxPoints: number) => {
  let score = 0;

  if (hasTextSignal(card, ['cashback'])) {
    score = Math.max(score, maxPoints);
  }

  if (hasTextSignal(card, ['payback'])) {
    score = Math.max(score, maxPoints * 0.9);
  }

  if (hasTextSignal(card, ['gutschrift', 'ruckvergutung'])) {
    score = Math.max(score, maxPoints * 0.68);
  }

  if (hasTextSignal(card, ['membership rewards', 'mr punkt', 'punkte'])) {
    score = Math.max(score, maxPoints * 0.62);
  }

  if (card.miles === true) {
    score = Math.max(score, maxPoints * 0.58);
  }

  return clamp(score, 0, maxPoints);
};

const riskPenalty = (card: Card) => {
  const cashAdvanceApr = parseNumber(card.cashAdvanceApr);
  const interestApr = parseNumber(card.interestApr);
  let penalty = 0;

  if (hasCashAdvanceInterestSignal(card)) {
    penalty += 4;
  }

  if (cashAdvanceApr !== null && cashAdvanceApr >= 20) {
    penalty += 2;
  }

  if (interestApr !== null && interestApr >= 20) {
    penalty += 1;
  }

  if (hasRepaymentRiskSignal(card)) {
    penalty += 4;
  }

  return penalty;
};

const scoreOverall = (card: Card) =>
  annualFeeScore(card, 40) +
  foreignPaymentScore(card, 16) +
  atmOutsideEuropeScore(card, 16) +
  flexibilityScore(card, 12) +
  safetyBenefitScore(card, 8) +
  rewardsScore(card, 8) -
  riskPenalty(card);

const scoreCashback = (card: Card) =>
  rewardsScore(card, 30) +
  annualFeeScore(card, 30) +
  foreignPaymentScore(card, 12) +
  flexibilityScore(card, 12) +
  safetyBenefitScore(card, 8) +
  atmOutsideEuropeScore(card, 8) -
  riskPenalty(card);

const scoreAtmOutsideEurope = (card: Card) =>
  atmOutsideEuropeScore(card, 36) +
  annualFeeScore(card, 28) +
  foreignPaymentScore(card, 16) +
  flexibilityScore(card, 10) +
  safetyBenefitScore(card, 10) -
  riskPenalty(card);

const scoreFreeCards = (card: Card) =>
  annualFeeScore(card, 45) +
  foreignPaymentScore(card, 19) +
  atmOutsideEuropeScore(card, 18) +
  flexibilityScore(card, 11) +
  safetyBenefitScore(card, 5) +
  rewardsScore(card, 2) -
  riskPenalty(card);

export const ratingProfiles: RatingProfile[] = [
  {
    key: 'overall',
    sortValue: 'bestOverall',
    label: 'Beste Bewertung',
    navLabel: 'Beste Karten',
    title: 'Beste Kreditkarten im Vergleich',
    description: 'Gesamtranking mit staerkerem Fokus auf Jahresgebuehr, dazu Auslandseinsatz, Bargeld, Flexibilitaet, Sicherheit und Bonuswert.',
    route: '/best',
    staticSlug: 'best-credit-cards',
    matcher: () => true,
    score: scoreOverall,
  },
  {
    key: 'cashback',
    sortValue: 'bestCashback',
    label: 'Bestes Cashback',
    navLabel: 'Cashback',
    title: 'Beste Kreditkarten fuer Cashback und Punkte',
    description: 'Ranking fuer Karten mit Cashback-, PAYBACK-, Punkte- oder Meilenwert im Alltag, abgewogen gegen die Jahresgebuehr.',
    route: '/best/cashback',
    staticSlug: 'best-for-cashback',
    matcher: hasRewardsSignal,
    score: scoreCashback,
  },
  {
    key: 'atmOutsideEurope',
    sortValue: 'bestAtmOutsideEurope',
    label: 'Beste ATM ausserhalb Europas',
    navLabel: 'ATM ausserhalb Europas',
    title: 'Beste Kreditkarten fuer Bargeld ausserhalb Europas',
    description: 'Ranking fuer Karten mit starken Konditionen bei Bargeldabhebungen ausserhalb des Euroraums und fairer Jahresgebuehr.',
    route: '/best/atm-outside-europe',
    staticSlug: 'best-for-atm-outside-europe',
    matcher: (card: Card) => isZeroLike(card.fees_atm_foreign),
    score: scoreAtmOutsideEurope,
  },
  {
    key: 'freeCards',
    sortValue: 'bestFreeCards',
    label: 'Beste kostenlose Karten',
    navLabel: 'Kostenlose Karten',
    title: 'Beste kostenlose Kreditkarten',
    description: 'Ranking fuer Karten ohne Jahresgebuehr mit starkem Alltags- und Auslandspaket.',
    route: '/best/free-cards',
    staticSlug: 'best-free-cards',
    matcher: (card: Card) => isZeroLike(card.yearlyFee),
    score: scoreFreeCards,
  },
];

export const getRatingProfile = (keyOrSortValue = 'overall'): RatingProfile =>
  ratingProfiles.find((profile) => profile.key === keyOrSortValue || profile.sortValue === keyOrSortValue) ||
  ratingProfiles[0];

export const getCardRating = (card: Card, keyOrSortValue = 'overall') => {
  const profile = getRatingProfile(keyOrSortValue);
  const rawScore = profile.score(card);
  const score = Math.round(clamp(rawScore));

  return {
    profile,
    score,
    label: `${score}/100`,
  };
};

export const compareCardsByRating = (a: Card, b: Card, keyOrSortValue = 'overall') => {
  const ratingDifference = getCardRating(b, keyOrSortValue).score - getCardRating(a, keyOrSortValue).score;

  if (ratingDifference !== 0) {
    return ratingDifference;
  }

  const feeDifference = (parseNumber(a.yearlyFee) || 0) - (parseNumber(b.yearlyFee) || 0);
  if (feeDifference !== 0) {
    return feeDifference;
  }

  return String(a.Issuer || '').localeCompare(String(b.Issuer || ''), locale);
};

export const sortCardsByRating = (cards: Card[], keyOrSortValue = 'overall') =>
  [...cards].sort((a, b) => compareCardsByRating(a, b, keyOrSortValue));

export const getCardsForRatingProfile = (cards: Card[], keyOrSortValue = 'overall') => {
  const profile = getRatingProfile(keyOrSortValue);
  return sortCardsByRating(cards.filter(profile.matcher), profile.key);
};
