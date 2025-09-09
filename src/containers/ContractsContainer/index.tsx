'use client';

import { useState } from 'react';
import Image from 'next/image';

import AddContractModal from '@/containers/Modals/AddContractModal';
import ContractList from './ContractList';
import FilterCard from './FilterCard';

import { useAppSelector } from '@/hooks/useRedux';

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
        <div className="w-full mt-[5%] flex flex-col justify-center items-center gap-2">
          <Image
            src="/images/not.png"
            alt="Empty"
            width={200}
            height={200}
            className="opacity-95"
            draggable={false}
            priority
            style={{ height: 'auto', width: 'auto' }}
          />
          <p className="text-lg font-medium text-white/95">
            You haven’t added any contracts yet
          </p>
          <p className="text-txtgray">
            Use the <b className="text-primary font-grotesk">Add Contract</b>{' '}
            button above to create your first one.
          </p>
        </div>
      );
    } else {
      contractListStatus = <ContractList data={data} search={search} />;
    }
  }

  return (
    <div className="w-full h-full p-5 flex flex-col gap-4">
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
