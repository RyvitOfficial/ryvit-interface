'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import Button from '@/components/Button';
import CInput from '@/components/Input';
import Toast from '@/components/Toasts';

import sendGenerateContract from '@/api/sendGenerateContract';
import shortenAddress from '@/utils/shortenAddress';
import { useAppSelector } from '@/hooks/useRedux';

import { IGeneratedToken } from '@/types';

const CreateContractContainer = () => {
  const [contractDetails, setContractAddressDetails] = useState<
    IGeneratedToken | undefined
  >(undefined);
  const [contractName, setContractName] = useState<string>('');

  const token = useAppSelector((state) => state.user.token);
  const userDetails = useAppSelector((state) => state.user.details);

  const handleCopyAddress = () => {
    if (contractDetails) {
      navigator.clipboard
        .writeText(contractDetails.address)
        .then(() => Toast({ type: 'success', text: 'Address copied!' }))
        .catch((err) => console.error('Failed to copy address: ', err));
    }
  };

  const handleTokenNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContractName(e.target.value.trim());
  };

  const handleGenerateContract = async () => {
    const generatedContractDetails = sendGenerateContract(token!, contractName);

    Toast({
      type: 'process',
      text: 'Creating token contract...',
      promise: generatedContractDetails,
      setValues: setContractAddressDetails,
      successMessage: 'Token contract created successfully!',
      errorMessage: 'Failed to create token contract. Please try again.',
    });
  };

  const address = userDetails?.generatedToken
    ? userDetails?.generatedToken.address
    : contractDetails
    ? contractDetails.address
    : '';

  const showAddress = shortenAddress(address, 6).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="rounded-2xl overflow-hidden h-full shadow-md bg-primary/100"
    >
      <div className="flex flex-col items-center justify-between text-white h-full w-full desktop:px-4 py-4 small:justify-start small:flex-row small:px-8">
        <div className="small:w-full ">
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-lg font-semibold text-white mb-2"
          >
            Generate Token <span className="text-[#E7FB05]">Contract</span> &
            Get Address
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-sm text-white mb-4 font-light pr-1"
          >
            We create the token contract for you and provide a test address to
            use within the app
          </motion.p>
        </div>

        {address.length ? (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full desktop:max-w-[300px] small:w-full small:flex small:items-center"
          >
            <p className="mb-2 text-sm px-1 small:w-[40%]">
              <code>{userDetails?.generatedToken?.name}</code> Address :
            </p>
            <div className="flex items-center justify-between bg-gray-800 p-3 rounded-xl overflow-x-auto small:w-full">
              <span className="text-white text-xs small:text-[10px]">
                <code>{showAddress}</code>
              </span>
              <Button
                color="yellow"
                rounded="sm"
                content="Copy"
                onClick={handleCopyAddress}
                className="ml-2 !h-8 !w-[20px] text-xs"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full"
          >
            <div className="space-y-4">
              <CInput
                placeholder="Enter token name"
                border
                maxLength={10}
                inputClassName="placeholder:!text-white/90 !text-white bg-white border-white/50"
                onChange={handleTokenNameOnChange}
              />
              <Button
                color="yellow"
                rounded="xl"
                content="Generate Contract"
                className="!w-full"
                onClick={handleGenerateContract}
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CreateContractContainer;
