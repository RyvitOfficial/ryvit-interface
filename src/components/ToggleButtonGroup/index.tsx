'use client';
import React from 'react';
import { motion } from 'framer-motion';

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
  const selectedIndex = options.indexOf(value);

  return (
    <div className={`relative flex bg-gray-800 rounded-xl p-1 ${className}`}>
      <motion.div
        className="absolute top-1 bottom-1 bg-primary rounded-xl shadow-md "
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          width: `${100 / options.length}%`,
          left: `${(100 / options.length) * selectedIndex}%`,
        }}
      />

      {options.map((option) => {
        const isSelected = value === option;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`relative flex-1 z-10 text-sm font-medium transition-colors duration-200 
              ${isSelected ? 'text-white' : 'text-gray-300'}
              py-2`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
