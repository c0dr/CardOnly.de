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

export const scoreMetrics = [
  { key: 'annualFee', label: 'Jahresgebühr', calculate: annualFeeScore, explanation: '0 € ergeben die volle Punktzahl. Bei 12 / 36 / 60 / 96 / 144 / 240 € Jahresgebühr werden 90 / 72 / 52 / 30 / 12 / 0 % der Punkte vergeben; dazwischen wird linear gerechnet. Fehlende Angaben erhalten 20 %.' },
  { key: 'foreignPayment', label: 'Bezahlen in Fremdwährung', calculate: foreignPaymentScore, explanation: 'Keine Gebühr: volle Punktzahl. Bis einschließlich 1 %: 30 % der Punkte. Höhere oder unbekannte Gebühren: 0 Punkte.' },
  { key: 'atm', label: 'Bargeld außerhalb des Euroraums', calculate: atmOutsideEuropeScore, explanation: 'Keine Abhebegebühr: volle Punktzahl. Gebühren bis 1 / 1,7 / 2,2 % erhalten 72 / 58 / 36 % der Punkte, höhere Gebühren 12 %. Bei fehlendem Auslandswert und gebührenfreier Euro-Abhebung: 25 %. Sofortige Verzinsung senkt diesen Teilwert um 25 % seiner maximalen Punkte.' },
  { key: 'flexibility', label: 'Kartentyp', calculate: flexibilityScore, explanation: 'Credit: volle Punktzahl; Charge: 85 %, Debit: 50 %, Prepaid: 25 %, unbekannter Kartentyp: 20 % der Punkte.' },
  { key: 'safety', label: 'Versicherungs- und Sicherheitsmerkmale', calculate: safetyBenefitScore, explanation: 'Hinterlegte Versicherung: volle Punktzahl. Sonst bei hinterlegtem Sicherheitsmerkmal: 50 %. Ohne diese Angaben: 0 Punkte. Der Versicherungsumfang wird nicht einzeln bewertet.' },
  { key: 'rewards', label: 'Bonusprogramme', calculate: rewardsScore, explanation: 'Erkannte Programme erhalten folgende Anteile: Cashback 100 %, PAYBACK 90 %, Gutschriften oder Rückvergütung 68 %, weitere Punkteprogramme 62 %, Meilen 58 %. Es zählt der höchste erkannte Anteil; keine Bewertung des individuellen Gegenwerts.' },
] as const;

type ScoreMetricKey = typeof scoreMetrics[number]['key'];
export const scoreWeights: Record<string, Record<ScoreMetricKey, number>> = {
  overall: { annualFee: 40, foreignPayment: 16, atm: 16, flexibility: 12, safety: 8, rewards: 8 },
  cashback: { annualFee: 30, foreignPayment: 12, atm: 8, flexibility: 12, safety: 8, rewards: 30 },
  atmOutsideEurope: { annualFee: 28, foreignPayment: 16, atm: 36, flexibility: 10, safety: 10, rewards: 0 },
  freeCards: { annualFee: 45, foreignPayment: 19, atm: 18, flexibility: 11, safety: 5, rewards: 2 },
};

export const scoreMethodNotes = [
  'Zusätzliche Abzüge: 4 Punkte bei erkannter sofortiger Verzinsung von Bargeld, weitere 2 Punkte ab 20 % hinterlegtem Bargeld-Jahreszins, 1 Punkt ab 20 % hinterlegtem Teilzahlungs-Jahreszins und 4 Punkte bei erkannten Rückzahlungsrisiken (z. B. voreingestellte Teilzahlung oder keine zinsfreien Tage). Mehrere Abzüge können zusammenkommen.',
  'Die Summe wird auf 0 bis 100 begrenzt und auf ganze Punkte gerundet. Bei gleichem Score entscheidet die niedrigere hinterlegte Jahresgebühr, danach der Anbietername; fehlende Jahresgebühren werden für diesen Gleichstand wie 0 € behandelt.',
  'Redaktioneller Vergleichswert auf Basis der hinterlegten Daten, keine Kundenbewertung oder individuelle Empfehlung. Textangaben werden vereinfacht ausgewertet; Mindestbeträge, feste Gebühren und Sonderbedingungen fließen nicht vollständig ein. Fehlende Daten können den Score beeinflussen.',
  'Ein höherer Score bedeutet eine höhere Punktzahl nach diesen Kriterien, keine allgemeine Überlegenheit der Karte. Persönliche Nutzung, Kreditkosten und Vertragsbedingungen sind zusätzlich zu prüfen.',
];

export const getScoreMethodology = (keyOrSortValue = 'overall') => {
  const profile = getRatingProfile(keyOrSortValue);
  const weights = scoreWeights[profile.key];
  return scoreMetrics.map((metric) => ({ key: metric.key, label: metric.label, explanation: metric.explanation, points: weights[metric.key] }));
};

const scoreForProfile = (card: Card, key: string) =>
  scoreMetrics.reduce((sum, metric) => sum + metric.calculate(card, scoreWeights[key][metric.key]), 0) - riskPenalty(card);

export const ratingProfiles: RatingProfile[] = [
  {
    key: 'overall',
    sortValue: 'bestOverall',
    label: 'Score: Gesamtvergleich',
    navLabel: 'Gesamtvergleich',
    title: 'Kreditkarten nach CardOnly-Score',
    description: 'Gesamtranking mit staerkerem Fokus auf Jahresgebuehr, dazu Auslandseinsatz, Bargeld, Flexibilitaet, Sicherheit und Bonuswert.',
    route: '/best',
    staticSlug: 'best-credit-cards',
    matcher: () => true,
    score: (card) => scoreForProfile(card, 'overall'),
  },
  {
    key: 'cashback',
    sortValue: 'bestCashback',
    label: 'Score: Bonusprogramme',
    navLabel: 'Cashback',
    title: 'Karten mit Cashback und Punkten',
    description: 'Ranking fuer Karten mit Cashback-, PAYBACK-, Punkte- oder Meilenwert im Alltag, abgewogen gegen die Jahresgebuehr.',
    route: '/best/cashback',
    staticSlug: 'best-for-cashback',
    matcher: hasRewardsSignal,
    score: (card) => scoreForProfile(card, 'cashback'),
  },
  {
    key: 'atmOutsideEurope',
    sortValue: 'bestAtmOutsideEurope',
    label: 'Score: Bargeld im Ausland',
    navLabel: 'ATM ausserhalb Europas',
    title: 'Karten für Bargeld außerhalb des Euroraums',
    description: 'Ranking fuer Karten mit starken Konditionen bei Bargeldabhebungen ausserhalb des Euroraums und fairer Jahresgebuehr.',
    route: '/best/atm-outside-europe',
    staticSlug: 'best-for-atm-outside-europe',
    matcher: (card: Card) => isZeroLike(card.fees_atm_foreign),
    score: (card) => scoreForProfile(card, 'atmOutsideEurope'),
  },
  {
    key: 'freeCards',
    sortValue: 'bestFreeCards',
    label: 'Score: Ohne Jahresgebühr',
    navLabel: 'Ohne Jahresgebühr',
    title: 'Karten ohne Jahresgebühr',
    description: 'Vergleich von Karten ohne Jahresgebühr nach den angegebenen Kriterien. Weitere Nutzungskosten können anfallen.',
    route: '/best/free-cards',
    staticSlug: 'best-free-cards',
    matcher: (card: Card) => isZeroLike(card.yearlyFee),
    score: (card) => scoreForProfile(card, 'freeCards'),
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
