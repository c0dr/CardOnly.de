import React, { useState } from 'react';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';

const FilterSelect = ({ config, onFilterChange }) => {
  const [checkedOptions, setCheckedOptions] = useState(
    config.options.filter(option => option.checked).map(option => option.value) || []
  );

  const handleChange = (checked, value) => {
    let parsedValue = value;
    
    if (config.parseAsBoolean) {
      parsedValue = (value === 'true');
    }

    if (config.parseAsInt) {
      parsedValue = parseInt(value, 10);
    }

    const newOptions = checked 
      ? [...checkedOptions, parsedValue]
      : checkedOptions.filter(opt => opt !== parsedValue);

    setCheckedOptions(newOptions);
    onFilterChange(config.filterName, newOptions);
  };

  return (
    <div className="p-4 border rounded-lg bg-card">
      <div className="grid gap-4 sm:grid-cols-2">
        <Label className="text-base font-semibold">
          {config.label}
        </Label>
        <div className="space-y-2">
          {config.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={`${config.elementName}-${index}`}
                defaultChecked={option.checked}
                value={option.value}
                onCheckedChange={(checked) => handleChange(checked, option.value)}
              />
              <Label
                htmlFor={`${config.elementName}-${index}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSelect;
