import React, { useState, useEffect } from 'react';
import Filter from '../Filter/Filter';
import Cards from '../CardComponents/Cards';
import Header from './Header';
import FeaturedCards from './FeaturedCards';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Info } from 'lucide-react';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [enabledFilters, setEnabledFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState([]);
  const [cols, setCols] = useState([]);

  useEffect(() => {
    fetch('data/cards.json')
      .then(response => response.json())
      .catch(console.log)
      .then(data => setCards(data));

    fetch('data/filterOptions.json')
      .then(response => response.json())
      .catch(console.log)
      .then(data => setFilterOptions(data));

    fetch('data/columns.json')
      .then(response => response.json())
      .catch(console.log)
      .then(data => setCols(data));
  }, []);

  const filterChange = (filterName, filterValue) => {
    setEnabledFilters(prev => ({
      ...prev,
      [filterName]: filterValue
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
    let features = ['fees_atm_de', 'fees_atm_eur', 'fees_atm_foreign', 'fees_pos_foreign'];
    return features.filter(feature => card[feature] === 0);
  };

  const getFilterByName = (filterName) => {
    return filterOptions.filter(filter => filter.filterName === filterName)[0];
  };

  const filterFunction = (card, filterName, filterValue) => {
    if (filterValue === 'dontcare') {
      return true;
    }

    if (typeof filterValue === "boolean") {
      return card[filterName] === filterValue;
    } else if (Array.isArray(filterValue)) {
      let filter = getFilterByName(filterName);
      let freeCardFeatures = [];

      if (filter?.derivedAttribute === true) {
        freeCardFeatures = cardFeeFreeFeatures(card);
      }

      if (filterValue.length === 1 && !filter?.derivedAttribute) {
        return filterFunction(card, filterName, filterValue[0]);
      }

      if (filter?.match === 'single') {
        return filterValue.includes(card[filterName]);
      } else {
        return filterValue.every(val => freeCardFeatures.indexOf(val) >= 0);
      }
    } else if (typeof filterValue === "number") {
      return card[filterName] <= filterValue;
    } else {
      return card[filterName] === filterValue;
    }
  };

  const filteredCards = () => {
    let allCards = cards;
    for (let filterName of Object.keys(enabledFilters)) {
      allCards = allCards.filter(card => filterFunction(card, filterName, enabledFilters[filterName]));
    }
    return allCards.sort((a, b) => a.Issuer.localeCompare(b.Issuer));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <Header filterChange={filterChange} resetFilters={resetFilters} enabledFilters={enabledFilters}/>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <Filter filterChange={filterChange} filterOptions={filterOptions} enabledFilters={enabledFilters} />
          </div>
          <div className="md:col-span-9">
            <FeaturedCards cards={cards} />
            <Cards cards={filteredCards()} cols={cols} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
