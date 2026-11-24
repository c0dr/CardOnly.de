import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import CardCard from '../CardComponents/CardCard';
import ScoreMethodology from '../CommonComponents/ScoreMethodology';
import { getCardRating } from './cardRatings';
import { Card } from '../types';

const card: Card = {
  id: 'score-fixture', Issuer: 'Beispielkarte', charge: 'credit', yearlyFee: 0,
  fees_pos_foreign: 0, fees_atm_eur: 0, fees_atm_foreign: 0,
  image: '/example.png', insurance: false, secure: false, miles: false,
};

describe('category scores', () => {
  it('evaluates the same card differently for the four disclosed criteria sets', () => {
    expect(getCardRating(card).score).toBe(84);
    expect(getCardRating(card, 'cashback').score).toBe(62);
    expect(getCardRating(card, 'atmOutsideEurope').score).toBe(90);
    expect(getCardRating(card, 'freeCards').score).toBe(93);
    expect(getCardRating({ ...card, adlink: 'https://example.com/partner' }).score).toBe(84);
  });

  it('shows the selected category score on the product card rather than the overall score', () => {
    const html = renderToStaticMarkup(<CardCard card={card} cols={[]} index={0} simple ratingProfileKey="cashback" />);
    expect(html).toContain('62/100');
    expect(html).not.toContain('84/100');
    expect(html).not.toContain('Empfehlung');
  });

  it('explains the selected category weights instead of a fixed overall method', () => {
    const html = renderToStaticMarkup(<ScoreMethodology profileKey="cashback" />);
    expect(html).toMatch(/Jahresgebühr[\s\S]*?30[\s\S]*?Punkte/);
    expect(html).toMatch(/Bonusprogramme[\s\S]*?30[\s\S]*?Punkte/);
    expect(html).not.toContain('Pro Euro Gebühr sinkt der Score um ca. 2 Punkte');
  });
});
