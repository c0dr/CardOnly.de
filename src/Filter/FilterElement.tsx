import React from 'react';
import FilterSelect from './FilterSelect';
import FilterDropDown from './FilterDropDown';

interface FilterElementProps {
  config: any;
  onFilterChange: (name: string, value: any) => void;
  enabledFilters: Record<string, any>;
}

const FilterElement: React.FC<FilterElementProps> = ({ config, onFilterChange, enabledFilters }) => {
  switch (config.type) {
    case 'select':
      return <FilterSelect config={config} onFilterChange={onFilterChange} enabledFilters={enabledFilters} />;
    case 'dropdown':
      return <FilterDropDown config={config} onFilterChange={onFilterChange} enabledFilters={enabledFilters} />;
    default:
      console.error('Invalid filter type:', config.type);
      return null;
  }
};

export default FilterElement;
