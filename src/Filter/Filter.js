import React from 'react';
import FilterElement from './FilterElement';

const Filter = ({ filterOptions, filterChange, enabledFilters }) => {
  return (
    <div className="p-6 space-y-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filter</h2>
      {filterOptions.map((option) => (
        <FilterElement
          key={option.elementName}
          config={option}
          onFilterChange={filterChange}
          enabledFilters={enabledFilters}
        />
      ))}
    </div>
  );
};

export default Filter;
