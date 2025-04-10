'use client';

import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useRedux';

import Toast from '@/components/Toasts';
import Overview from '@/components/Overview';
import { DataKeysTable } from '../DataKeysTable';
import FloatingMenu from '@/components/FloatingMenu';
import ManageContractCard from '../ManageContractCard';
import LoadingThreeDotsPulse from '@/components/LoadingDots';

import { findLengthExtendRestore } from '@/utils/findLengthExtendRestore';
import { CalculateSubscribeLength } from '@/utils/calculateSubscribeLength';

import { InformExtendApi } from '@/api/informExtendApi';
import { GetContractDetail } from '@/api/getContractDetail';

import { IGetContractResponse } from '@/types';

interface ManageContractProps {
  id: string;
}

const ManageContract = ({ id }: ManageContractProps) => {
  const [details, setDetails] = useState<IGetContractResponse>();
  const [selectedKeys, setSelectedKeys] = useState<Record<string, string>[]>(
    [],
  );
  const [disabledExtend, setDisabledExtend] = useState(true);

  const token = useAppSelector((state) => state.user.token);

  useEffect(() => {
    if (selectedKeys.length > 0) {
      setDisabledExtend(false);
    } else if (selectedKeys.length <= 0) {
      setDisabledExtend(true);
    }
  }, [selectedKeys]);

  useEffect(() => {
    const data = () => {
      GetContractDetail(id, token!, 'testnet').then((details) =>
        setDetails(details),
      );
    };

    data();

    const intervalId = setInterval(data, 5000);

    return () => clearInterval(intervalId);
  }, [id, token]);

  if (!details) {
    return (
      <div className="h-screen overflow-hidden w-full flex justify-center items-center">
        <LoadingThreeDotsPulse />
      </div>
    );
  }

  const ExtendOnClick = () => {
    const selectedDatakeysName = selectedKeys.map((key) => key.name);

    const extend = InformExtendApi(
      { dataKeys: selectedDatakeysName },
      token!,
      id,
    );

    Toast({
      type: 'process',
      text: 'Extending your DataKeys...',
      promise: extend,
      successMessage: 'DataKeys were successfully extended.',
      errorMessage: 'Failed to extend DataKeys. Please try again.',
    });
  };

  return (
    <section className="h-full">
      <article className="flex justify-between items-center h-[260px] mt-4">
        <div className="w-[73%] h-full">
          <ManageContractCard
            details={details}
            ExtendOnClick={ExtendOnClick}
            exntedDisabled={disabledExtend}
          />
        </div>
        <div className="w-[25%] h-full">
          <Overview
            plan={details.settings.plan}
            dataKeyLength={CalculateSubscribeLength(
              details.datakeys,
              selectedKeys,
            )}
            nextLedger={17280 * details.settings.plan}
            extendsRestores={findLengthExtendRestore(
              details.datakeys,
              selectedKeys,
            )}
          />
        </div>
      </article>

      <article className="h-[calc(95vh-373px)] mt-4">
        <DataKeysTable
          dataKeys={details.datakeys}
          onSelectionChange={setSelectedKeys}
        />
      </article>
      <FloatingMenu
        show={selectedKeys.length > 0}
        selectedCount={selectedKeys.length}
      />
    </section>
  );
};

export default ManageContract;
