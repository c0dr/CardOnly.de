import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import CompareTable from './CompareTable';
import { Button } from '../components/ui/button';
import { clearCompareIssuers, getCompareIssuers, setCompareIssuers } from '../lib/compareSelection';
import { Card } from '../types';

const ComparePage: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [comparedIssuers, setComparedIssuers] = useState<string[]>(() => getCompareIssuers());

  useEffect(() => {
    fetch('data/cards.json')
      .then((response) => response.json())
      .catch(console.log)
      .then((data) => setCards(data));
  }, []);

  useEffect(() => {
    setCompareIssuers(comparedIssuers);
  }, [comparedIssuers]);

  const comparedCards = useMemo(
    () => comparedIssuers.map((issuer) => cards.find((card) => card.Issuer === issuer)).filter((card): card is Card => !!card),
    [comparedIssuers, cards]
  );

  const handleRemove = (issuer: string) => {
    setComparedIssuers((prev) => prev.filter((entry) => entry !== issuer));
  };

  const handleClear = () => {
    setComparedIssuers([]);
    clearCompareIssuers();
  };

  return (
    <div className="container px-4 py-6 md:py-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-stone-950">Kartenvergleich</h1>
          <p className="mt-1 text-sm text-stone-600">Vergleiche bis zu 3 ausgewaehlte Karten im direkten Raster.</p>
        </div>
        <Button asChild variant="outline" className="rounded-md border-stone-300">
          <Link to="/">Zurück zum Vergleich</Link>
        </Button>
      </div>

      {comparedCards.length === 0 ? (
        <section className="rounded-lg border border-stone-300 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-stone-950">Noch keine Karten ausgewaehlt</h2>
          <p className="mt-2 text-sm text-stone-600">
            Gehe zur Hauptseite und markiere bis zu 3 Karten mit dem Button "Vergleichen".
          </p>
          <Button asChild className="mt-4 rounded-md">
            <Link to="/">Karten auswählen</Link>
          </Button>
        </section>
      ) : (
        <CompareTable cards={comparedCards} onRemove={handleRemove} onClear={handleClear} />
      )}
    </div>
  );
};

export default ComparePage;
