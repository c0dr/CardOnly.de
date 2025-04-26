import React from 'react';
import FilterElement from './FilterElement';

const Filter = ({ filterOptions, filterChange }) => {
  return (
    <div className="p-4 space-y-4">
      <h4 className="text-xl font-semibold mb-4">Filter</h4>
      <div className="space-y-3">
        {filterOptions.map((filterOption, index) => (
          <FilterElement 
            key={index} 
            onFilterChange={filterChange} 
            config={filterOption}
          />
        ))}
      </div>
    </div>
  );
};

export default Filter;
