import React from 'react';

type Status = 'expired' | 'near_expiry' | 'active';

type ProgressBarProps = {
  percent: number;
  status: Status;
  label?: string;
  className?: string;
  height?: 'sm' | 'md' | 'lg';
};

const H: Record<NonNullable<ProgressBarProps['height']>, string> = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

export default function ProgressBar({
  percent,
  status,
  label,
  className = '',
  height = 'sm',
}: ProgressBarProps) {
  const pct = Math.max(
    0,
    Math.min(100, Number.isFinite(percent) ? percent : 0),
  );

  const color =
    status === 'expired'
      ? 'bg-red-500'
      : status === 'near_expiry'
      ? 'bg-yellow-500'
      : 'bg-green-500';

  // const textColor =
  //   status === 'expired'
  //     ? 'text-red-500'
  //     : status === 'near_expiry'
  //     ? 'text-yellow-500'
  //     : 'text-green-500';

  return (
    <div className={`flex items-center gap-2 min-w-0 ${className}`}>
      <div
        className={`relative flex-1 w-full ${H[height]} bg-zinc-700 rounded-full overflow-hidden`}
      >
        <div
          className={`absolute inset-y-0 left-0 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <span dir="ltr" className={`text-txtgray text-xs`}>
        {label ?? `${Math.round(pct)}%`}
      </span>
    </div>
  );
}
