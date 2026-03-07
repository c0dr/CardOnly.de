import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Filter from '../Filter/Filter';
import Cards from '../CardComponents/Cards';
import Header from './Header';
import FeaturedCards from './FeaturedCards';
import SortDropdown from '../Filter/SortDropdown';
import { clearCompareIssuers, getCompareIssuers, maxCompareCards, setCompareIssuers } from '../lib/compareSelection';
import { Button } from '../components/ui/button';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [enabledFilters, setEnabledFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState([]);
  const [cols, setCols] = useState([]);
  const [sortBy, setSortBy] = useState('alphabetical');
  const [comparedIssuers, setComparedIssuers] = useState(() => getCompareIssuers());

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

  const filterChange = (filterName, filterValue) => {
    setEnabledFilters((prev) => ({
      ...prev,
      [filterName]: filterValue,
    }));
  };

  const resetFilters = (exceptFilter = null) => {
    if (exceptFilter) {
      const newFilters = {};
      newFilters[exceptFilter] = enabledFilters[exceptFilter];
      setEnabledFilters(newFilters);
    } else {
      setEnabledFilters({});
    }
  };

  const cardFeeFreeFeatures = (card) => {
    const features = ['fees_atm_de', 'fees_atm_eur', 'fees_atm_foreign', 'fees_pos_foreign'];
    return features.filter((feature) => card[feature] === 0);
  };

  const getFilterByName = (filterName) => {
    return filterOptions.filter((filter) => filter.filterName === filterName)[0];
  };

  const filterFunction = (card, filterName, filterValue) => {
    if (filterValue === 'dontcare') {
      return true;
    }

    if (typeof filterValue === 'boolean') {
      return card[filterName] === filterValue;
    }

    if (Array.isArray(filterValue)) {
      const filter = getFilterByName(filterName);
      let freeCardFeatures = [];

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
      return card[filterName] <= filterValue;
    }

    return card[filterName] === filterValue;
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const toggleCompare = (issuer) => {
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
    let allCards = cards;
    for (const filterName of Object.keys(enabledFilters)) {
      allCards = allCards.filter((card) => filterFunction(card, filterName, enabledFilters[filterName]));
    }

    return allCards.sort((a, b) => {
      if (sortBy === 'alphabetical') {
        return a.Issuer.localeCompare(b.Issuer);
      }
      if (sortBy === 'yearlyFee') {
        return (a.yearlyFee || 0) - (b.yearlyFee || 0);
      }
      return 0;
    });
  };

  const sortedFilteredCards = filteredCards();
  const comparedCards = comparedIssuers
    .map((issuer) => cards.find((card) => card.Issuer === issuer))
    .filter(Boolean);

  return (
    <div className="min-h-screen pb-12">
      <div className="container px-4 py-6 md:py-8">
        <Header
          cards={cards}
          filterChange={filterChange}
          resetFilters={resetFilters}
          enabledFilters={enabledFilters}
        />

        <section id="vergleich" className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="space-y-4">
              <Filter
                filterChange={filterChange}
                filterOptions={filterOptions}
                enabledFilters={enabledFilters}
              />
              <SortDropdown onSortChange={handleSortChange} currentSort={sortBy} />
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">Hinweis</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Die Konditionen werden laufend gepflegt. Provisionen über markierte Partnerlinks beeinflussen die
                  Darstellung im Vergleich nicht.
                </p>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-8 xl:col-span-9">
            <FeaturedCards cards={cards} />
            <Cards
              cards={sortedFilteredCards}
              cols={cols}
              comparedIssuers={comparedIssuers}
              onToggleCompare={toggleCompare}
            />

            {comparedCards.length > 0 && (
              <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm animate-fade-up">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Ausgewählte Karten ({comparedCards.length}/{maxCompareCards})
                    </h3>
                    <p className="text-sm text-slate-600">Vergleich auf eigener Seite mit allen Details.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button asChild className="rounded-full">
                      <Link to="/compare">Vergleich öffnen</Link>
                    </Button>
                    <Button variant="outline" className="rounded-full border-slate-300" onClick={clearCompare}>
                      Leeren
                    </Button>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-3">
                  {comparedCards.map((card) => (
                    <article
                      key={card.Issuer}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                    >
                      <img
                        src={card.image}
                        alt={`${card.Issuer} Logo`}
                        className="h-10 w-16 rounded-md object-contain bg-white p-1"
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{card.Issuer}</p>
                        <button
                          type="button"
                          className="text-xs text-slate-500 hover:text-slate-700 hover:underline"
                          onClick={() =>
                            setComparedIssuers((prev) => prev.filter((entry) => entry !== card.Issuer))
                          }
                        >
                          Entfernen
                        </button>
                      </div>
                    </article>
                  ))}
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
