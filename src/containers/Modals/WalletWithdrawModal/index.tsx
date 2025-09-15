'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { StrKey } from '@stellar/stellar-sdk';

import Modal from '@/components/Modal';
import Button from '@/components/Button';
import CInput from '@/components/Input';
import { useAppSelector } from '@/hooks/useRedux';
import withdrawXlm from '@/utils/soroban/withdrawXlm';

import { Success } from '@/assets';

interface WalletWithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

type Step = 'input' | 'processing' | 'result';

const WalletWithdrawModal = ({
  isOpen,
  onClose,
  className,
}: WalletWithdrawModalProps) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [hash, setHash] = useState('');
  const [status, setStatus] = useState(false);
  const [step, setStep] = useState<Step>('input');

  const [addressError, setAddressError] = useState('');
  const [amountError, setAmountError] = useState('');

  const memo = useAppSelector((state) => state.user.details?.memo);
  const balance = useAppSelector((state) => state.user.details?.balanceTest);

  const handleAddressChange = (value: string) => {
    setAddress(value);
    if (!value) {
      setAddressError('Address is required');
    } else if (!StrKey.isValidEd25519PublicKey(value)) {
      setAddressError('Invalid Stellar address');
    } else {
      setAddressError('');
    }
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (!value) {
      setAmountError('Amount is required');
    } else if (isNaN(Number(value))) {
      setAmountError('Amount must be a positive number');
    } else if (Number(balance) / 10 ** 7 - Number(value) < 9.5) {
      setAmountError(
        `The maximum withdrawable amount is ${(
          Number(balance) / 10 ** 7 -
          9.5
        ).toFixed(1)} XLM`,
      );
    } else {
      setAmountError('');
    }
  };

  const validAmount =
    Number(balance) < 9.5 && Number(balance) - Number(amount) < 9.5;

  const isValid =
    !addressError && !amountError && address && amount && validAmount;

  const handleWithdraw = async () => {
    if (!isValid) return;

    setStep('processing');
    try {
      const { finalize, hash } = await withdrawXlm(
        memo as string,
        amount,
        address,
      );

      setHash(hash);
      setStatus(finalize);
      setStep('result');
    } catch {
      setStatus(false);
      setStep('result');
    }
  };

  const handleClose = () => {
    setStep('input');
    setAddress('');
    setAmount('');
    setHash('');
    setStatus(false);
    setAddressError('');
    setAmountError('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className={className}
      title="Withdraw"
    >
      <div className="w-full flex flex-col gap-6">
        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              <CInput
                type="text"
                placeholder="Enter Stellar address"
                inputClassName="!bg-input text-white font-jetbrains"
                label="Destination Address"
                value={address}
                onChange={(e) => handleAddressChange(e.target.value)}
                error={!!addressError}
                errorMsg={addressError}
              />

              <CInput
                type="text"
                placeholder="Enter amount"
                inputClassName="!bg-input text-white font-jetbrains"
                label="Amount"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                error={!!amountError}
                errorMsg={amountError}
              />

              <p className="text-sm text-txtgray px-2">
                Enter the destination Stellar address and the amount of XLM you
                want to withdraw. Make sure the address is correct before
                proceeding.
              </p>

              <div className="w-full flex justify-end gap-3 mt-2 h-10">
                <Button
                  color="green"
                  rounded="sm"
                  content="Process"
                  className="w-full h-full text-[15px] font-normal"
                  onClick={handleWithdraw}
                  disabled={!isValid}
                />
              </div>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-4 py-10"
            >
              <motion.div
                className="w-14 h-14 border-4 border-t-primary border-b-primary rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              />
              <p className="text-white text-sm">
                Processing your withdrawal...
              </p>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center "
            >
              <div className="w-full p-4 rounded-xl flex flex-col items-center justify-center">
                {status ? (
                  <>
                    <div className="scale-150 bg-green-700 p-3 rounded-full mb-8">
                      <Success />
                    </div>
                    <p className="text-xl font-medium">
                      Transaction Successful
                    </p>
                    <p className="text-sm text-white/80 text-center">
                      Your withdrawal was successful
                    </p>

                    <Link
                      href={`https://stellar.expert/explorer/testnet/tx/${hash}`}
                      target="_blank"
                      className="text-[#326cff] mt-4 border border-primary/80 bg-primary/10 hover:bg-bgblack/60 transition-colors px-8 py-2 rounded-2xl text-sm"
                    >
                      See in explorer
                    </Link>
                  </>
                ) : (
                  <p className="text-red-400 text-lg font-semibold text-center">
                    ❌ Something went wrong!
                  </p>
                )}
                <Button
                  color="blue"
                  rounded="xl"
                  content="Done"
                  className="mt-8 w-[70%] h-9"
                  onClick={handleClose}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
};

export default WalletWithdrawModal;
