'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import Label from '../Label';
import useCustomID from '@/hooks/useCustomId';
import { Eye, EyeSlash } from '@/assets';

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
  hideCharacter?: boolean;
  value?: string | number | any;
  eyeIconPosition?: 'left' | 'right';
  type?: React.HTMLInputTypeAttribute;
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
  type,
  value,
  border,
  onClick,
  disabled,
  onChange,
  errorMsg,
  autoFocus,
  className,
  copyButton,
  eyeIconPosition,
  hideCharacter,
  placeholder,
  handlePaste,
  enterKeyHint,
  iconClassName,
  inputClassName,
  handleCopyButton,
  ...props
}: IInputProps) => {
  const id = useCustomID('Cinput');

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    if (hideCharacter) setShowPassword(!showPassword);
  };

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

        {hideCharacter && (
          <div
            className={`absolute ${error ? '' : ''} top-[15px] ${
              eyeIconPosition === 'left' ? 'left-3' : 'right-3'
            } cursor-pointer select-none`}
            onClick={toggleShowPassword}
          >
            {showPassword ? <Eye /> : <EyeSlash />}
          </div>
        )}

        <input
          {...props}
          id={id}
          value={value}
          type={hideCharacter ? (showPassword ? 'text' : 'password') : type}
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

        <div className="mt-[2px] ml-1 transition">
          {error && errorMsg && (
            <span className="text-red-500 text-sm">{errorMsg}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CInput;
