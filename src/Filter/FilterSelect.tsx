import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';

interface FilterOption {
  label: string;
  value: any;
  checked?: boolean;
}

interface FilterSelectProps {
  config: {
    filterName: string;
    label: string;
    elementName: string;
    parseAsBoolean?: boolean;
    parseAsInt?: boolean;
    options: FilterOption[];
  };
  onFilterChange: (name: string, value: any) => void;
  enabledFilters: Record<string, any>;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ config, onFilterChange, enabledFilters }) => {
  const parseOptionValue = useCallback((value: any) => {
    if (config.parseAsBoolean) {
      return value === true || value === 'true';
    }

    if (config.parseAsInt) {
      return parseInt(value, 10);
    }

    return value;
  }, [config.parseAsBoolean, config.parseAsInt]);

  const defaultSelected = useMemo(
    () => config.options.filter((option) => option.checked).map((option) => parseOptionValue(option.value)) || [],
    [config.options, parseOptionValue]
  );

  const [checkedOptions, setCheckedOptions] = useState<any[]>(defaultSelected);

  useEffect(() => {
    const activeValue = enabledFilters[config.filterName];

    if (activeValue === undefined) {
      setCheckedOptions(defaultSelected);
      return;
    }

    if (Array.isArray(activeValue)) {
      setCheckedOptions(activeValue);
      return;
    }

    setCheckedOptions([activeValue]);
  }, [enabledFilters, config.filterName, defaultSelected]);

  const handleChange = (checked: boolean, value: any) => {
    const parsedValue = parseOptionValue(value);

    const newOptions = checked
      ? Array.from(new Set([...checkedOptions, parsedValue]))
      : checkedOptions.filter((option) => !Object.is(option, parsedValue));

    setCheckedOptions(newOptions);
    onFilterChange(config.filterName, newOptions);
  };

  return (
    <div className="rounded-md border border-stone-200 bg-stone-50/70 p-3">
      <Label className="mb-3 block text-sm font-semibold text-stone-800">{config.label}</Label>
      <div className="space-y-2">
        {config.options.map((option, index) => {
          const parsedValue = parseOptionValue(option.value);
          const optionId = `${config.elementName}-${index}`;
          const checked = checkedOptions.some((entry) => Object.is(entry, parsedValue));

          return (
            <div key={optionId} className="flex items-center gap-2">
              <Checkbox
                id={optionId}
                checked={checked}
                onCheckedChange={(nextChecked) => handleChange(nextChecked === true, option.value)}
              />
              <Label htmlFor={optionId} className="text-sm text-stone-700">
                {option.label}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSelect;
