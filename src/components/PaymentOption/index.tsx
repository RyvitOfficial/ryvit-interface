'use client';

import cn from 'classnames';

interface PaymentOptionProps {
  value: string;
  method: string | null;
  setMethod: (_: string) => void;
  label: string;
  description: string;
  balance?: string;
}

const PaymentOption = ({
  value,
  method,
  setMethod,
  label,
  description,
  balance,
}: PaymentOptionProps) => {
  const isActive = method === value;

  return (
    <button
      onClick={() => setMethod(value)}
      className={cn(
        'w-full border rounded-2xl p-5 text-left transition-colors duration-50 ease-in-out bg-transparent',
        isActive
          ? 'border-primary/40 bg-gray-900'
          : 'border-border4 hover:border-primary/60',
      )}
    >
      <div className="flex justify-between">
        <p className="font-medium text-white text-base">{label}</p>
        {balance && (
          <p className="text-sm text-white/70 mt-1">Balance: {balance}</p>
        )}
      </div>
      <p className="text-sm text-txtgray mt-1">{description}</p>
    </button>
  );
};

export default PaymentOption;
