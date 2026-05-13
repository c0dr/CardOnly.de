import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getRecommendedCardProfile, recommendedIssuers } from '../lib/recommendedCards';
import { Card } from '../types';

interface FeaturedCardsProps {
  cards: Card[];
}

const FeaturedCards: React.FC<FeaturedCardsProps> = ({ cards }) => {
  const cardByIssuer = new Map(cards.map((card) => [card.Issuer, card]));
  const featuredCards = recommendedIssuers.map((issuer) => cardByIssuer.get(issuer)).filter((card): card is Card => !!card);

  if (featuredCards.length === 0) {
    return null;
  }

  return (
    <section className="mb-8 animate-fade-up" style={{ animationDelay: '80ms' }}>
      <h2 className="mb-4 text-lg font-bold text-foreground">Redaktionelle Auswahl</h2>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {featuredCards.map((card) => {
          const profile = getRecommendedCardProfile(card.Issuer);
          return (
            <a
              key={card.Issuer}
              href={card.link || card.adlink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-lg bg-white p-4 ring-1 ring-border transition-all hover:ring-foreground/20 hover:shadow-sm"
            >
              <div className="relative h-12 w-[76px] flex-shrink-0">
                <img
                  alt={`${card.Issuer}`}
                  className="h-full w-full object-contain"
                  src={card.image}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-accent">{profile?.category}</p>
                <p className="truncate text-sm font-bold text-foreground">{card.Issuer}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{profile?.summary}</p>
              </div>

              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className={`text-sm font-bold ${card.yearlyFee === 0 ? 'text-accent' : 'text-foreground'}`}>
                  {card.yearlyFee === 0 ? '0 €' : `${card.yearlyFee} €`}
                </span>
                <span className="text-[10px] text-muted-foreground">pro Jahr</span>
              </div>

              <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-muted-foreground/40 transition-colors group-hover:text-foreground" />
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedCards;
