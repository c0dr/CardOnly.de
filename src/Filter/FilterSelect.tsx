import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { cn } from '../lib/utils';
import SchemeBadge from '../CardComponents/SchemeBadge';

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
    display?: 'scheme';
    options: FilterOption[];
  };
  onFilterChange: (name: string, value: any) => void;
  enabledFilters: Record<string, any>;
}

const optionSetsEqual = (a: any[], b: any[]) => {
  return a.length === b.length && a.every((entry) => b.some((candidate) => Object.is(candidate, entry)));
};

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
    onFilterChange(config.filterName, optionSetsEqual(newOptions, defaultSelected) ? undefined : newOptions);
  };

  const hasActiveSelection = !optionSetsEqual(checkedOptions, defaultSelected);
  const isSingleOption = config.options.length === 1;

  if (isSingleOption) {
    const option = config.options[0];
    const parsedValue = parseOptionValue(option.value);
    const optionId = `${config.elementName}-0`;
    const checked = checkedOptions.some((entry) => Object.is(entry, parsedValue));

    return (
      <div
        className={cn(
          'flex min-h-[58px] items-center justify-between gap-3 rounded-md border bg-white/75 px-3 py-2.5 transition-colors',
          hasActiveSelection
            ? 'border-accent/50 bg-accent/5'
            : 'border-border/70 hover:border-foreground/20'
        )}
      >
        <Label htmlFor={optionId} className="cursor-pointer text-sm font-semibold leading-snug text-foreground">
          {config.label}
        </Label>
        <Checkbox
          id={optionId}
          checked={checked}
          onCheckedChange={(nextChecked) => handleChange(nextChecked === true, option.value)}
          className="h-5 w-5 rounded-[4px]"
        />
      </div>
    );
  }

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
      <div className="flex flex-wrap gap-1.5">
        {config.options.map((option, index) => {
          const parsedValue = parseOptionValue(option.value);
          const optionId = `${config.elementName}-${index}`;
          const checked = checkedOptions.some((entry) => Object.is(entry, parsedValue));

          return (
            <Label
              key={optionId}
              htmlFor={optionId}
              className={cn(
                'inline-flex h-8 cursor-pointer items-center gap-2 rounded-md border px-2.5 text-xs font-semibold transition-colors',
                checked
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border/80 bg-white text-muted-foreground hover:border-foreground/30 hover:text-foreground'
              )}
            >
              <Checkbox
                id={optionId}
                checked={checked}
                onCheckedChange={(nextChecked) => handleChange(nextChecked === true, option.value)}
                className={cn(
                  'h-3.5 w-3.5 rounded-[3px] border-current',
                  checked && 'border-background data-[state=checked]:bg-background data-[state=checked]:text-foreground'
                )}
              />
              {config.display === 'scheme' ? (
                <SchemeBadge
                  scheme={option.value}
                  label={option.label}
                  className={checked ? 'border-background/30 bg-background text-foreground' : ''}
                />
              ) : (
                <span>{option.label}</span>
              )}
            </Label>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSelect;
