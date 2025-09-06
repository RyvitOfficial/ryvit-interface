'use client';

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';

import shortenAddress from '@/utils/shortenAddress';

import ArrowUp01Icon from '@/assets/ArrowUp';
import { Network } from '@/assets';

type Option = {
  label: string;
  value: string;
  icon?: ReactNode;
  color?: string;
};

interface AnimatedSelectProps {
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  network?: boolean;
  searchable?: boolean;
  details?: string;
  address?: boolean;
}

export const AnimatedSelect = ({
  options,
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Select an option',
  className,
  network = false,
  searchable = false,
  details,
  address,
}: AnimatedSelectProps) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [search, setSearch] = useState('');
  const isControlled = value !== undefined;

  const selectedOption =
    options.find((o) => o.value === (isControlled ? value : internalValue)) ||
    options.find((o) => o.value === defaultValue);

  useEffect(() => {
    if (isControlled && value !== undefined) {
      setInternalValue(value);
    }
  }, [value, isControlled]);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase()),
      )
    : options;

  return (
    <div className="relative w-full">
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex items-center justify-between w-full py-2 rounded-lg border text-sm transition-all',
          network
            ? 'bg-bgblack2 border-border3 text-white/80 h-11'
            : 'bg-bgblack2 border-border2 text-white h-[48px]',
          selectedOption?.icon ? 'px-2' : 'px-4',
          className,
        )}
      >
        <div className="flex items-center justify-between gap-2 h-full">
          {selectedOption?.icon && (
            <div className="flex justify-center items-center h-full font-medium bg-bgblack rounded-lg w-[40px]">
              {selectedOption?.icon}
            </div>
          )}

          <div className={cn('flex flex-col items-start  justify-center')}>
            <span> {selectedOption?.label || placeholder}</span>
            {details ||
              (address && (
                <span className="text-txtgray text-[10px] font-light">
                  {address
                    ? selectedOption &&
                      shortenAddress(selectedOption?.value, 10)
                    : details}
                </span>
              ))}
          </div>
        </div>

        {network ? (
          <Network fill="rgba(27, 89, 248, 0.9)" />
        ) : (
          <div className={`transition-transform ${open ? '' : 'rotate-180'}`}>
            <ArrowUp01Icon />
          </div>
        )}
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
            {searchable && (
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-bgblack1 border border-border3 rounded-md text-white placeholder-gray-400 outline-none"
                />
              </div>
            )}

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
                      <div className="flex justify-center items-center h-full font-medium ">
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
              {filteredOptions.length === 0 && searchable && (
                <li className="px-4 py-2 text-gray-400 text-sm">No results</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
