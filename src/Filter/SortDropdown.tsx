import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

interface SortDropdownProps {
  onSortChange: (value: string) => void;
  currentSort: string;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange, currentSort }) => {
  return (
    <section className="mt-4">
      <h2 className="mb-2 text-sm font-bold text-foreground">Sortierung</h2>
      <Select value={currentSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-full rounded-md border-border bg-white text-sm">
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
