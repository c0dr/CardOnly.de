import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cards from '../CardComponents/Cards';
import Header from './Header';
import FeaturedCards from './FeaturedCards';
import SortDropdown from '../Filter/SortDropdown';
import FilterElement from '../Filter/FilterElement';
import { clearCompareIssuers, getCompareIssuers, maxCompareCards, setCompareIssuers } from '../lib/compareSelection';
import { compareCardsByRating } from '../lib/cardRatings';
import { Button } from '../components/ui/button';
import { Card } from '../types';

interface FilterOption {
  filterName: string;
  derivedAttribute?: boolean;
  match?: 'single' | 'multi';
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
    setEnabledFilters((prev) => ({
      ...prev,
      [filterName]: filterValue,
    }));
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
    return features.filter((feature) => card[feature] === 0);
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
        return filterValue.includes(card[filterName]);
      }
      return filterValue.every((val) => freeCardFeatures.indexOf(val) >= 0);
    }

    if (typeof filterValue === 'number') {
      return (card[filterName] as number) <= filterValue;
    }

    return card[filterName] === filterValue;
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
          {/* Filter bar at top */}
          <div className="animate-fade-up rounded-lg bg-white p-4 ring-1 ring-border">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">Filter</h2>
              {Object.keys(enabledFilters).length > 0 && (
                <button
                  onClick={() => resetFilters()}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Zurücksetzen
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-wrap gap-2 flex-1">
                {filterOptions.map((option) => (
                  <div key={option.elementName}>
                    <FilterElement config={option} onFilterChange={filterChange} enabledFilters={enabledFilters} />
                  </div>
                ))}
              </div>
              <SortDropdown onSortChange={handleSortChange} currentSort={sortBy} />
            </div>
            <div className="mt-4 pt-3 border-t border-border">
              <p className="text-[11px] leading-relaxed text-muted-foreground">
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
