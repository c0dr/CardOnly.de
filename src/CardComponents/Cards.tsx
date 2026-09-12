import React from 'react';
import CardCard from './CardCard';
import { Card } from '../types';

interface CardsProps {
  cards: Card[];
  cols: any[];
  comparedIssuers: string[];
  onToggleCompare: (issuer: string) => void;
  simple?: boolean;
}

const CardComponents: React.FC<CardsProps> = ({ cards, cols, comparedIssuers, onToggleCompare, simple = false }) => {
  return (
    <section>
      <div className="mb-4 flex flex-col gap-2 pb-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          {simple ? 'Alle Karten im Überblick' : `${cards.length} passende Karten`}
        </h2>
        {!simple && (
          <div className="text-[11px] leading-relaxed text-muted-foreground sm:text-right">
            <p>Anbieter-Button mit * = Partnerlink (Werbung) · * ATM gratis ab Mindestbetrag · ** sofortige Verzinsung</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {cards.map((card, index) => (
          <CardCard
            key={`${card.Issuer}-${index}`}
            card={card}
            cols={cols}
            index={index}
            onToggleCompare={onToggleCompare}
            isCompared={comparedIssuers.includes(card.Issuer)}
            compareDisabled={!comparedIssuers.includes(card.Issuer) && comparedIssuers.length >= 3}
            simple={simple}
          />
        ))}
      </div>
    </section>
  );
};

export default CardComponents;
