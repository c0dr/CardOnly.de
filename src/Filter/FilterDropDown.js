import React, { useEffect, useMemo, useState } from 'react';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const FilterDropDown = ({ config, onFilterChange, enabledFilters }) => {
  const defaultValueIndex = useMemo(() => {
    const dontCareIndex = config.options.findIndex((option) => option.value === 'dontcare');
    return (dontCareIndex >= 0 ? dontCareIndex : 0).toString();
  }, [config.options]);

  const [value, setValue] = useState(defaultValueIndex);

  useEffect(() => {
    const activeValue = enabledFilters[config.filterName];

    if (activeValue === undefined) {
      setValue(defaultValueIndex);
      return;
    }

    const selectedIndex = config.options.findIndex((option) => Object.is(option.value, activeValue));
    if (selectedIndex >= 0) {
      setValue(selectedIndex.toString());
    }
  }, [enabledFilters, config.filterName, config.options, defaultValueIndex]);

  const handleChange = (newValue) => {
    setValue(newValue);
    const selectedOption = config.options[parseInt(newValue, 10)];
    if (selectedOption) {
      onFilterChange(config.filterName, selectedOption.value);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
      <Label className="mb-3 block text-sm font-semibold text-slate-800">{config.label}</Label>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="border-slate-300 bg-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {config.options.map((obj, index) => (
            <SelectItem key={obj.label} value={index.toString()}>
              {obj.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterDropDown;
