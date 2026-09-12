import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import CompareTable from './CompareTable';
import { Button } from '../components/ui/button';
import AtmFeeNotice from '../CommonComponents/AtmFeeNotice';
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
          <h1 className="text-3xl font-bold text-foreground">Kartenvergleich</h1>
          <p className="mt-1 text-sm text-muted-foreground">Vergleiche bis zu 3 ausgewaehlte Karten im direkten Raster.</p>
        </div>
        <Button asChild variant="outline" className="rounded-md border-border">
          <Link to="/">Zurück zum Vergleich</Link>
        </Button>
      </div>

      <div className="mb-4">
        <AtmFeeNotice />
      </div>

      {comparedCards.length === 0 ? (
        <section className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-xl font-semibold text-foreground">Noch keine Karten ausgewaehlt</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Gehe zur Hauptseite und markiere bis zu 3 Karten mit dem Button "Vergleichen".
          </p>
          <Button asChild className="mt-4 rounded-lg">
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
