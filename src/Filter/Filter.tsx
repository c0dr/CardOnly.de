import React from 'react';
import FilterElement from './FilterElement';

interface FilterProps {
  filterOptions: any[];
  filterChange: (name: string, value: any) => void;
  enabledFilters: Record<string, any>;
}

const Filter: React.FC<FilterProps> = ({ filterOptions, filterChange, enabledFilters }) => {
  return (
    <section>
      <h2 className="mb-3 text-sm font-bold text-foreground">Filter</h2>
      <div className="space-y-3">
        {filterOptions.map((option) => (
          <div key={option.elementName}>
            <FilterElement config={option} onFilterChange={filterChange} enabledFilters={enabledFilters} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Filter;
