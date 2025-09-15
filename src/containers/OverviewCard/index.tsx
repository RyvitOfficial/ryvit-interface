'use client';

import { Contract, Event, Key } from '@/assets';
import Renew from '@/assets/Renew';
import DashboardStatCard from '@/components/DashboardStatCard';

import { useAppSelector } from '@/hooks/useRedux';

const DashboardStats = () => {
  const userDetails = useAppSelector((state) => state.user.details);
  const contracts = useAppSelector((state) => state.user.contracts);

  const events = contracts.map((c) => c.event.events);
  const eventConfigs = contracts.map((c) => c.event.eventConfig);
  const eventConfigIds = eventConfigs
    .filter((e) => e.active === true)
    .map((e) => e._id);

  let eventMonitors = 0;
  let autoRenewals = 0;

  events.map((e) => {
    eventMonitors += e.filter(
      (f) => eventConfigIds.includes(f.config) && f.selected === true,
    ).length;
  });

  const datakeys = contracts.map((c) => c.datakeys);

  datakeys.map((d) => {
    autoRenewals += d.filter((f) => f.autoExtend === true).length;
  });

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
        value={autoRenewals}
        color="text-green-400"
        iconBgColor="#10B981"
      />
      <DashboardStatCard
        icon={<Event fill="#FB923C" />}
        label="Event Monitors"
        description="Events being watched"
        value={eventMonitors}
        color="text-orange-400"
        iconBgColor="#F59E0B"
      />
    </div>
  );
};

export default DashboardStats;
