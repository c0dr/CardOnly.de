import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';

const FilterSelect = ({ config, onFilterChange, enabledFilters }) => {
  const parseOptionValue = useCallback((value) => {
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

  const [checkedOptions, setCheckedOptions] = useState(defaultSelected);

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

  const handleChange = (checked, value) => {
    const parsedValue = parseOptionValue(value);

    const newOptions = checked
      ? Array.from(new Set([...checkedOptions, parsedValue]))
      : checkedOptions.filter((option) => !Object.is(option, parsedValue));

    setCheckedOptions(newOptions);
    onFilterChange(config.filterName, newOptions);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
      <Label className="mb-3 block text-sm font-semibold text-slate-800">{config.label}</Label>
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
              <Label htmlFor={optionId} className="text-sm text-slate-700">
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
