// AnimatedSelect.tsx
'use client';

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';

import shortenAddress from '@/utils/shortenAddress';
import ArrowUp01Icon from '@/assets/ArrowUp';

type Option<T extends string = string> = {
  label: string;
  value: T;
  icon?: ReactNode;
  color?: string;
};

interface AnimatedSelectProps<T extends string = string> {
  options: Option<T>[];
  value?: T;
  defaultValue?: T;
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
  details?: string;
  address?: boolean;
  height?: string;
  border?: boolean;
}

export const AnimatedSelect = <T extends string>({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = 'Select an option',
  className,
  details,
  address,
  height,
  border,
}: AnimatedSelectProps<T>) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<T | undefined>(
    defaultValue,
  );
  const [search, setSearch] = useState('');
  const isControlled = value !== undefined;

  const selectedOption =
    options.find((o) => o.value === (isControlled ? value : internalValue)) ||
    (defaultValue ? options.find((o) => o.value === defaultValue) : undefined);

  useEffect(() => {
    if (isControlled && value !== undefined) {
      setInternalValue(value);
    }
  }, [value, isControlled]);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="relative w-full">
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex items-center justify-between w-full py-2 rounded-lg  text-sm transition-all bg-bgblack2  text-white',
          selectedOption?.icon ? 'px-2' : 'px-4',
          height ? height : 'h-[48px]',
          border ? 'border border-border2' : '',
          className,
        )}
      >
        <div className="flex items-center justify-between gap-2 h-full">
          {selectedOption?.icon && (
            <div className="flex justify-center items-center h-full font-medium bg-bgblack rounded-lg w-[40px]">
              {selectedOption?.icon}
            </div>
          )}

          <div className="flex flex-col items-start justify-center">
            <span>{selectedOption?.label || placeholder}</span>
            {details ||
              (address && selectedOption && (
                <span className="text-txtgray text-[10px] font-light">
                  {shortenAddress(selectedOption.value, 10)}
                </span>
              ))}
          </div>
        </div>

        <div className={`transition-transform ${open ? '' : 'rotate-180'}`}>
          <ArrowUp01Icon fill="#c6c6c6" />
        </div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full bg-bgblack2 rounded-lg shadow-2xl z-20 border border-border2/10 overflow-hidden"
          >
            {/* Options */}
            <ul className="max-h-60 overflow-auto px-2 py-3 bg-bgblack2 space-y-2">
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                    setSearch('');
                  }}
                  className="px-4 py-2 flex items-center gap-2 bg-bgblack/30 shadow-md hover:bg-bgblack1/50 cursor-pointer rounded-lg text-sm text-white"
                >
                  <div className="flex items-center justify-between gap-4 h-full">
                    {option.icon && (
                      <div className="flex justify-center items-center h-full font-medium">
                        {option.icon}
                      </div>
                    )}

                    <div className="flex flex-col items-start justify-center">
                      <span>{option.label || placeholder}</span>
                      {details ||
                        (address && (
                          <span className="text-txtgray text-[10px] font-light">
                            {shortenAddress(option.value, 10)}
                          </span>
                        ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
