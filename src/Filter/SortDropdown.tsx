import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { ArrowUpDown } from 'lucide-react';

interface SortDropdownProps {
  onSortChange: (value: string) => void;
  currentSort: string;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange, currentSort }) => {
  return (
    <section className="min-h-[74px] rounded-md border border-border/70 bg-background/70 px-3 py-2.5">
      <h2 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
        <ArrowUpDown className="h-3.5 w-3.5" />
        Sortierung
      </h2>
      <Select value={currentSort} onValueChange={onSortChange}>
        <SelectTrigger className="h-9 w-full rounded-md border-border/80 bg-white text-sm shadow-none focus:ring-1 focus:ring-ring focus:ring-offset-0">
          <SelectValue placeholder="Sortierung wählen" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="bestOverall">Beste Bewertung</SelectItem>
          <SelectItem value="bestCashback">Bestes Cashback</SelectItem>
          <SelectItem value="bestAtmOutsideEurope">Beste ATM ausserhalb Europas</SelectItem>
          <SelectItem value="bestFreeCards">Beste kostenlose Karten</SelectItem>
          <SelectItem value="alphabetical">Alphabetisch</SelectItem>
          <SelectItem value="yearlyFee">Jahresgebühr (aufsteigend)</SelectItem>
        </SelectContent>
      </Select>
    </section>
  );
};

export default SortDropdown;
