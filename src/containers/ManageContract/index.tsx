'use client';

import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useRedux';

import Overview from '@/components/Overview';
import { DataKeysTable } from '../DataKeysTable';
import FloatingMenu from '@/components/FloatingMenu';
import ManageContractCard from '../ManageContractCard';
import LoadingThreeDotsPulse from '@/components/LoadingDots';

import { findLengthExtendRestore } from '@/utils/findLengthExtendRestore';
import { CalculateSubscribeLength } from '@/utils/calculateSubscribeLength';

import { GetContractDetail } from '@/api/getContractDetail';

import { IGetContractResponse } from '@/types';
import ExtendModalContainer from '../Modals/PaymentMethodModal';

import { useBlux } from '@bluxcc/react';

import LoadingModal from '@/components/LoadingModal';
import ExtendTransactions from './ExtendTransactions';

interface ManageContractProps {
  id: string;
}

const ManageContract = ({ id }: ManageContractProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingIsOpen, setLoadingIsOpen] = useState(false);
  const [details, setDetails] = useState<IGetContractResponse>();
  const [selectedKeys, setSelectedKeys] = useState<Record<string, string>[]>(
    [],
  );
  const [clearTrigger, setClearTrigger] = useState(0);
  const [disabledExtend, setDisabledExtend] = useState(true);
  const [method, setMethod] = useState<string | null>(null);
  const [loadingTitle, setLoadingTitle] = useState<string>('');

  const token = useAppSelector((state) => state.user.token);

  const { sendTransaction, login, user } = useBlux();

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

  useEffect(() => {
    if (isOpen) {
      setIsOpen(true);
    }
  }, [isOpen]);

  if (!details) {
    return (
      <div className="h-screen overflow-hidden w-full flex justify-center items-center">
        <LoadingThreeDotsPulse />
      </div>
    );
  }

  const ExtendOnClick = () => {
    setIsOpen(true);
  };

  const handleOnClose = () => {
    setMethod(null);
    setIsOpen(false);
  };

  const handleConfirmOnClick = async () => {
    ExtendTransactions(
      method,
      selectedKeys,
      id,
      setClearTrigger,
      setIsOpen,
      setLoadingIsOpen,
      setMethod,
      setLoadingTitle,
      sendTransaction,
      login,
      user.wallet?.address,
      token,
    );
  };

  return (
    <section className="w-full h-full">
      <article className="flex justify-between items-center h-[260px] mt-4 gap-4">
        <div className="xl:w-[70%] desktop:w-[70%] tablet:w-[60%] h-full">
          <ManageContractCard
            details={details}
            ExtendOnClick={ExtendOnClick}
            exntedDisabled={disabledExtend}
          />
        </div>
        <div className="xl:w-[30%] desktop:w-[30%] tablet:w-[40%] h-full">
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

      <article className="h-[calc(95vh-373px)] mt-4 ">
        <DataKeysTable
          dataKeys={details.datakeys}
          onSelectionChange={setSelectedKeys}
          clearTrigger={clearTrigger}
        />
      </article>
      <FloatingMenu
        show={selectedKeys.length > 0}
        selectedCount={selectedKeys.length}
      />

      <ExtendModalContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={handleOnClose}
        handleConfirmOnClick={handleConfirmOnClick}
        method={method}
        setMethod={setMethod}
      />

      <LoadingModal
        isOpen={loadingIsOpen}
        onClose={handleOnClose}
        title={loadingTitle}
      />
    </section>
  );
};

export default ManageContract;
