'use client';

import { useState } from 'react';

import AddContractCard from '@/components/AddContractCard';
import AddContractModal from '../Modals/AddContractModal';

const ContractsContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddContarctModal = () => {
    setIsOpen(true);
  };

  const ModalOnClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full h-full">
      <AddContractCard addContractOnClick={handleAddContarctModal} />
      <AddContractModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={ModalOnClose}
      />
    </div>
  );
};

export default ContractsContainer;
