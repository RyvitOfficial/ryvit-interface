'use client';

import { useEffect, useState } from 'react';
import { useBlux } from '@bluxcc/react';

import TTLStats from '../TTLStatCard';
import Button from '@/components/Button';
import DataKeysTable from '../DataKeysTable';
import Overview from '@/components/Overview';
import LoadingModal from '@/components/LoadingModal';
import ExtendTransactions from './ExtendTransactions';
import ExtendModalContainer from '../Modals/PaymentMethodModal';

import { useAppSelector } from '@/hooks/useRedux';

interface ManageTTLContainerProps {
  currentContractId: string;
}

const ManageTTLContainer = ({ currentContractId }: ManageTTLContainerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingIsOpen, setLoadingIsOpen] = useState(false);
  const [clearTrigger, setClearTrigger] = useState(0);
  const [disabledExtend, setDisabledExtend] = useState(true);
  const [method, setMethod] = useState<string | null>(null);
  const [loadingTitle, setLoadingTitle] = useState<string>('');

  const token = useAppSelector((state) => state.user.token);

  const { sendTransaction, login, user } = useBlux();

  const [selectedKeys, setSelectedKeys] = useState<Record<string, string>[]>(
    [],
  );

  const contracts = useAppSelector((state) => state.user.contracts);

  const selectedContract = contracts.filter(
    (e) => e.address === currentContractId,
  );

  const contractId = contracts.filter(
    (contract) => contract.address === currentContractId,
  );

  const dataKeys = selectedContract[0].datakeys;

  useEffect(() => {
    if (selectedKeys.length > 0) {
      setDisabledExtend(false);
    } else if (selectedKeys.length <= 0) {
      setDisabledExtend(true);
    }
  }, [selectedKeys]);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(true);
    }
  }, [isOpen]);

  const handleSelectionChange = (selected: Record<string, string>[]) => {
    setSelectedKeys(selected);
  };

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
      contractId[0]._id,
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
    <div
      className="flex flex-col w-full pt-5 px-5 space-y-4 "
      style={{ height: 'calc(100vh - 110px)' }}
    >
      <TTLStats dataKeys={dataKeys} />
      <div className="grid grid-cols-[4fr_1.28fr] desktopMax:grid-cols-[4fr_1.1fr] w-full gap-2 min-h-0 h-full">
        <DataKeysTable
          dataKeys={dataKeys}
          onSelectionChange={handleSelectionChange}
          clearTrigger={clearTrigger}
        />
        <div className="flex flex-col gap-4 w-full min-h-full">
          <Overview
            key={1}
            dataKeys={dataKeys}
            selectedDataKeys={selectedKeys}
          />

          <Button
            color="blue"
            content="Extend / Restore"
            rounded="xl"
            className="w-full h-[60px]"
            disabled={disabledExtend}
            onClick={ExtendOnClick}
          />
        </div>
      </div>

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
    </div>
  );
};

export default ManageTTLContainer;
