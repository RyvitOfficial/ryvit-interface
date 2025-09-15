'use client';

import { StellarAsset, Wallet } from '@/assets';
import WalletDepositModal from '@/containers/Modals/WalletDepositModal';
import WalletWithdrawModal from '@/containers/Modals/WalletWithdrawModal';
import { useAppSelector } from '@/hooks/useRedux';
import { useState } from 'react';

const InternalWalletCard = () => {
  const [walletDepositIsOpen, setWalletDepositIsOpen] = useState(false);
  const [walletWithdrawIsOpen, setWalletWithdrawIsOpen] = useState(false);

  const balance = useAppSelector((state) => state.user.details?.balanceTest);

  const handleDepositClick = () => {
    setWalletDepositIsOpen(true);
  };

  const handleCloseDepositModal = () => {
    setWalletDepositIsOpen(false);
  };

  const handleWithdrawClick = () => {
    setWalletWithdrawIsOpen(true);
  };

  const handleCloseWithdrawModal = () => {
    setWalletWithdrawIsOpen(false);
  };

  return (
    <div className="flex flex-col bg-bgblack border border-border2/70 rounded-2xl p-4 w-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">
          <div className="scale-75">
            <Wallet />
          </div>
        </div>
        <div>
          <p className="text-white font-medium">Internal Wallet</p>
          <p className="text-sm text-gray-400">Preloaded balance</p>
        </div>
      </div>

      <div className="flex justify-between mb-3 bg-bgblack2 py-2 px-4 rounded-xl">
        <span className="text-white/70">Balance</span>
        <div className="text-white font-medium flex items-center gap-2">
          {(balance! / 10 ** 7).toFixed(3)}
          <div className="w-4 h-4">
            <StellarAsset />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={handleDepositClick}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Deposit
        </button>
        <button
          onClick={handleWithdrawClick}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg"
        >
          Withdraw
        </button>
      </div>

      <WalletDepositModal
        isOpen={walletDepositIsOpen}
        onClose={handleCloseDepositModal}
      />

      <WalletWithdrawModal
        isOpen={walletWithdrawIsOpen}
        onClose={handleCloseWithdrawModal}
      />
    </div>
  );
};

export default InternalWalletCard;
