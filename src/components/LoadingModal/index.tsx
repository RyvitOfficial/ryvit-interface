import Modal from '../Modal';

import { Loading } from '@/assets';

interface CLoadingModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  className?: string;
}

const LoadingModal = ({
  isOpen,
  onClose,
  title,
  description,
  className,
}: CLoadingModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={className}>
      <div className="flex flex-col justify-center items-center w-full space-y-5 py-4">
        <div className="transition">
          <Loading fill="#000" />
        </div>
        <div className="text-center space-y-3 w-full">
          <h3 className="text-darkBlue text-[18px] font-medium">{title}</h3>
          <p className="text-smokyBlue text-[14px] text-center px-4">
            {description}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default LoadingModal;
