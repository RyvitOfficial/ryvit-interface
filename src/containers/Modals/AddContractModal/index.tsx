'use client';

import { useState, useEffect } from 'react';
import { StrKey } from '@stellar/stellar-sdk';
import { useAppSelector } from '@/hooks/useRedux';

import Modal from '@/components/Modal';
import CInput from '@/components/Input';
import Button from '@/components/Button';
import Toast from '@/components/Toasts';

import { AddContract } from '@/api/addContract';

import { FileAdd } from '@/assets';

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

  useEffect(() => {
    if (isOpen) {
      setIsOpen(true);
    }
  }, [isOpen, setIsOpen]);

  const token = useAppSelector((state) => state.user.token);
  const isLogin = useAppSelector((state) => state.user.isLogin);

  const isValidateContractAddress = StrKey.isValidContract(
    contractAddress.toUpperCase(),
  );

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

    if (isLogin) {
      const addContractPromise = AddContract(
        { name: contractName, contractId: contractAddress },
        token!,
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Contract"
      icon={<FileAdd fill="#414651" />}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <CInput
          placeholder="Enter your contract name"
          label="Contract Name"
          border
          value={contractName}
          onChange={handleContractNameChange}
          error={contractName !== '' && contractName.length < 3}
          errorMsg="Contract name must be at least 3 characters"
        />

        <CInput
          placeholder="Enter your contract Address"
          label="Contract Address"
          border
          value={contractAddress}
          error={!isValidateContractAddress && contractAddress !== ''}
          errorMsg="The address is invalid"
          onChange={handleContractAddressChange}
        />

        <div className="flex items-center justify-center w-full space-x-2 mt-6">
          <Button
            content="Cancel"
            type="button"
            variant="simple"
            color="outlineWhiteBlack"
            className="!w-[40%]"
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
