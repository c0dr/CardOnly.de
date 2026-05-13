import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cards from '../CardComponents/Cards';
import AtmFeeNotice from '../CommonComponents/AtmFeeNotice';
import Header from './Header';
import FeaturedCards from './FeaturedCards';
import SortDropdown from '../Filter/SortDropdown';
import FilterElement from '../Filter/FilterElement';
import { clearCompareIssuers, getCompareIssuers, maxCompareCards, setCompareIssuers } from '../lib/compareSelection';
import { compareCardsByRating, isZeroLike } from '../lib/cardRatings';
import { Button } from '../components/ui/button';
import { Card } from '../types';
import { RotateCcw, ShieldCheck, SlidersHorizontal } from 'lucide-react';

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

const Home: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [enabledFilters, setEnabledFilters] = useState<Record<string, any>>({});
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
  const [cols, setCols] = useState<Column[]>([]);
  const [sortBy, setSortBy] = useState('bestOverall');
  const [comparedIssuers, setComparedIssuers] = useState<string[]>(() => getCompareIssuers());

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
      <div className="container px-4 py-6 md:py-8">
        <Header
          cards={cards}
          filterChange={filterChange}
          resetFilters={resetFilters}
          enabledFilters={enabledFilters}
        />

        <section id="vergleich" className="space-y-6">
          <AtmFeeNotice />

          <div className="animate-fade-up rounded-lg border border-border/70 bg-white/85 p-3 shadow-[0_18px_70px_-55px_rgba(15,23,42,0.45)]">
            <div className="flex flex-col gap-3 border-b border-border/70 pb-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-foreground text-background">
                  <SlidersHorizontal className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-foreground">Vergleich einstellen</h2>
                  <p className="text-sm text-muted-foreground">
                    {sortedFilteredCards.length} von {cards.length} Karten
                    {activeFilterCount > 0 ? ` mit ${activeFilterCount} aktiven Filtern` : ' sichtbar'}
                  </p>
                </div>
              </div>

              {activeFilterCount > 0 && (
                <button
                  onClick={() => resetFilters()}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border/80 bg-white px-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground"
                >
                  <RotateCcw className="h-4 w-4" />
                  Zurücksetzen
                </button>
              )}
            </div>

            <div className="grid gap-3 pt-3 xl:grid-cols-[minmax(0,1fr)_17rem]">
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

            <div className="mt-3 flex items-start gap-2 border-t border-border/70 pt-3 text-[11px] leading-relaxed text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" />
              <p>
                Konditionen werden fortlaufend geprüft. Provisionen über markierte Partnerlinks haben <strong>keinen</strong> Einfluss auf Bewertung oder Platzierung.
              </p>
            </div>
          </div>

          <main className="min-w-0">
            <FeaturedCards cards={cards} />
            <Cards
              cards={sortedFilteredCards}
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
          </main>
        </section>
      </div>
    </div>
  );
};

export default Home;
