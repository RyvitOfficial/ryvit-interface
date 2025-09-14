import Button from '@/components/Button';
import Modal from '@/components/Modal';

interface DeleteContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  DeleteOnClick?: () => void;
}

const DeleteContractModal = ({
  isOpen,
  onClose,
  DeleteOnClick,
}: DeleteContractModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="410px">
      <div className="py-2">
        <h2 className="text-white text-base">
          Are you sure you want to delete this contract?
        </h2>
        <div className="w-full flex justify-end gap-3 mt-8 pr-4">
          <Button
            color="dark"
            rounded="sm"
            content="Cancel"
            className="w-1/4 text-sm h-9 !text-white"
            onClick={onClose}
          />
          <Button
            color="red"
            rounded="sm"
            content="Yes, Delete"
            className="w-1/3 text-sm h-9 font-medium"
            onClick={DeleteOnClick}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteContractModal;
