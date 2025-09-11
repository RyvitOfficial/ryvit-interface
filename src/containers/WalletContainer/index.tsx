'use client';

import Card from '@/components/Card';
import ExternalWalletCard from './ExternalWallet';
import InternalWalletCard from './InternalWallet';
import RecentTransactions from './RecentTransaction';

const WalletContainer = () => {
  return (
    <div
      className="flex flex-col p-5 gap-4 overflow-hidden"
      style={{ height: 'calc(100vh - 110px)' }}
    >
      <Card
        bgColor="#121319"
        borderColor="transparent"
        className="w-full text-white py-5 px-6"
      >
        <h2 className="text-white text-lg font-semibold mb-4">
          Wallet Connection
        </h2>
        <div className="grid grid-cols-2 small:grid-cols-1 gap-4">
          <ExternalWalletCard />
          <InternalWalletCard
            onDeposit={() => alert('Deposit clicked')}
            onWithdraw={() => alert('Withdraw clicked')}
          />
        </div>
      </Card>

      <RecentTransactions />
    </div>
  );
};

export default WalletContainer;
