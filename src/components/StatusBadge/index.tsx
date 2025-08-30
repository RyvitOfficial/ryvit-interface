import React from 'react';
import cn from 'classnames';

type StatusType = 'active' | 'near_expiry' | 'expired';

interface StatusBadgeProps {
  status: StatusType;
}

const statusConfig: Record<
  StatusType,
  { label: string; bg: string; text: string }
> = {
  active: {
    label: 'Active',
    bg: 'bg-[#10B981]/10',
    text: 'text-[#10B981]',
  },
  near_expiry: {
    label: 'Near Expiry',
    bg: 'bg-[#F59E0B]/10',
    text: 'text-[#F59E0B]',
  },
  expired: {
    label: 'Expired',
    bg: 'bg-[#EF4444]/10',
    text: 'text-[#EF4444]',
  },
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { label, bg, text } = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-3 py-[2px] rounded-full text-sm ',
        bg,
        text,
      )}
    >
      {label}
    </span>
  );
};
