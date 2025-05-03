import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const SortDropdown = ({ onSortChange, currentSort }) => {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm mb-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sortierung</h2>
      <Select value={currentSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select sorting" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alphabetical">Alphabetisch (default)</SelectItem>
          <SelectItem value="yearlyFee">Jahresgebühr (aufsteigend)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortDropdown;