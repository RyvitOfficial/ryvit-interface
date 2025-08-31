'use client';

import React, { ReactNode, useState } from 'react';
import Image from 'next/image';

import Label from '../Label';

import useCustomID from '@/hooks/useCustomId';

import { Eye, EyeSlash } from '@/assets';

interface IInputProps {
  icon?: string | ReactNode;
  label?: string;
  error?: boolean;
  border?: boolean;
  errorMsg?: string;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  autoFocus?: boolean;
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
  type,
  value,
  border,
  onClick,
  disabled,
  onChange,
  errorMsg,
  autoFocus,
  maxLength,
  className,
  eyeIconPosition,
  hideCharacter,
  placeholder,
  enterKeyHint,
  iconClassName,
  inputClassName,
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
          <div className={`${iconClassName} absolute bottom-3 left-3.5`}>
            {typeof icon === 'string' ? (
              <Image src={icon} width={22} height={22} alt="inputIcon" />
            ) : (
              icon
            )}
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
          maxLength={maxLength}
          placeholder={placeholder}
          enterKeyHint={enterKeyHint}
          autoComplete="off"
          className={`
            self-stretch rounded-xl placeholder-[#a8a7a8] text-[#2c2c2c] text-[14px] w-full h-[45px] p-4 bg-transparent justify-start items-center inline-flex outline-none border transition-all duration-300
            ${inputClassName}
            ${icon ? 'px-12' : 'px-4'}
            ${
              border
                ? 'border-2 border-border focus:border-blue-500'
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
