import React from 'react';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const FilterDropDown = ({ config, onFilterChange }) => {
  const handleChange = (value) => {
    const selectedOption = config.options.find((opt, index) => index.toString() === value);
    onFilterChange(config.filterName, selectedOption.value);
  };

  return (
    <div className="p-4 border rounded-lg bg-card">
      <div className="grid gap-4 sm:grid-cols-2">
        <Label className="text-base font-semibold">
          {config.label}
        </Label>
        <Select onValueChange={handleChange} defaultValue="0">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {config.options.map((obj, index) => (
              <SelectItem key={index} value={index.toString()}>
                {obj.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterDropDown;
