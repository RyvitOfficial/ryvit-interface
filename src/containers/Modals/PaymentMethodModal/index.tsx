import { useEffect } from 'react';
import cn from 'classnames';

import Modal from '@/components/Modal';
import Button from '@/components/Button';

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
        <button
          onClick={() => setMethod('ryvit')}
          className={cn(
            'w-full border rounded-2xl p-5 text-left transition-colors duration-50 bg-transparent',
            method === 'ryvit'
              ? 'border-primary/40 bg-primaryLight'
              : ' border-border4 hover:border-primary/60',
          )}
        >
          <p className="font-medium text-white text-base">
            Pay with Ryvit Balance
          </p>
          <p className="text-sm text-txtgray mt-1">
            Use the balance available in your Ryvit account
          </p>
        </button>

        {/* External Wallet */}
        <button
          onClick={() => setMethod('wallet')}
          className={cn(
            'w-full border rounded-2xl p-5 text-left transition-colors duration-50 ease-in-out bg-transparent',
            method === 'wallet'
              ? 'border-primary/40 bg-primaryLight'
              : ' border-border4 hover:border-primary/60',
          )}
        >
          <p className="font-medium text-white text-base">
            Pay with External Wallet
          </p>
          <p className="text-sm text-txtgray2 mt-1">
            Connect and pay directly via your wallet
          </p>
        </button>
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
