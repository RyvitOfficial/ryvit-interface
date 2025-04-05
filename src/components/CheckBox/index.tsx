import React from 'react';

import { Check } from '@/assets';
import { getCheckBoxStyle } from './getCheckBoxStyle';

export type CheckboxType = 'primary' | 'secondary';

type CheckboxProps = {
  checked: boolean;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string | React.JSX.Element;
  value: string | number;
  disabled?: boolean;
  type?: CheckboxType;
  className?: string;
  input?: any;
  meta?: any;
};

const Checkbox = ({
  checked,
  input,
  meta,
  onChange,
  label,
  value,
  name,
  disabled = false,
  type = 'primary',
  className,
}: CheckboxProps) => {
  return (
    <label className={` ${className} flex items-center space-x-[7px]`}>
      <input
        type="checkbox"
        meta={meta}
        {...input}
        className="hidden"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <div
        className={`${getCheckBoxStyle(
          type,
          checked,
          disabled,
        )} flex items-center justify-center rounded-md transition duration-100 ease-in-out transform`}
      >
        {checked && (
          <Check
            fill={type === 'secondary' && !disabled ? '#1B59F8' : '#c9c9c9'}
          />
        )}
      </div>
      {label && (
        <div
          className={`text-sm font-medium select-none transition-colors duration-100 text-black`}
        >
          {label}
        </div>
      )}
    </label>
  );
};

export default Checkbox;
