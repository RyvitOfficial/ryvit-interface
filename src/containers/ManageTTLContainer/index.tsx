'use client';

import { useState } from 'react';

import { DataKeysTable } from '../DataKeysTable';
import TTLStats from '../TTLStatCard';
import TTLFilter from './TTLFilterCard';
import Overview from '@/components/Overview';
import Button from '@/components/Button';

import { useAppSelector } from '@/hooks/useRedux';

interface ManageTTLContainerProps {
  currentContractId: string;
}

const ManageTTLContainer = ({ currentContractId }: ManageTTLContainerProps) => {
  const [clearTrigger, setClearTrigger] = useState(0);
  const [dataKeySelect, setDataKeySelect] = useState<
    { id: string; name: string }[] | null
  >(null);

  const contracts = useAppSelector((state) => state.user.contracts);

  const selectedContract = contracts.filter(
    (e) => e.address === currentContractId,
  );

  const dataKeys = selectedContract[0].datakeys;

  const [dataKeyStatus, setDataKeyStatus] = useState({
    extends: 0,
    restore: 0,
  });

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
      <TTLFilter />
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
