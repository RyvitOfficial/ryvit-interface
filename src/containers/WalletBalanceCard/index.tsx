import { Balance } from '@/assets';
import React from 'react';

const WalletBalanceCard = () => {
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
          <div className="text-[#EAB308] text-xl font-jetbrains">2,847.50</div>
          <div className="text-sm text-[#9CA3AF] text-right">XLM</div>
        </div>
      </div>
    </div>
  );
};

export default WalletBalanceCard;
