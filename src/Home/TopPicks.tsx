import React, { useMemo } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import SchemeBadge from '../CardComponents/SchemeBadge';
import UsageFees from '../CardComponents/UsageFees';
import { recommendedCardProfiles } from '../lib/recommendedCards';
import { cardHighlights } from '../lib/cardHighlights';
import { getCardRating } from '../lib/cardRatings';
import { Card } from '../types';

interface TopPicksProps {
  cards: Card[];
  onToggleCompare?: (issuer: string) => void;
}

const TopPicks: React.FC<TopPicksProps> = ({ cards }) => {
  const picks = useMemo(() => {
    return recommendedCardProfiles
      .map((profile) => {
        const card = cards.find((entry) => entry.Issuer === profile.issuer);
        return card ? { profile, card } : null;
      })
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  }, [cards]);

  if (picks.length === 0) {
    return null;
  }

  return (
    <section id="empfehlungen" className="picks-section scroll-mt-24 pb-14">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="section-kicker">DIE SHORTLIST</p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Drei Karten. Drei gute Gründe.
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Drei Empfehlungen für unterschiedliche Ansprüche. Die vollständigen Konditionen findest du im Vergleich.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {picks.map(({ profile, card }, index) => {
          const rating = getCardRating(card);
          const highlights = cardHighlights(card);
          const fee = Number(card.yearlyFee) === 0 || card.yearlyFee === '0' ? '0 €' : `${card.yearlyFee} €`;

          return (
            <article
              key={card.Issuer}
              className="pick-card relative flex flex-col bg-card"
            >
              <div className="pick-heading flex items-start justify-between gap-3">
                <span className="text-xs font-medium">
                  {profile.category}
                </span>
                <span className="pick-index">
                  0{index + 1}
                </span>
              </div>

              <div className="pick-image flex items-center justify-center">
                <img
                  src={card.image}
                  alt={card.Issuer}
                  className="max-h-full w-44 object-contain"
                />
              </div>

              <div className="pick-body flex flex-1 flex-col">
              <h3 className="text-xl font-semibold tracking-tight text-foreground">{card.Issuer}</h3>
              <div className="mt-1.5 flex items-center gap-2">
                <SchemeBadge scheme={card.scheme} />
                {card.withChecking && <span className="text-xs text-muted-foreground">mit Girokonto</span>}
                <span className="ml-auto text-xs text-muted-foreground" title={rating.label}>Score {rating.score}</span>
              </div>

              <ul className="mt-4 space-y-2 border-t border-border/70 pt-4">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-sm text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-5">
                <div className="mb-4 flex items-baseline justify-between border-t border-border/70 pt-4">
                  <span className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">{fee}</span>
                  <span className="text-xs text-muted-foreground">pro Jahr</span>
                </div>

                <UsageFees card={card} compact />

                <Button asChild className="pick-provider h-11 w-full rounded-md text-sm font-semibold shadow-none">
                  <a href={card.adlink || card.link || '#'} target="_blank" rel="noopener noreferrer">
                    Zum Anbieter
                    {(card.adlink || card.link) && card.adlink ? <span className="ml-0.5 opacity-70">*</span> : null}
                    <ArrowUpRight className="ml-auto h-4 w-4" />
                  </a>
                </Button>
                <p className="mt-2.5 text-center text-[11px] leading-4 text-muted-foreground">
                  Es gelten die Konditionen des Anbieters.
                </p>
              </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default TopPicks;
