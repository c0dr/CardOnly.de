import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import data from '../../public/data/cards.json';
import { Card } from '../types';
import CreditDetails from './CreditDetails';
import CardCard from './CardCard';

const cards = data as unknown as Card[];
const find = (issuer: string) => cards.find((card) => card.Issuer === issuer)!;

describe('credit disclosures on listings', () => {
  it('renders a visible source-linked section for every credit listing in both view modes', () => {
    for (const card of cards.filter((card) => card.charge === 'credit')) {
      expect(card.creditDisclosure, card.Issuer).toBeDefined();
      for (const simple of [true, false]) {
        const html = renderToStaticMarkup(<CardCard card={card} cols={[]} index={0} simple={simple} />);
        const container = document.createElement('div');
        container.innerHTML = html;
        const section = container.querySelector('section[aria-label^="Kreditkosten und Rückzahlung:"]');
        expect(section, card.Issuer).not.toBeNull();
        expect(section!.closest('details')).toBeNull();
        expect(section!.textContent).toContain('Achtung! Kreditaufnahme kostet Geld');
        expect(section!.querySelector('a')!.getAttribute('href')).toBe(card.creditDisclosure!.sourceUrl);
      }
    }
  });

  it('preserves the issuer final payment and includes the GoldCard fee explanation', () => {
    const html = renderToStaticMarkup(<CreditDetails card={find('Hanseatic Bank GoldCard')} />);
    expect(html).toContain('128,08 €');
    expect(html).toContain('4,90 € / Monat');
    expect(html).toContain('1.693,88 € inkl. Kartenentgelt');
    expect(html).toContain('25,79 %');
  });

  it('does not invent installments for Openbank or a numerical example for Miles & More', () => {
    const openbank = renderToStaticMarkup(<CreditDetails card={find('Openbank BestCard Basic')} />);
    expect(openbank).toContain('2.311,20 €');
    expect(openbank).not.toContain('Monatliche Kreditrate');
    const blue = renderToStaticMarkup(<CreditDetails card={find('Miles & More Blue Credit Card')} />);
    expect(blue).toContain('monatlich Zinsen');
    expect(blue).not.toContain('Repräsentatives Beispiel – Anbieterangaben');
  });

  it('preserves issuer figures without exposing internal verification commentary', () => {
    const html = renderToStaticMarkup(<CreditDetails card={find('Bank Norwegian')} />);
    expect(html).not.toContain('nicht vollständig stimmig');
    expect(html).toContain('1.685,00 €');
    expect(html).toContain('140,00 €');
    expect(renderToStaticMarkup(<CreditDetails card={{ id: 'debit', Issuer: 'Debit', charge: 'debit' }} />)).toBe('');
  });
});
