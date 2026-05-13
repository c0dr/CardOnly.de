import React from 'react';
import CardCard from './CardCard';
import { Card } from '../types';

interface CardsProps {
  cards: Card[];
  cols: any[];
  comparedIssuers: string[];
  onToggleCompare: (issuer: string) => void;
}

const CardComponents: React.FC<CardsProps> = ({ cards, cols, comparedIssuers, onToggleCompare }) => {
  return (
    <section className="animate-fade-up" style={{ animationDelay: '120ms' }}>
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-lg font-bold text-foreground">
          {cards.length} Karten
        </h2>
        <div className="text-[10px] leading-relaxed text-muted-foreground text-right">
          <p>* Partnerlinks (Werbung)</p>
          <p>** Sofortige Verzinsung bei Abhebung</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {cards.map((card, index) => (
          <CardCard
            key={`${card.Issuer}-${index}`}
            card={card}
            cols={cols}
            index={index}
            onToggleCompare={onToggleCompare}
            isCompared={comparedIssuers.includes(card.Issuer)}
            compareDisabled={!comparedIssuers.includes(card.Issuer) && comparedIssuers.length >= 3}
          />
        ))}
      </div>
    </section>
  );
};

export default CardComponents;
