'use client';

import { useState } from 'react';
import Image from 'next/image';

import ContractsList from './ContractsList';
import AddContractCard from '@/components/AddContractCard';
import LoadingThreeDotsPulse from '@/components/LoadingDots';
import AddContractModal from '@/containers/Modals/AddContractModal';

import { useGetContracts } from '@/hooks/useGetContracts';
import { useAppSelector } from '@/hooks/useRedux';

const ContractsContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const token = useAppSelector((state) => state.user.token);

  const handleAddContarctModal = () => {
    setIsOpen(true);
  };

  const ModalOnClose = () => {
    setIsOpen(false);
  };

  const { data, error, loading } = useGetContracts(token!, 'testnet');

  let contractListStatus;

  if (error) {
    contractListStatus = (
      <div className="w-full mt-[5%] flex justify-center items-center">
        Error
      </div>
    );
  }

  if (loading) {
    contractListStatus = (
      <div className="mt-[10%] flex justify-center items-center">
        <LoadingThreeDotsPulse />
      </div>
    );
  }

  if (data) {
    if (data.length === 0) {
      contractListStatus = (
        <div className="w-full mt-[5%] flex justify-center items-center">
          <Image src="/images/not.png" alt="Empty" width={300} height={300} />
        </div>
      );
    } else {
      contractListStatus = <ContractsList data={data} />;
    }
  }

  return (
    <div className="w-full h-full">
      <AddContractCard addContractOnClick={handleAddContarctModal} />
      <AddContractModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={ModalOnClose}
      />

      {contractListStatus}
    </div>
  );
};

export default ContractsContainer;
