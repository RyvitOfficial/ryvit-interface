import { useEffect, useState } from 'react';
import Image from 'next/image';

import Modal from '@/components/Modal';
import Button from '@/components/Button';
import CopyButton from '@/components/CopyButton';
import generateQrCode from '@/utils/generateQrCode';
import { useAppSelector } from '@/hooks/useRedux';

interface WalletDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const WalletDepositModal = ({ isOpen, onClose }: WalletDepositModalProps) => {
  const [qrCode, setQrCode] = useState<string | null>(null);

  const memo = useAppSelector((state) => state.user.details?.memo) as string;

  const depositAddress = process.env.NEXT_PUBLIC_RYVIT_WALLET as string;

  useEffect(() => {
    const generateQr = async () => {
      try {
        const qr = await generateQrCode(depositAddress, memo);
        setQrCode(qr);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQr();
  }, [memo, depositAddress]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="700px">
      <div className="flex flex-col items-center gap-6 py-6">
        {qrCode && <Image src={qrCode} alt="qr" width={250} height={200} />}

        <div className="text-center text-gray-300 text-sm px-4">
          Send only <span className="text-primary font-semibold">XLM</span> to
          this address.
          <br />
          Make sure to include the{' '}
          <span className="text-primary font-semibold">Memo</span> to complete
          your deposit.
        </div>

        <div className="w-full px-4">
          <label className="block text-xs text-gray-400 mb-1">Address</label>
          <div className="flex items-center justify-between bg-[#1E242C] px-4 py-3 rounded-xl">
            <span className="truncate text-gray-200 text-sm">
              {depositAddress}
            </span>
            <CopyButton text={depositAddress} />
          </div>
        </div>

        <div className="w-full px-4">
          <label className="block text-xs text-gray-400 mb-1">Memo</label>
          <div className="flex items-center justify-between bg-[#1E242C] px-4 py-3 rounded-xl">
            <span className="truncate text-gray-200 text-sm">{memo}</span>
            <CopyButton text={memo} />
          </div>
        </div>

        <div className="w-full px-4">
          <Button
            color="blue"
            rounded="sm"
            onClick={onClose}
            className="w-full"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default WalletDepositModal;
