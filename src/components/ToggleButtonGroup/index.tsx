import React from 'react';

interface ToggleButtonGroupProps<T extends string> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function ToggleButtonGroup<T extends string>({
  options,
  value,
  onChange,
  className = '',
}: ToggleButtonGroupProps<T>) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {options.map((option) => {
        const isSelected = value === option;

        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`w-full px-8 h-[46px] desktopMax:h-[35px] desktopMax:rounded-lg rounded-xl transition-colors text-sm 
              ${isSelected ? 'bg-btnblue text-white' : 'bg-codebg text-txtgray'}
              hover:bg-blue-500 hover:text-white`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
