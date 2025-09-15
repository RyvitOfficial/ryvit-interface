'use client';

import { Balance } from '@/assets';
import { useAppSelector } from '@/hooks/useRedux';
import React from 'react';

const WalletBalanceCard = () => {
  const balance = useAppSelector((state) => state.user.details?.balanceTest);

  return (
    <div
      className={`bg-bgblack w-full border-border2/30 rounded-lg p-4 flex items-center gap-4 border hover:shadow-lg transition duration-200 cursor-pointer hover:brightness-90`}
    >
      <div
        className={`h-12 w-10 flex justify-center items-center rounded-md bg-[#EAB308]/20`}
      >
        <Balance />
      </div>
      <div className="flex items-center justify-between w-full">
        <div>
          <div className="text-white font-medium">Internal Wallet Balance</div>
          <div className="text-sm text-txtgray2">Available for operations</div>
        </div>
        <div>
          <div className="text-[#EAB308] text-xl font-jetbrains">
            {(Number(balance) / 10 ** 7).toFixed(3)}
          </div>
          <div className="text-sm text-[#9CA3AF] text-right">XLM</div>
        </div>
      </div>
    </div>
  );
};

export default WalletBalanceCard;
