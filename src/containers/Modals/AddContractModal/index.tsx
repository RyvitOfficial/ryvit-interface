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
        successMessage: 'Contract Added Successfuly',
        errorMessage: 'Contract Id exist!',
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
      title="Add Contract"
      icon={<FileAdd fill="#414651" />}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <CInput
          placeholder="Enter your contract name"
          label="Contract Name"
          border
          value={contractName}
          maxLength={20}
          onChange={handleContractNameChange}
          error={
            contractName !== '' &&
            (contractName.length < 3 || contractName.length > 20)
          }
          errorMsg="Contract name must be between 3 and 20 characters"
        />

        <CInput
          placeholder="Enter your contract Address"
          label="Contract Address"
          border
          value={contractAddress}
          onChange={handleContractAddressChange}
          error={!isValidAddress && contractAddress !== ''}
          errorMsg="The address is invalid"
        />

        <ValidateContract
          contractAddress={contractAddress}
          onValidationResult={setIsValidAddress}
        />

        <div className="flex items-center justify-center w-full space-x-2 mt-6">
          <Button
            content="Cancel"
            type="button"
            variant="simple"
            color="outlineWhiteBlack"
            className="!w-[40%]"
            onClick={handleCancelClick}
          />
          <Button
            content="Confirm"
            type="submit"
            variant="form"
            color="blue"
            className="!w-[60%]"
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddContractModal;
