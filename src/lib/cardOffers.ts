import { Card, CardOffer } from '../types';

const localDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseDateKey = (value: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
};

export const getActiveCardOffer = (card: Card, now = new Date()): CardOffer | null => {
  const offer = card.offer;
  if (!offer?.title || !parseDateKey(offer.endsAt)) return null;
  return offer.endsAt >= localDateKey(now) ? offer : null;
};

export const formatOfferDeadline = (endsAt: string) => {
  const date = parseDateKey(endsAt);
  return date
    ? new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date)
    : endsAt;
};

export const getOfferTimingLabel = (endsAt: string, now = new Date()) => {
  const end = parseDateKey(endsAt);
  if (!end) return `Bis ${endsAt}`;

  const today = parseDateKey(localDateKey(now));
  if (!today) return `Bis ${formatOfferDeadline(endsAt)}`;

  const days = Math.round((end.getTime() - today.getTime()) / 86_400_000);
  if (days === 0) return 'Endet heute';
  if (days === 1) return 'Noch 1 Tag';
  if (days > 1 && days <= 14) return `Noch ${days} Tage`;
  return `Bis ${formatOfferDeadline(endsAt)}`;
};
