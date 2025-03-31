'use client';

import React from 'react';
import Image from 'next/image';

import Label from '../Label';
import useCustomID from '@/hooks/useCustomId';

interface IInputProps {
  icon?: string;
  label?: string;
  error?: boolean;
  paste?: boolean;
  border?: boolean;
  errorMsg?: string;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
  copyButton?: boolean;
  clearInput?: boolean;
  placeholder?: string;
  tooltipTitle?: string;
  iconClassName?: string;
  clipboardText?: string;
  tooltipDetails?: string;
  inputClassName?: string;
  value?: string | number | any;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearInputClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handlePaste?: (event: React.MouseEventHandler<HTMLDivElement>) => void;
  handleCopyButton?: (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => void;
  enterKeyHint?:
    | 'search'
    | 'done'
    | 'enter'
    | 'go'
    | 'next'
    | 'previous'
    | 'send';
}

const CInput = ({
  icon,
  label,
  error,
  paste,
  value,
  border,
  onClick,
  disabled,
  onChange,
  errorMsg,
  autoFocus,
  className,
  copyButton,
  placeholder,
  handlePaste,
  enterKeyHint,
  iconClassName,
  inputClassName,
  handleCopyButton,
  ...props
}: IInputProps) => {
  const id = useCustomID('input');

  return (
    <div className={className}>
      <Label label={label} htmlFor={id} />

      <div className="relative w-full">
        {icon && (
          <div className={`${iconClassName} absolute bottom-4 left-3.5`}>
            <Image src={icon} width={22} height={22} alt="inputIcon" />
          </div>
        )}

        {paste && (
          <div
            className="bg-white text-midnightBlue text-sm px-[14px] py-[6px] rounded-lg absolute bottom-3 right-3.5 cursor-pointer transition hover:bg-[#E6E6EC]"
            onClick={handlePaste}
          >
            <span>Paste</span>
          </div>
        )}

        {/* {copyButton && (
          <div
            className="text-midnightBlue text-sm px-2 py-[6px] rounded-lg absolute bottom-3 right-3.5 cursor-pointer transition hover:bg-[#E6E6EC]"
            onClick={handleCopyButton}
          >
            <Image src={copy} alt="copy" />
          </div>
        )} */}

        {/* {!error && clearInput && (
          <div className="absolute bottom-3.5 right-3.5">
            <Image
              src={clearInputLogo}
              width={0}
              height={0}
              alt="clear"
              className="cursor-pointer"
              onClick={clearInputClick}
            />
          </div>
        )} */}

        <input
          id={id}
          {...props}
          value={value}
          onClick={onClick}
          disabled={disabled}
          onChange={onChange}
          autoFocus={autoFocus}
          placeholder={placeholder}
          enterKeyHint={enterKeyHint}
          autoComplete="off"
          className={`
            self-stretch rounded-xl placeholder-[#a8a7a8] text-[#2c2c2c] text-[14px] w-full h-[45px] p-4 bg-transparent justify-start items-center inline-flex outline-none border transition-all duration-300
            ${inputClassName}
            ${icon ? 'px-12' : 'px-4'}
            ${
              border
                ? 'border-2 border-[#e5e5e5] focus:border-blue-500'
                : 'border-transparent'
            }
            ${error && 'border !border-error'}
            ${disabled && 'cursor-not-allowed !select-none text-mutedBlue'}
          `}
        />

        <div className="h-[20px] absolute mt-[6px] ml-1">
          {error && errorMsg && (
            <span className="text-error text-sm">{errorMsg}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CInput;
