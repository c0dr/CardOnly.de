import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  ArrowRight,
  CreditCard,
  Gift,
  ListChecks,
  Plane,
  RotateCcw,
  ShieldCheck,
  WalletCards,
  type LucideIcon,
} from 'lucide-react';

interface HeaderProps {
  filterChange: (key: string, value: any) => void;
  resetFilters: () => void;
  enabledFilters: Record<string, any>;
  cards: any[];
}

const Header: React.FC<HeaderProps> = ({ filterChange, resetFilters, enabledFilters, cards }) => {
  const quickFilters: Array<{
    id: string;
    label: string;
    icon: LucideIcon;
    apply: () => void;
    isActive?: () => boolean;
  }> = [
    {
      id: 'all',
      label: 'Alle',
      icon: ListChecks,
      apply: () => resetFilters(),
    },
    {
      id: 'free',
      label: '0 EUR Gebühr',
      icon: WalletCards,
      apply: () => {
        resetFilters();
        filterChange('yearlyFee', 0);
      },
      isActive: () => enabledFilters['yearlyFee'] === 0,
    },
    {
      id: 'travel',
      label: 'Reise',
      icon: Plane,
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
      label: 'Credit',
      icon: CreditCard,
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
      label: 'Bonus',
      icon: Gift,
      apply: () => {
        resetFilters();
        filterChange('miles', true);
      },
      isActive: () => enabledFilters['miles'] === true,
    },
  ];

  const hasActiveFilter = Object.keys(enabledFilters).length > 0;
  const activeFilterCount = Object.keys(enabledFilters).length;

  const jumpToComparison = () => {
    const comparisonSection = document.getElementById('vergleich');
    if (comparisonSection) {
      comparisonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="mb-8 border-b border-border/70 pb-7 pt-2 animate-fade-up">
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase text-accent">
            <ShieldCheck className="h-4 w-4" />
            Unabhängiger Kreditkartenvergleich
          </div>

          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-[2.65rem]">
            Kreditkarten vergleichen
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {cards.length} Karten mit Fokus auf Jahresgebühr, Auslandseinsatz, Bargeld und Abrechnung.
            Partnerlinks ändern keine Bewertung oder Platzierung.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button size="lg" className="h-10 rounded-md px-5 text-sm" onClick={jumpToComparison}>
              Zum Vergleich
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            {hasActiveFilter && (
              <button
                onClick={() => resetFilters()}
                className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" />
                Filter zurücksetzen
              </button>
            )}
          </div>
        </div>

        <dl className="grid grid-cols-3 overflow-hidden rounded-lg border border-border/70 bg-white/75 shadow-sm">
          <div className="px-3 py-3">
            <dt className="text-[11px] font-semibold uppercase text-muted-foreground">Karten</dt>
            <dd className="mt-1 text-xl font-extrabold text-foreground">{cards.length}</dd>
          </div>
          <div className="border-l border-border/70 px-3 py-3">
            <dt className="text-[11px] font-semibold uppercase text-muted-foreground">Filter</dt>
            <dd className="mt-1 text-xl font-extrabold text-foreground">{activeFilterCount}</dd>
          </div>
          <div className="border-l border-border/70 px-3 py-3">
            <dt className="text-[11px] font-semibold uppercase text-muted-foreground">Ranking</dt>
            <dd className="mt-1 text-sm font-bold leading-6 text-foreground">neutral</dd>
          </div>
        </dl>
      </div>

      <div className="mt-7 border-t border-border/70 pt-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase text-muted-foreground">Schnellfilter</span>
            {quickFilters.map((filter) => {
              const isActive = filter.isActive ? filter.isActive() : (!hasActiveFilter && filter.id === 'all');
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={filter.apply}
                  className={`inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-semibold transition-all ${
                    isActive
                      ? 'border-foreground bg-foreground text-background shadow-sm'
                      : 'border-border/80 bg-white/80 text-foreground hover:border-foreground/30 hover:bg-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <Link className="font-semibold text-muted-foreground transition-colors hover:text-foreground" to="/best/cashback">
              Cashback
            </Link>
            <Link className="font-semibold text-muted-foreground transition-colors hover:text-foreground" to="/best/atm-outside-europe">
              Bargeld im Ausland
            </Link>
            <Link className="font-semibold text-muted-foreground transition-colors hover:text-foreground" to="/best/free-cards">
              Kostenlose Karten
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
