import { isZeroLike } from './cardRatings';
import { Card } from '../types';

export const cardHighlights = (card: Card): string[] => {
  const out: string[] = [];

  if (Number(card.yearlyFee) === 0 || isZeroLike(card.yearlyFee)) {
    out.push('0 € Jahresgebühr');
  }
  if (isZeroLike(card.fees_atm_foreign)) {
    out.push('Weltweit kostenlos Geld abheben');
  } else if (isZeroLike(card.fees_atm_eur)) {
    out.push('Kostenlos abheben im Euroraum');
  }
  if (isZeroLike(card.fees_pos_foreign)) {
    out.push('Keine Gebühr in Fremdwährung');
  }
  if (card.miles) {
    out.push('Meilen & Punkte sammeln');
  }
  if (card.insurance) {
    out.push('Reiseversicherung inklusive');
  }
  if (card.applepay && card.googlepay) {
    out.push('Apple Pay & Google Pay');
  }

  return out.slice(0, 3);
};
