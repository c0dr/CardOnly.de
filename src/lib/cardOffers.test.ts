import { getActiveCardOffer, getOfferTimingLabel } from './cardOffers';
import { Card } from '../types';

const card: Card = {
  id: 'offer-card',
  Issuer: 'Offer Card',
  offer: {
    title: '50 EUR Bonus',
    description: 'Nach drei Kartenzahlungen.',
    endsAt: '2026-10-08',
  },
};

it('returns an offer through its final day', () => {
  expect(getActiveCardOffer(card, new Date(2026, 9, 8, 23, 59))).toEqual(card.offer);
});

it('hides an expired offer automatically', () => {
  expect(getActiveCardOffer(card, new Date(2026, 9, 9, 0, 1))).toBeNull();
});

it('formats near-term offer timing', () => {
  expect(getOfferTimingLabel('2026-10-08', new Date(2026, 9, 8, 12))).toBe('Endet heute');
  expect(getOfferTimingLabel('2026-10-08', new Date(2026, 9, 7, 12))).toBe('Noch 1 Tag');
  expect(getOfferTimingLabel('2026-10-08', new Date(2026, 9, 1, 12))).toBe('Noch 7 Tage');
});
