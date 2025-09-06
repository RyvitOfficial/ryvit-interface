'use client';

import Renew from '@/assets/Renew';
import StatCard from '@/components/StateCard';

import { IDataKey } from '@/types';

import calculateStatusContract from '@/utils/calculateStatusContract';

import { Alert, Key, Warning } from '@/assets';

interface ITTLStats {
  dataKeys: IDataKey[];
}

const TTLStats = ({ dataKeys }: ITTLStats) => {
  const nearExpiryCount = dataKeys.filter(
    (d) => calculateStatusContract(d.liveLedger) === 'near_expiry',
  ).length;

  const autoRenewCount = dataKeys.filter((d) => d.autoExtend === true).length;

  const expiredCount = dataKeys.filter(
    (d) => calculateStatusContract(d.liveLedger) === 'expired',
  ).length;

  return (
    <div className="grid grid-cols-4 gap-5">
      <StatCard
        title="Auto-Renew"
        value={autoRenewCount}
        icon={<Renew />}
        iconBgColor="#10B981"
      />
      <StatCard
        title="Near Expiry"
        value={nearExpiryCount}
        icon={<Alert />}
        iconBgColor="#F59E0B"
      />
      <StatCard
        title="Expired"
        value={expiredCount}
        icon={<Warning />}
        iconBgColor="#EF4444"
      />
      <StatCard
        title="Total Keys"
        value={dataKeys.length}
        icon={<Key fill="#3B82F6" />}
        iconBgColor="#3B82F6"
      />
    </div>
  );
};

export default TTLStats;
