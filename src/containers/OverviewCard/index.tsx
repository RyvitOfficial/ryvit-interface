'use client';

import StatCard from '@/components/StateCard';

import { useAppSelector } from '@/hooks/useRedux';

const DashboardStats = () => {
  const userDetails = useAppSelector((state) => state.user.details);

  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      <StatCard
        title="Active Contracts"
        value={userDetails ? userDetails.contractsCount : 0}
        color="bg-gradient-to-br from-blue-600 to-blue-800"
      />
      <StatCard
        title="TTL Expiring Soon"
        value={userDetails ? userDetails.dataKeysExpireSoonCount : 0}
        color="bg-gradient-to-br from-yellow-500 to-yellow-600"
      />
      <StatCard
        title="Wallet Balance"
        value={`${
          userDetails ? (userDetails.balanceTest / 10 ** 7).toFixed(3) : 0
        } XLM`}
        color="bg-gradient-to-br from-green-500 to-green-600"
      />
      <StatCard
        title="Total Data Keys"
        value={userDetails ? userDetails.detaKeysCount : 0}
        color="bg-gradient-to-br from-gray-600 to-gray-700"
      />
    </div>
  );
};

export default DashboardStats;
