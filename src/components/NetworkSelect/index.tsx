'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';

import { NetworkType } from '@/types';
import { Network } from '@/assets';

interface NetworkButtonProps {
  value?: NetworkType;
  defaultValue?: NetworkType;
  onChange: (value: NetworkType) => void;
  className?: string;
}

export const NetworkButton = ({
  value,
  defaultValue = 'testnet',
  onChange,
  className,
}: NetworkButtonProps) => {
  const [internalValue, setInternalValue] = useState<NetworkType>(defaultValue);
  const isControlled = value !== undefined;
  const selectedNetwork = isControlled ? value! : internalValue;

  const handleClick = () => {
    const newNetwork: NetworkType =
      selectedNetwork === 'mainnet' ? 'testnet' : 'mainnet';
    if (!isControlled) setInternalValue(newNetwork);
    onChange(newNetwork);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex w-full h-14 items-center gap-2 px-5 py-3 rounded-xl font-medium text-white text-base shadow-md justify-center overflow-hidden relative',
        selectedNetwork === 'mainnet'
          ? 'bg-green-600/20 hover:bg-green-700/30'
          : 'bg-primary/20 hover:bg-primary/30',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={selectedNetwork}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 absolute left-0 right-0 justify-center"
        >
          <Network
            fill={selectedNetwork === 'mainnet' ? '#1DB954' : '#1B59F8'}
          />
          <span>
            {selectedNetwork.charAt(0).toUpperCase() + selectedNetwork.slice(1)}
          </span>
        </motion.div>
      </AnimatePresence>
    </button>
  );
};
