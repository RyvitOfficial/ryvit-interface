'use client';

import { useState } from 'react';
import Image from 'next/image';

import AddContractModal from '@/containers/Modals/AddContractModal';

import { useAppSelector } from '@/hooks/useRedux';
import ContractList from './ContractList';
import FilterCard from './FilterCard';

const ContractsContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const data = useAppSelector((state) => state.user.contracts);

  const handleAddContarctModal = () => {
    setIsOpen(true);
  };

  const ModalOnClose = () => {
    setIsOpen(false);
  };

  let contractListStatus;

  if (data) {
    if (data.length === 0) {
      contractListStatus = (
        <div className="w-full mt-[5%] flex justify-center items-center">
          <Image src="/images/not.png" alt="Empty" width={300} height={300} />
        </div>
      );
    } else {
      contractListStatus = <ContractList data={data} search={search} />;
    }
  }

  return (
    <div className="w-full h-full p-5 flex flex-col gap-4">
      {/* <AddContractCard addContractOnClick={handleAddContarctModal} /> */}
      <FilterCard
        search={search}
        setSearch={setSearch}
        onAddContract={handleAddContarctModal}
      />

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
