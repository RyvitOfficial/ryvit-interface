'use client';

import { useAppSelector } from '@/hooks/useRedux';

import Renew from '@/assets/Renew';
import StatCard from '@/components/StateCard';

import { Alert, Key, Warning } from '@/assets';

const TTLStats = () => {
  const userDetails = useAppSelector((state) => state.user.details);

  return (
    <div className="grid grid-cols-4 gap-5">
      <StatCard
        title="Auto-Renew"
        value={userDetails ? userDetails.contractsCount : 0}
        icon={<Renew />}
        iconBgColor="#10B981"
      />
      <StatCard
        title="Near Expiry"
        value={userDetails ? userDetails.dataKeysExpireSoonCount : 0}
        icon={<Alert />}
        iconBgColor="#F59E0B"
      />
      <StatCard
        title="Expired"
        value="1"
        icon={<Warning />}
        iconBgColor="#EF4444"
      />
      <StatCard
        title="Total Keys"
        value={userDetails ? userDetails.detaKeysCount : 0}
        icon={<Key fill="#3B82F6" />}
        iconBgColor="#3B82F6"
      />
    </div>
  );
};

export default TTLStats;
