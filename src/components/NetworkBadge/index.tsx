import React from 'react';
import cn from 'classnames';
import { NetworkType } from '@/types';

interface NetworkBadgeProps {
  network: NetworkType;
}

const networkConfig: Record<
  NetworkType,
  { label: string; bg: string; text: string }
> = {
  mainnet: {
    label: 'Mainnet',
    bg: 'bg-[#3B82F6]/10',
    text: 'text-[#3B82F6]',
  },
  testnet: {
    label: 'Testnet',
    bg: 'bg-[#8B5CF6]/10',
    text: 'text-[#8B5CF6]',
  },
};

export const NetworkBadge = ({ network }: NetworkBadgeProps) => {
  const { label, bg, text } = networkConfig[network];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-3 py-[2px] rounded-full text-sm',
        bg,
        text,
      )}
    >
      {label}
    </span>
  );
};
