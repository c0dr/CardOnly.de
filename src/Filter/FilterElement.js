import React from 'react';
import FilterSelect from './FilterSelect';
import FilterDropDown from './FilterDropDown';

const FilterElement = ({ config, onFilterChange }) => {
  switch(config.type) {
    case 'dropdown': 
      return <FilterDropDown config={config} onFilterChange={onFilterChange} />;
    case 'select':
      return <FilterSelect config={config} onFilterChange={onFilterChange} />;
    default:
      console.error('Invalid filterElement type: ' + config.type);
      return null;
  }
};

export default FilterElement;
