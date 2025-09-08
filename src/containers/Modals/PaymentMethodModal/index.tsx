import { useEffect } from 'react';

import Modal from '@/components/Modal';
import Button from '@/components/Button';
import PaymentOption from '@/components/PaymentOption';
import { useAppSelector } from '@/hooks/useRedux';

interface ExtendModalContainer {
  isOpen: boolean;
  setIsOpen: (_: boolean) => void;
  onClose: () => void;
  handleConfirmOnClick: () => void;
  method: string | null;
  setMethod: (_: string | null) => void;
}

const ExtendModalContainer = ({
  isOpen,
  setIsOpen,
  onClose,
  handleConfirmOnClick,
  method,
  setMethod,
}: ExtendModalContainer) => {
  useEffect(() => {
    if (isOpen) setIsOpen(true);
  }, [isOpen, setIsOpen]);

  const balance = useAppSelector((state) => state.user.details?.balanceTest);

  const handleIconClick = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      iconClick={handleIconClick}
      title="Choose Payment Method"
    >
      <div className="flex flex-col gap-3">
        {/* Ryvit Balance */}

        <PaymentOption
          value="ryvit"
          method={method}
          setMethod={setMethod}
          label="Pay with Ryvit Balance"
          description="Use the balance available in your Ryvit account"
          balance={(balance! / 10 ** 7).toString() + ' XLM'}
        />

        {/* External Wallet */}
        <PaymentOption
          value="wallet"
          method={method}
          setMethod={setMethod}
          label="Pay with External Wallet"
          description="Connect and pay directly via your wallet"
        />
      </div>

      <p className="text-sm text-txtgray2 px-2 ">
        After confirming, your payment will be processed and the contract TTL
        will be extended automatically.
      </p>

      {/* Footer Buttons */}
      <div className="w-full flex justify-end gap-3 mt-1 h-10">
        <Button
          rounded="sm"
          color="dark"
          content="Cancel"
          onClick={onClose}
          className="!w-1/5 !h-full text-sm text-white"
        />
        <Button
          disabled={!method}
          rounded="sm"
          color="blue"
          content="Confirm & Pay"
          className="!w-2/6 !h-full text-sm"
          onClick={handleConfirmOnClick}
        />
      </div>
    </Modal>
  );
};

export default ExtendModalContainer;
