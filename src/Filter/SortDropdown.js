import React from 'react';
import { ArrowUpWideNarrow } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const SortDropdown = ({ onSortChange, currentSort }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-700">
          <ArrowUpWideNarrow className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-700">Sortierung</h2>
          <p className="text-xs text-slate-500">Reihenfolge der Ergebnisse</p>
        </div>
      </div>
      <Select value={currentSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-full border-slate-300 bg-white">
          <SelectValue placeholder="Sortierung wählen" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alphabetical">Alphabetisch</SelectItem>
          <SelectItem value="yearlyFee">Jahresgebühr (aufsteigend)</SelectItem>
        </SelectContent>
      </Select>
    </section>
  );
};

export default SortDropdown;
