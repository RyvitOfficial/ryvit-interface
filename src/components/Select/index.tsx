'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ArrowUp01Icon from '@/assets/ArrowUp';

type Option = {
  label: string;
  value: string;
};

interface AnimatedSelectProps {
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const AnimatedSelect = ({
  options,
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Select an option',
}: AnimatedSelectProps) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const selectedOption =
    options.find((o) => o.value === (isControlled ? value : internalValue)) ||
    options.find((o) => o.value === defaultValue);

  useEffect(() => {
    if (isControlled && value !== undefined) {
      setInternalValue(value);
    }
  }, [value, isControlled]);

  return (
    <div className="relative select-dropdown">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-xl placeholder-[#a8a7a8] text-[#2c2c2c] text-[14px] w-full h-[48px] p-4 bg-transparent justify-between items-center inline-flex outline-none border transition-all duration-300"
      >
        <span>{selectedOption?.label || placeholder}</span>
        <div className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <ArrowUp01Icon />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 w-full p-2 bg-white rounded-xl shadow-xl text-[#2c2c2c] overflow-hidden"
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-primary/10 cursor-pointer rounded-xl text-sm"
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
