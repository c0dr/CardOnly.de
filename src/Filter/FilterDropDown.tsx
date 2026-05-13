import React, { useEffect, useMemo, useState } from 'react';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { cn } from '../lib/utils';

interface FilterOption {
  label: string;
  value: any;
  checked?: any;
}

interface FilterDropDownProps {
  config: {
    filterName: string;
    label: string;
    options: FilterOption[];
  };
  onFilterChange: (name: string, value: any) => void;
  enabledFilters: Record<string, any>;
}

const FilterDropDown: React.FC<FilterDropDownProps> = ({ config, onFilterChange, enabledFilters }) => {
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

  const handleChange = (newValue: string) => {
    setValue(newValue);
    const selectedOption = config.options[parseInt(newValue, 10)];
    if (selectedOption) {
      const isNoop =
        selectedOption.value === 'dontcare' ||
        selectedOption.checked === 'dontcare' ||
        newValue === defaultValueIndex;

      onFilterChange(config.filterName, isNoop ? undefined : selectedOption.value);
    }
  };

  const hasActiveSelection = value !== defaultValueIndex;

  return (
    <div
      className={cn(
        'min-h-[74px] rounded-md border bg-white/75 px-3 py-2.5 transition-colors',
        hasActiveSelection
          ? 'border-accent/50 bg-accent/5'
          : 'border-border/70 hover:border-foreground/20'
      )}
    >
      <Label className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">{config.label}</Label>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="h-9 rounded-md border-border/80 bg-white text-sm shadow-none focus:ring-1 focus:ring-ring focus:ring-offset-0">
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
