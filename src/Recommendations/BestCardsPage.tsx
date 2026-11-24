import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Cards from '../CardComponents/Cards';
import { Button } from '../components/ui/button';
import { clearCompareIssuers, getCompareIssuers, maxCompareCards, setCompareIssuers } from '../lib/compareSelection';
import { getCardsForRatingProfile, ratingProfiles } from '../lib/cardRatings';
import ScoreMethodology from '../CommonComponents/ScoreMethodology';
import { Card } from '../types';

const routeCategoryByProfile = (profile: any) => profile.route.replace('/best/', '').replace('/best', '');

const BestCardsPage: React.FC = () => {
  const { category } = useParams();
  const [cards, setCards] = useState<Card[]>([]);
  const [cols, setCols] = useState<any[]>([]);
  const [comparedIssuers, setComparedIssuers] = useState<string[]>(() => getCompareIssuers());

  const profile = useMemo(() => {
    if (!category) {
      return ratingProfiles[0];
    }

    return ratingProfiles.find((entry) => routeCategoryByProfile(entry) === category) || null;
  }, [category]);

  useEffect(() => {
    fetch('/data/cards.json')
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch(console.log);

    fetch('/data/columns.json')
      .then((response) => response.json())
      .then((data) => setCols(data))
      .catch(console.log);
  }, []);

  useEffect(() => {
    setCompareIssuers(comparedIssuers);
  }, [comparedIssuers]);

  if (!profile) {
    return <Navigate to="/best" replace />;
  }

  const rankedCards = getCardsForRatingProfile(cards, profile.key);
  const comparedCards = comparedIssuers
    .map((issuer) => cards.find((card) => card.Issuer === issuer))
    .filter(Boolean);

  const toggleCompare = (issuer: string) => {
    setComparedIssuers((prev) => {
      if (prev.includes(issuer)) {
        return prev.filter((entry) => entry !== issuer);
      }
      if (prev.length >= maxCompareCards) {
        return prev;
      }
      return [...prev, issuer];
    });
  };

  const clearCompare = () => {
    setComparedIssuers([]);
    clearCompareIssuers();
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto max-w-7xl px-2 py-6 md:py-8 lg:px-6">
        <section className="mb-8 border-b border-border pb-7 animate-fade-up">
          <div className="max-w-3xl">
            <p className="mb-2 text-sm font-bold text-accent">Kartenvergleich</p>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              {profile.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {profile.description}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {ratingProfiles.map((entry) => (
              <Link
                key={entry.key}
                to={entry.route}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                  entry.key === profile.key
                    ? 'bg-foreground text-background'
                    : 'bg-white text-muted-foreground ring-1 ring-border hover:ring-foreground/30 hover:text-foreground'
                }`}
              >
                {entry.navLabel}
              </Link>
            ))}
          </div>

          <ScoreMethodology profileKey={profile.key} />
        </section>

        <Cards
          cards={rankedCards}
          ratingProfileKey={profile.key}
          cols={cols}
          comparedIssuers={comparedIssuers}
          onToggleCompare={toggleCompare}
        />

        {comparedCards.length > 0 && (
          <section className="fixed bottom-4 left-0 right-0 z-50 mx-auto w-full max-w-2xl px-4 animate-fade-up">
            <div className="rounded-lg bg-foreground px-4 py-3 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-sm font-bold text-white">
                    {comparedCards.length}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">Vergleichsauswahl</p>
                    <p className="hidden text-xs text-white/50 sm:block">Max. {maxCompareCards} Karten</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild size="sm" className="h-8 rounded-md bg-white px-3 text-xs font-bold text-foreground hover:bg-white/90">
                    <Link to="/compare">Vergleichen</Link>
                  </Button>
                  <button
                    className="h-8 rounded-md px-3 text-xs font-medium text-white/60 hover:text-white"
                    onClick={clearCompare}
                  >
                    Leeren
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default BestCardsPage;
