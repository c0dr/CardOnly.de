import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import CompareTable from './CompareTable';
import { Button } from '../components/ui/button';
import { clearCompareIssuers, getCompareIssuers, setCompareIssuers } from '../lib/compareSelection';

const ComparePage = () => {
  const [cards, setCards] = useState([]);
  const [comparedIssuers, setComparedIssuers] = useState(() => getCompareIssuers());

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
    () => comparedIssuers.map((issuer) => cards.find((card) => card.Issuer === issuer)).filter(Boolean),
    [comparedIssuers, cards]
  );

  const handleRemove = (issuer) => {
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
          <h1 className="text-3xl font-bold text-slate-900">Kartenvergleich</h1>
          <p className="mt-1 text-sm text-slate-600">Vergleiche bis zu 3 ausgewählte Karten im direkten Raster.</p>
        </div>
        <Button asChild variant="outline" className="rounded-full border-slate-300">
          <Link to="/">Zurück zum Vergleich</Link>
        </Button>
      </div>

      {comparedCards.length === 0 ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Noch keine Karten ausgewählt</h2>
          <p className="mt-2 text-sm text-slate-600">
            Gehe zur Hauptseite und markiere bis zu 3 Karten mit dem Button "Vergleichen".
          </p>
          <Button asChild className="mt-4 rounded-full">
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
