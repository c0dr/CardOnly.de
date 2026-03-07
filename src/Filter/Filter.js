import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import FilterElement from './FilterElement';

const Filter = ({ filterOptions, filterChange, enabledFilters }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-700">
          <SlidersHorizontal className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Filter</h2>
          <p className="text-xs text-slate-500">Wähle nur Karten, die wirklich passen</p>
        </div>
      </div>

      <div className="space-y-3">
        {filterOptions.map((option, index) => (
          <div key={option.elementName} className="animate-fade-up" style={{ animationDelay: `${index * 60}ms` }}>
            <FilterElement config={option} onFilterChange={filterChange} enabledFilters={enabledFilters} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Filter;
