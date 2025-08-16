'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';

import ArrowUp01Icon from '@/assets/ArrowUp';
import { Network } from '@/assets';

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
  network?: boolean;
  className?: string;
}

export const AnimatedSelect = ({
  options,
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Select an option',
  network,
  className,
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
        className={cn(
          'flex items-center justify-start outline-none border transition-all duration-300 font-jetbrains',
          {
            'justify-between rounded-lg placeholder-[#fff] border-border2 text-[#D1D5DB] text-[14px] w-full h-[48px] p-4 bg-input':
              !network,
            'rounded-lg w-full border-2 border-border3 h-11 bg-bgblack2 text-white':
              network,
          },
          className,
        )}
      >
        <span
          className={cn({
            'w-[100px]': network,
          })}
        >
          {selectedOption?.label || placeholder}
        </span>
        {network ? (
          <div>
            <Network fill="rgba(27, 89, 248, 0.9)" />
          </div>
        ) : (
          <div className={`transition-transform ${open ? 'rotate-180' : ''}`}>
            <ArrowUp01Icon />
          </div>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 w-full p-2 bg-bgblack2 rounded-lg shadow-xl text-white overflow-hidden font-jetbrains"
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-primary/10 cursor-pointer rounded-lg text-sm"
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
