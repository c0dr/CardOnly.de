import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeaderProps {
  filterChange: (key: string, value: any) => void;
  resetFilters: () => void;
  enabledFilters: Record<string, any>;
  cards: any[];
}

const Header: React.FC<HeaderProps> = ({ filterChange, resetFilters, enabledFilters, cards }) => {
  const quickFilters = [
    {
      id: 'all',
      label: 'Alle Karten',
      apply: () => resetFilters(),
    },
    {
      id: 'free',
      label: 'Ohne Jahresgebühr',
      apply: () => {
        resetFilters();
        filterChange('yearlyFee', 0);
      },
      isActive: () => enabledFilters['yearlyFee'] === 0,
    },
    {
      id: 'travel',
      label: 'Reisekarten',
      apply: () => {
        resetFilters();
        filterChange('freeATM', ['fees_atm_foreign']);
        filterChange('fees_pos_foreign', ['fees_pos_foreign']);
      },
      isActive: () => {
        const atm = enabledFilters['freeATM'];
        return Array.isArray(atm) && atm.includes('fees_atm_foreign');
      },
    },
    {
      id: 'credit',
      label: 'Echte Credit-Karten',
      apply: () => {
        resetFilters();
        filterChange('charge', ['credit']);
      },
      isActive: () => {
        const c = enabledFilters['charge'];
        return Array.isArray(c) && c.includes('credit');
      },
    },
    {
      id: 'points',
      label: 'Bonusprogramm',
      apply: () => {
        resetFilters();
        filterChange('miles', true);
      },
      isActive: () => enabledFilters['miles'] === true,
    },
  ];

  const hasActiveFilter = Object.keys(enabledFilters).length > 0;

  const jumpToComparison = () => {
    const comparisonSection = document.getElementById('vergleich');
    if (comparisonSection) {
      comparisonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="mb-10 pb-8 border-b border-border animate-fade-up">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
          Kreditkarten vergleichen,{' '}
          <span className="text-muted-foreground">ohne Marketingnebel.</span>
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted-foreground lg:text-lg">
          {cards.length} Karten nach Bewertung, Jahresgebühr, Fremdwährungskosten und Bargeld-Konditionen sortiert.
          Unabhängig, ohne Werberanking.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Button size="lg" className="h-10 rounded-md px-5 text-sm" onClick={jumpToComparison}>
            Zum Vergleich
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          {hasActiveFilter && (
            <button
              onClick={() => resetFilters()}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Filter zurücksetzen
            </button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => {
            const isActive = filter.isActive ? filter.isActive() : (!hasActiveFilter && filter.id === 'all');
            return (
              <button
                key={filter.id}
                type="button"
                onClick={filter.apply}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-foreground text-background'
                    : 'bg-white text-muted-foreground ring-1 ring-border hover:ring-foreground/30 hover:text-foreground'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link className="text-sm font-semibold text-muted-foreground hover:text-foreground" to="/best/cashback">
            Cashback
          </Link>
          <Link className="text-sm font-semibold text-muted-foreground hover:text-foreground" to="/best/atm-outside-europe">
            ATM ausserhalb Europas
          </Link>
          <Link className="text-sm font-semibold text-muted-foreground hover:text-foreground" to="/best/free-cards">
            Kostenlose Karten
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;
