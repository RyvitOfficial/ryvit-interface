'use client';

import { useBlux, useBalance } from '@bluxcc/react';
import cn from 'classnames';

import CopyButton from '@/components/CopyButton';
import shortenAddress from '@/utils/shortenAddress';

import { StellarAsset, Wallet } from '@/assets';

const ExternalWalletCard = () => {
  const { isAuthenticated, login, logout, user } = useBlux();
  const { balance } = useBalance({ asset: 'native' });

  console.log(balance);

  const style = 'bg-bgblack2 py-2 px-4 rounded-xl';

  return (
    <div className="flex flex-col bg-bgblack border border-border3/70 rounded-2xl p-5 w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold">
            <div className="scale-75">
              <Wallet />
            </div>
          </div>
          <div>
            <p className="text-white font-medium">
              {user.wallet?.name ? user.wallet?.name : 'External'} Wallet
            </p>
            <p className="text-sm text-gray-400">External wallet</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div
            className={cn(
              'text-sm w-32 py-2 rounded-xl text-center shadow-sm cursor-pointer transition-colors',
              isAuthenticated
                ? 'bg-[#0e2d23] hover:bg-[#0e2d23]/80'
                : 'bg-[#3b0d0c] hover:bg-[#3b0d0c]/80',
            )}
          >
            {isAuthenticated ? (
              <p className="text-[#34d399]" onClick={() => logout()}>
                Connected
              </p>
            ) : (
              <p className="text-[#f87171]" onClick={() => login()}>
                Not Connected
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div
          className={cn(
            'text-gray-300 flex justify-between relative small:overflow-hidden small:justify-start ',
            style,
          )}
        >
          <span className="text-white/70">Address</span>
          {user.wallet?.address ? (
            <div className="relative font-jetbrains flex items-center text-[15px] text-white small:w-24 small:text-xs">
              {shortenAddress(user.wallet?.address, 15)}

              <CopyButton text={user.wallet?.address} />
            </div>
          ) : (
            '_'
          )}
        </div>

        <div
          className={cn('text-gray-300 truncate flex justify-between', style)}
        >
          <span className="text-white/70">Balance</span>

          <div className="text-white font-medium font-jetbrains">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4">
                  <StellarAsset />
                </div>
                <p className="text-[15px]"> {Number(balance).toFixed(4)}</p>
              </div>
            ) : (
              '_'
            )}
          </div>
        </div>
      </div>

      {!isAuthenticated && (
        <p className="text-txtgray mt-4 font-jetbrains text-sm">
          Connect your wallet to see address & balance
        </p>
      )}
    </div>
  );
};

export default ExternalWalletCard;
