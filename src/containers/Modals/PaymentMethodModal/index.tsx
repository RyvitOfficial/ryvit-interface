import { useEffect } from 'react';
import cn from 'classnames';

import Modal from '@/components/Modal';
import Button from '@/components/Button';

import { FileAdd } from '@/assets';

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
    if (isOpen) {
      setIsOpen(true);
    }
  }, [isOpen, setIsOpen]);

  const handleIconClick = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      iconClick={handleIconClick}
      icon={<FileAdd fill="#414651" />}
      title="Select Payment Method"
    >
      <div className="">
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setMethod('ryvit')}
            className={cn(
              'w-full border rounded-xl p-4 text-left transition-all',
              method === 'ryvit'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400',
            )}
          >
            <p className="font-medium">Use Ryvit Balance</p>
            <p className="text-sm text-gray-500">
              Pay using your account balance
            </p>
          </button>

          <button
            onClick={() => setMethod('wallet')}
            className={cn(
              'w-full border rounded-xl p-4 text-left transition-all',
              method === 'wallet'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400',
            )}
          >
            <p className="font-medium">Use External Wallet</p>
            <p className="text-sm text-gray-500">Pay with a connected wallet</p>
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            rounded="xl"
            color="outlineWhiteBlack"
            content="Cancel"
            onClick={onClose}
            className="!w-[40%]"
          />
          <Button
            disabled={!method}
            rounded="xl"
            color="blue"
            content="continue"
            className="!w-[60%]"
            onClick={handleConfirmOnClick}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ExtendModalContainer;
