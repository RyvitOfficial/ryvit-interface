'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { useAppSelector } from '@/hooks/useRedux';

import Modal from '@/components/Modal';
import CInput from '@/components/Input';
import Button from '@/components/Button';
import Toast from '@/components/Toasts';

import { AddContract } from '@/api/addContract';

import { FileAdd } from '@/assets';

const ValidateContract = dynamic(() => import('@/utils/ValidateContract'), {
  ssr: false,
});

interface AddContractModalProps {
  isOpen: boolean;
  setIsOpen: (_: boolean) => void;
  onClose: () => void;
}

const AddContractModal = ({
  isOpen,
  setIsOpen,
  onClose,
}: AddContractModalProps) => {
  const [contractName, setContractName] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [isValidAddress, setIsValidAddress] = useState(false);

  const token = useAppSelector((state) => state.user.token);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(true);
    }
  }, [isOpen, setIsOpen]);

  const handleContractAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setContractAddress(e.target.value.trim());
  };

  const handleContractNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContractName(e.target.value.trim());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (token && isValidAddress) {
      const addContractPromise = AddContract(
        { name: contractName, contractId: contractAddress },
        token,
      );

      Toast({
        type: 'process',
        text: 'Adding contract...',
        promise: addContractPromise,
      });
    }

    setContractName('');
    setContractAddress('');
    onClose();
  };

  const handleCancelClick = () => {
    setContractName('');
    setContractAddress('');
    onClose();
  };

  const handleIconClick = () => {
    setContractName('');
    setContractAddress('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      iconClick={handleIconClick}
      title="Add New Contract"
      icon={<FileAdd fill="#fff" />}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <CInput
          placeholder="Type a name for your contract"
          label="Contract Name"
          value={contractName}
          maxLength={20}
          onChange={handleContractNameChange}
          error={
            contractName !== '' &&
            (contractName.length < 3 || contractName.length > 20)
          }
          errorMsg="Name must be between 3 and 20 characters."
          inputClassName="!bg-input text-white font-jetbrains"
        />

        <CInput
          placeholder="Paste your contract address"
          label="Contract Address"
          value={contractAddress}
          onChange={handleContractAddressChange}
          error={!isValidAddress && contractAddress !== ''}
          errorMsg="This contract address is not valid."
          inputClassName="!bg-input text-white font-jetbrains"
        />

        <ValidateContract
          contractAddress={contractAddress}
          onValidationResult={setIsValidAddress}
        />

        <p className="text-xs text-txtgray px-1 pb-2">
          Enter a name to identify your contract and paste the exact contract
          address.
          <span className="italic"> Address must be valid on Soroban.</span>
        </p>

        <div className="w-full flex justify-end gap-3 mt-8 h-10">
          <Button
            content="Cancel"
            type="button"
            rounded="sm"
            color="dark"
            className="w-1/5 h-full text-sm text-white"
            onClick={handleCancelClick}
          />
          <Button
            content="Add Contract"
            type="submit"
            rounded="sm"
            color="green"
            className="w-2/6 h-full text-sm"
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddContractModal;
