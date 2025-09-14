import Button from '@/components/Button';
import CInput from '@/components/Input';
import Modal from '@/components/Modal';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const AddEventModal = ({ isOpen, onClose, className }: AddEventModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={className}
      title="Add New Event"
    >
      <div className="w-full">
        <CInput
          placeholder="eg. transfer, mint, burn"
          inputClassName="!bg-input text-white font-jetbrains"
          label="Event Name"
        />
        <p className="text-sm text-gray-400 mt-2 px-1">
          Enter the exact event name as emitted by your smart contract logs.
          <span className="italic"> Case-sensitive</span>. Example:{' '}
          <code className="text-green-400">transfer</code>,{' '}
          <code className="text-green-400">mint</code>,{' '}
          <code className="text-green-400">burn</code>.
        </p>
        <div className="w-full flex justify-end gap-3 mt-8 h-10">
          <Button
            color="dark"
            rounded="sm"
            content="Cancel"
            className="w-1/5 text-sm h-full"
            onClick={onClose}
          />
          <Button
            color="green"
            rounded="sm"
            content="Add Event"
            className="w-2/6 h-full text-[15px] font-normal"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddEventModal;
