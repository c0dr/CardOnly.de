import React, { useState } from 'react';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const FilterDropDown = ({ config, onFilterChange }) => {
  const [value, setValue] = useState("0");

  const handleChange = (newValue) => {
    setValue(newValue);
    const selectedOption = config.options.find((opt, index) => index.toString() === newValue);
    if (selectedOption) {
      onFilterChange(config.filterName, selectedOption.value);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-card">
      <div className="grid gap-4 sm:grid-cols-2">
        <Label className="text-base font-semibold">
          {config.label}
        </Label>
        <Select value={value} onValueChange={handleChange}>
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
