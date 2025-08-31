import React from 'react';
import cn from 'classnames';

export type ContractStatusBadgeType = 'active' | 'inactive';

interface ContractStatusBadgeProps {
  status: ContractStatusBadgeType;
}

const ContractStatusConfig: Record<
  ContractStatusBadgeType,
  { label: string; bg: string; text: string }
> = {
  active: {
    label: 'Active',
    bg: 'bg-[#10B981]/10',
    text: 'text-[#10B981]',
  },

  inactive: {
    label: 'Inactive',
    bg: 'bg-[#EF4444]/10',
    text: 'text-[#EF4444]',
  },
};

export const ContractStatusBadge = ({ status }: ContractStatusBadgeProps) => {
  const { label, bg, text } = ContractStatusConfig[status];

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
