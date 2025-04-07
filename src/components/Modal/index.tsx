'use client';

import React, { useRef, useEffect } from 'react';
import cn from 'classnames';

import useOutsideClickHandler from '@/hooks/useOutsideClickHandler';

import { Close } from '@/assets';

type ModalProps = {
  width?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode | React.JSX.Element;
  icon?: React.ReactNode;
};

const Modal = ({
  title,
  children,
  isOpen,
  width,
  icon,
  onClose,
  className,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  useOutsideClickHandler(isOpen, onClose, modalRef);

  useEffect(() => {
    if (backdropRef.current) {
      backdropRef.current.style.opacity = isOpen ? '1' : '0';
      backdropRef.current.style.pointerEvents = isOpen ? 'auto' : 'none';
    }
  }, [isOpen]);

  return (
    <div
      ref={backdropRef}
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ease-in-out',
        isOpen
          ? 'bg-black/45 backdrop-blur-[2px]'
          : 'bg-black/0 pointer-events-none',
      )}
    >
      <div
        ref={modalRef}
        className={cn(
          className,
          `fixed ${
            width ? `w-[${width}]` : 'w-[482px] mobile:w-[calc(100%-32px)]'
          } transform transition-all duration-500 ease-in-out ${
            isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          } top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !z-[9999] rounded-[10px] shadow-2xl bg-white h-auto`,
        )}
      >
        <div className="flex flex-col w-full h-full px-6 py-4 gap-4">
          {title && (
            <header className="flex justify-between items-center select-none py-4">
              <div className="flex items-center space-x-2">
                {icon && (
                  <div className="w-[40px] h-[40px] border border-border rounded-[13px] flex justify-center items-center">
                    {icon}
                  </div>
                )}
                <p className="text-xl font-medium">{title}</p>
              </div>
              <div onClick={onClose} className="cursor-pointer">
                <Close fill="#c9c9c9" />
              </div>
            </header>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
