import React from 'react';
import { Button } from '../components/ui/button';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

const Header = ({ filterChange, resetFilters, enabledFilters, cards }) => {
  const cardsWithoutYearlyFee = cards.filter((card) => card.yearlyFee === 0).length;
  const worldwideFreeAtm = cards.filter((card) => card.fees_atm_foreign === 0).length;
  const mobileWalletCards = cards.filter((card) => card.applepay || card.googlepay).length;

  const isFilterActive = (filterName, value) => {
    const currentValue = enabledFilters[filterName];

    if (Array.isArray(value) && Array.isArray(currentValue)) {
      return value.length === currentValue.length && value.every((entry) => currentValue.includes(entry));
    }

    return currentValue === value;
  };

  const applyPreset = (filterName, value) => {
    if (isFilterActive(filterName, value)) {
      resetFilters();
      return;
    }

    resetFilters(filterName);
    filterChange(filterName, value);
  };

  const jumpToComparison = () => {
    const comparisonSection = document.getElementById('vergleich');
    if (comparisonSection) {
      comparisonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative mb-8 overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-lg shadow-slate-900/5 backdrop-blur md:p-10 animate-fade-up">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(14,165,233,0.18),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(37,99,235,0.12),transparent_35%)]" />

      <div className="hero-pill mb-5">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
        Unabhängig kuratiert, transparent bewertet, kostenlos nutzbar
      </div>

      <div className="grid gap-7 xl:grid-cols-[1.25fr,0.75fr]">
        <div>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Kreditkarten finden, die wirklich zu deinem Nutzungsverhalten passen.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
            CardOnly.de vergleicht Konditionen für Reisen, Bargeld und mobile Zahlungen klar und ohne Werbe-Blabla.
            Du siehst auf einen Blick, welche Karte sich für dich lohnt.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button className="rounded-full px-6" onClick={jumpToComparison}>
              Jetzt vergleichen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-slate-300 bg-white/80 px-6 text-slate-700"
              onClick={() => resetFilters()}
            >
              Filter zurücksetzen
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            <Button
              variant={isFilterActive('freeATM', ['fees_atm_foreign']) ? 'default' : 'outline'}
              className="rounded-full"
              onClick={() => applyPreset('freeATM', ['fees_atm_foreign'])}
            >
              Weltweit kostenlos abheben
            </Button>
            <Button
              variant={isFilterActive('yearlyFee', 0) ? 'default' : 'outline'}
              className="rounded-full"
              onClick={() => applyPreset('yearlyFee', 0)}
            >
              Keine Jahresgebühr
            </Button>
            <Button
              variant={isFilterActive('applepay', true) ? 'default' : 'outline'}
              className="rounded-full"
              onClick={() => applyPreset('applepay', true)}
            >
              Apple Pay
            </Button>
            <Button
              variant={isFilterActive('miles', true) ? 'default' : 'outline'}
              className="rounded-full"
              onClick={() => applyPreset('miles', true)}
            >
              Meilen sammeln
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.1em] text-slate-500">Verglichene Karten</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{cards.length}</p>
            <p className="mt-1 text-sm text-slate-600">Aktiv im Vergleich</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.1em] text-slate-500">0 EUR Jahresgebühr</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{cardsWithoutYearlyFee}</p>
            <p className="mt-1 text-sm text-slate-600">Karten ohne Fixkosten</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.1em] text-slate-500">Mobile Wallet</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{mobileWalletCards}</p>
            <p className="mt-1 text-sm text-slate-600">Apple Pay oder Google Pay</p>
          </article>

          <article className="rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4 shadow-sm sm:col-span-3 xl:col-span-1">
            <div className="flex items-center gap-2 text-emerald-800">
              <Sparkles className="h-4 w-4" />
              <p className="text-sm font-semibold">Reise-Fokus</p>
            </div>
            <p className="mt-2 text-sm text-emerald-900">
              {worldwideFreeAtm} Karten erlauben weltweit kostenlose Abhebungen.
            </p>
            <p className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-800">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Ideal für Vielreisende und digitale Nomaden
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Header;
