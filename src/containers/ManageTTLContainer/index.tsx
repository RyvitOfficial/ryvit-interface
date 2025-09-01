'use client';

import { useState } from 'react';

import { DataKeysTable } from '../DataKeysTable';
import TTLStats from '../TTLStatCard';
import TTLFilter from './TTLFilterCard';
import Overview from '@/components/Overview';
import Button from '@/components/Button';

import { IDataKey } from '@/types';

const dataKeys: IDataKey[] = [
  {
    _id: '1',
    name: 'lockup 23',
    type: 'lockup',
    liveLedger: 123456,
    network: 'testnet',
    contract: 'contract_123',
    valuesType: 'none',
    values: [],
    status: 'active',
    expiresAt: '2024-02-01',
    timeRemaining: '30d 0h',
    autoRenew: true,
  },
  {
    _id: '2',
    name: 'lockup 22',
    type: 'lockup',
    liveLedger: 123457,
    network: 'mainnet',
    contract: 'contract_456',
    valuesType: 'none',
    values: [],
    status: 'near_expiry',
    expiresAt: '2024-02-08',
    timeRemaining: '2d 12h',
    autoRenew: true,
  },
  {
    _id: '3',
    name: 'lockup 10',
    type: 'lockup',
    liveLedger: 123458,
    network: 'testnet',
    contract: 'contract_789',
    valuesType: 'none',
    values: [],
    status: 'expired',
    expiresAt: '2024-01-01',
    timeRemaining: 'Expired',
    autoRenew: false,
  },
  {
    _id: '4',
    name: 'lockup 8',
    type: 'lockup',
    liveLedger: 123459,
    network: 'mainnet',
    contract: 'contract_987',
    valuesType: 'none',
    values: [],
    status: 'expired',
    expiresAt: '2024-01-01',
    timeRemaining: 'Expired',
    autoRenew: false,
  },
  {
    _id: '5',
    name: 'lockup 7',
    type: 'lockup',
    liveLedger: 123460,
    network: 'testnet',
    contract: 'contract_654',
    valuesType: 'none',
    values: [],
    status: 'expired',
    expiresAt: '2024-01-01',
    timeRemaining: 'Expired',
    autoRenew: false,
  },
];

interface ManageTTLContainerProps {
  currentContractId: string;
}

const ManageTTLContainer = ({ currentContractId }: ManageTTLContainerProps) => {
  const [clearTrigger, setClearTrigger] = useState(0);
  const [dataKeySelect, setDataKeySelect] = useState<
    { id: string; name: string }[] | null
  >(null);

  const [dataKeyStatus, setDataKeyStatus] = useState({
    extends: 0,
    restore: 0,
  });

  const filteredDataKeys = dataKeys.filter(
    (key) => key.contract === currentContractId,
  );

  const handleSelectionChange = (
    selected: { id: string; name: string; status: string }[],
  ) => {
    setDataKeySelect(selected);

    const extendCount = selected.filter(
      (item) => item.status === 'active' || item.status === 'near_expiry',
    ).length;

    const restoreCount = selected.filter(
      (item) => item.status === 'expired',
    ).length;

    setDataKeyStatus({
      extends: extendCount,
      restore: restoreCount,
    });
  };

  return (
    <div
      className="flex flex-col w-full pt-5 px-5 space-y-4 "
      style={{ height: 'calc(100vh - 110px)' }}
    >
      <TTLStats />
      <TTLFilter currentContractId={currentContractId} />
      <div className="grid grid-cols-[4fr_1.28fr] desktopMax:grid-cols-[4fr_1.1fr] w-full gap-2 min-h-0 h-full">
        <DataKeysTable
          dataKeys={dataKeys}
          onSelectionChange={handleSelectionChange}
          clearTrigger={clearTrigger}
        />
        <div className="flex flex-col gap-4 w-full min-h-full">
          <Overview
            key={1}
            dataKeyLength={dataKeySelect ? dataKeySelect?.length : 0}
            extendsRestores={{
              extendes: dataKeyStatus.extends,
              restores: dataKeyStatus.restore,
            }}
          />

          <Button
            color="blue"
            content="Extend / Restore"
            rounded="xl"
            className="w-full h-[60px]"
            disabled={!dataKeySelect || dataKeySelect.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageTTLContainer;
