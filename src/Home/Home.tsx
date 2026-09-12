import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cards from '../CardComponents/Cards';
import AtmFeeNotice from '../CommonComponents/AtmFeeNotice';
import Header from './Header';
import TopPicks from './TopPicks';
import SortDropdown from '../Filter/SortDropdown';
import FilterElement from '../Filter/FilterElement';
import { clearCompareIssuers, getCompareIssuers, maxCompareCards, setCompareIssuers } from '../lib/compareSelection';
import { compareCardsByRating, isZeroLike } from '../lib/cardRatings';
import { Button } from '../components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import { Card } from '../types';
import { ChevronDown, ChevronUp, Info, RotateCcw, ShieldCheck, Table2 } from 'lucide-react';

interface FilterOption {
  filterName: string;
  derivedAttribute?: boolean;
  match?: 'single' | 'all';
  [key: string]: any;
}

interface Column {
  label: string;
  value: string;
}

type ViewMode = 'simple' | 'expert';

const VIEW_MODE_KEY = 'cardonly-view-mode';

const readViewMode = (): ViewMode => {
  try {
    return localStorage.getItem(VIEW_MODE_KEY) === 'expert' ? 'expert' : 'simple';
  } catch {
    return 'simple';
  }
};

const AtmFeeNoticeSimple: React.FC = () => (
  <div className="flex items-start gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-[13px] leading-5 text-muted-foreground shadow-card">
    <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
    <p>
      <strong className="font-semibold text-foreground">Gut zu wissen:</strong> „Kostenlos“ beim Abheben bedeutet, dass die Karte selbst keine Gebühr nimmt. Manche Automatenbetreiber verlangen trotzdem ein eigenes Entgelt.
    </p>
  </div>
);

const Home: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [enabledFilters, setEnabledFilters] = useState<Record<string, any>>({});
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
  const [cols, setCols] = useState<Column[]>([]);
  const [sortBy, setSortBy] = useState('bestOverall');
  const [comparedIssuers, setComparedIssuers] = useState<string[]>(() => getCompareIssuers());
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>(readViewMode);

  const isSimpleMode = viewMode === 'simple';

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    try {
      localStorage.setItem(VIEW_MODE_KEY, mode);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    fetch('data/cards.json')
      .then((response) => response.json())
      .catch(console.log)
      .then((data) => setCards(data));

    fetch('data/filterOptions.json')
      .then((response) => response.json())
      .catch(console.log)
      .then((data) => setFilterOptions(data));

    fetch('data/columns.json')
      .then((response) => response.json())
      .catch(console.log)
      .then((data) => setCols(data));
  }, []);

  useEffect(() => {
    setCompareIssuers(comparedIssuers);
  }, [comparedIssuers]);

  const filterChange = (filterName: string, filterValue: any) => {
    setEnabledFilters((prev) => {
      const next = { ...prev };
      const shouldRemove =
        filterValue === undefined ||
        filterValue === 'dontcare' ||
        (Array.isArray(filterValue) && filterValue.length === 0);

      if (shouldRemove) {
        delete next[filterName];
        return next;
      }

      next[filterName] = filterValue;
      return next;
    });
  };

  const resetFilters = (exceptFilter: string | null = null) => {
    if (exceptFilter) {
      const newFilters: Record<string, any> = {};
      newFilters[exceptFilter] = enabledFilters[exceptFilter];
      setEnabledFilters(newFilters);
    } else {
      setEnabledFilters({});
    }
  };

  const cardFeeFreeFeatures = (card: Card) => {
    const features = ['fees_atm_de', 'fees_atm_eur', 'fees_atm_foreign', 'fees_pos_foreign'];
    return features.filter((feature) => isZeroLike(card[feature]));
  };

  const getFilterByName = (filterName: string) => {
    return filterOptions.filter((filter) => filter.filterName === filterName)[0];
  };

  const filterFunction = (card: Card, filterName: string, filterValue: any): boolean => {
    if (filterValue === 'dontcare') {
      return true;
    }

    if (typeof filterValue === 'boolean') {
      return card[filterName] === filterValue;
    }

    if (Array.isArray(filterValue)) {
      const filter = getFilterByName(filterName);
      let freeCardFeatures: string[] = [];

      if (filter?.derivedAttribute === true) {
        freeCardFeatures = cardFeeFreeFeatures(card);
      }

      if (filterValue.length === 1 && !filter?.derivedAttribute) {
        return filterFunction(card, filterName, filterValue[0]);
      }

      if (filter?.match === 'single') {
        const cardValue = card[filterName];
        if (Array.isArray(cardValue)) {
          return cardValue.some((value) => filterValue.includes(value));
        }
        return filterValue.includes(cardValue);
      }
      return filterValue.every((val) => freeCardFeatures.indexOf(val) >= 0);
    }

    if (typeof filterValue === 'number') {
      return (card[filterName] as number) <= filterValue;
    }

    const cardValue = card[filterName];
    if (Array.isArray(cardValue)) {
      return cardValue.includes(filterValue);
    }
    return cardValue === filterValue;
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

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

  const filteredCards = () => {
    let allCards = [...cards];
    for (const filterName of Object.keys(enabledFilters)) {
      allCards = allCards.filter((card) => filterFunction(card, filterName, enabledFilters[filterName]));
    }

    return allCards.sort((a, b) => {
      if (sortBy.startsWith('best')) {
        return compareCardsByRating(a, b, sortBy);
      }
      if (sortBy === 'alphabetical') {
        return a.Issuer.localeCompare(b.Issuer);
      }
      if (sortBy === 'yearlyFee') {
        return (Number(a.yearlyFee) || 0) - (Number(b.yearlyFee) || 0);
      }
      return 0;
    });
  };

  const sortedFilteredCards = filteredCards();
  const activeFilterCount = Object.keys(enabledFilters).length;
  const comparedCards = comparedIssuers
    .map((issuer) => cards.find((card) => card.Issuer === issuer))
    .filter((card): card is Card => !!card);

  return (
    <div className="min-h-screen pb-24">
      <div className="container px-4">
        <Header
          cards={cards}
          filterChange={filterChange}
          resetFilters={resetFilters}
          enabledFilters={enabledFilters}
        />

        <TopPicks cards={cards} onToggleCompare={toggleCompare} />

        <section id="vergleich" className="scroll-mt-20 space-y-6">
          {/* Mode switch */}
          <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-2xl font-semibold text-foreground">
                Alle Karten im Vergleich
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {isSimpleMode
                  ? `${sortedFilteredCards.length} Karten · Gebühren und Leistungen im Überblick`
                  : `${sortedFilteredCards.length} Karten · Alle Filter und Konditionen`}
              </p>
            </div>
            <div className="inline-flex shrink-0 rounded-lg bg-secondary p-1" role="group" aria-label="Ansicht wechseln">
              <button
                type="button"
                onClick={() => handleViewModeChange('simple')}
                aria-pressed={isSimpleMode}
                className={`inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-[13px] font-medium transition-all ${
                  isSimpleMode ? 'bg-card text-foreground shadow-card' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Übersicht
              </button>
              <button
                type="button"
                onClick={() => handleViewModeChange('expert')}
                aria-pressed={!isSimpleMode}
                className={`inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-[13px] font-medium transition-all ${
                  !isSimpleMode ? 'bg-card text-foreground shadow-card' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Table2 className="h-3.5 w-3.5" />
                Details & Filter
              </button>
            </div>
          </div>

          {isSimpleMode && (
            <AtmFeeNoticeSimple />
          )}

          {!isSimpleMode && (
            <Collapsible
              open={filtersOpen}
              onOpenChange={setFiltersOpen}
              className="rounded-xl border border-border bg-card p-4 shadow-card sm:p-5"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-foreground">Vergleich einstellen</h2>
                  <span className="text-sm text-muted-foreground">
                    · {sortedFilteredCards.length} von {cards.length} Karten
                    {activeFilterCount > 0 ? ` (${activeFilterCount} Filter aktiv)` : ''}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {activeFilterCount > 0 && (
                    <button
                      onClick={() => resetFilters()}
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Zurücksetzen
                    </button>
                  )}
                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-card px-3.5 text-[13px] font-semibold text-foreground transition-colors hover:bg-secondary"
                      aria-label={filtersOpen ? 'Filter ausblenden' : 'Filter anzeigen'}
                    >
                      {filtersOpen ? 'Filter ausblenden' : 'Filter anzeigen'}
                      {filtersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </CollapsibleTrigger>
                </div>
              </div>

              <CollapsibleContent>
                <div className="mt-3 grid gap-3 border-t border-border/70 pt-3 xl:grid-cols-[minmax(0,1fr)_17rem]">
                  <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                    {filterOptions.map((option) => (
                      <FilterElement
                        key={option.elementName}
                        config={option}
                        onFilterChange={filterChange}
                        enabledFilters={enabledFilters}
                      />
                    ))}
                  </div>
                  <SortDropdown onSortChange={handleSortChange} currentSort={sortBy} />
                </div>
              </CollapsibleContent>

              <div className="mt-3 flex items-start gap-2 border-t border-border/70 pt-3 text-[11px] leading-relaxed text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-600" />
                <p>Konditionen werden fortlaufend geprüft. Partnerlinks haben keinen Einfluss auf Bewertung oder Platzierung.</p>
              </div>
            </Collapsible>
          )}

          {!isSimpleMode && <AtmFeeNotice />}

          <main className="min-w-0">
            <Cards
              cards={sortedFilteredCards}
              cols={cols}
              comparedIssuers={comparedIssuers}
              onToggleCompare={toggleCompare}
              simple={isSimpleMode}
            />

            {comparedCards.length > 0 && (
              <section className="fixed bottom-4 left-0 right-0 z-50 mx-auto w-full max-w-2xl px-4 animate-fade-up">
                <div className="rounded-xl bg-[#0b1220] px-4 py-3 shadow-lift">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm font-semibold tabular-nums text-white">
                        {comparedCards.length}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">Vergleichsauswahl</p>
                        <p className="hidden text-xs text-slate-400 sm:block">Max. {maxCompareCards} Karten</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button asChild size="sm" className="h-8 rounded-lg bg-white px-3 text-xs font-semibold text-slate-900 hover:bg-slate-100">
                        <Link to="/compare">Vergleichen</Link>
                      </Button>
                      <button
                        className="h-8 rounded-lg px-3 text-xs font-medium text-slate-400 hover:text-white"
                        onClick={clearCompare}
                      >
                        Leeren
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </main>
        </section>

      </div>
    </div>
  );
};

export default Home;
