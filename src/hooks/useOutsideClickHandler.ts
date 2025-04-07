import { useEffect, RefObject } from 'react';

const useOutsideClickHandler = (
  isModalOpen: boolean,
  handleCloseModal: () => void,
  modalRef: RefObject<HTMLDivElement | null>,
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen, handleCloseModal, modalRef]);
};

export default useOutsideClickHandler;
