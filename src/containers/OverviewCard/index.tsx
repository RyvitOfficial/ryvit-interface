'use client';

import { Contract, Event, Key } from '@/assets';
import Renew from '@/assets/Renew';
import DashboardStatCard from '@/components/DashboardStatCard';

import { useAppSelector } from '@/hooks/useRedux';

const DashboardStats = () => {
  const userDetails = useAppSelector((state) => state.user.details);

  return (
    <div className="grid grid-cols-4 gap-5 mt-6">
      <DashboardStatCard
        icon={<Contract />}
        label="Smart Contracts"
        description="Active contracts managed"
        value={userDetails ? userDetails.contractsCount : 0}
        color="text-blue-400"
        iconBgColor="#3B82F6"
      />
      <DashboardStatCard
        icon={<Key fill="#A855F7" />}
        label="Data Keys"
        description="Managed storage keys"
        value={userDetails ? userDetails.detaKeysCount : 0}
        color="text-purple-400"
        iconBgColor="#A855F7"
      />
      <DashboardStatCard
        icon={<Renew />}
        label="Auto Renewals"
        description="Active TTL renewals"
        value={2}
        color="text-green-400"
        iconBgColor="#10B981"
      />
      <DashboardStatCard
        icon={<Event fill="#FB923C" />}
        label="Event Monitors"
        description="Events being watched"
        value={23}
        color="text-orange-400"
        iconBgColor="#F59E0B"
      />
    </div>
  );
};

export default DashboardStats;
