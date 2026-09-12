import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '../components/ui/button';

const CtaBand: React.FC = () => {
  const jumpToComparison = () => {
    document.getElementById('vergleich')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="pb-4 pt-14">
      <div className="relative overflow-hidden rounded-2xl bg-[#0b1220] px-6 py-12 text-center shadow-lift sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl"
        />
        <h2 className="relative text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Noch unsicher, welche Karte zu dir passt?
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
          Filtere alle Karten nach dem, was dir wichtig ist – Jahresgebühr, Auslandsgebühren oder Bargeld. Der Vergleich zeigt dir in Sekunden die Treffer.
        </p>
        <div className="relative mt-7 flex justify-center">
          <Button
            size="lg"
            onClick={jumpToComparison}
            className="h-12 rounded-lg bg-white px-7 text-sm font-semibold text-slate-900 shadow-none hover:bg-slate-100"
          >
            Jetzt filtern & vergleichen
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaBand;
