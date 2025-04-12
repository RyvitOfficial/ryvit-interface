import React from 'react';
import Image, { StaticImageData } from 'next/image';

import buttonCustomStyles from './ButtonCustomStyle';

export type ButtonRoundedType = 'sm' | 'xl';
export type CButtonColorType =
  | 'blue'
  | 'darkBlue'
  | 'white'
  | 'outline'
  | 'outlineWhiteBlack'
  | 'discard'
  | 'red'
  | 'yellow';

interface ButtonProps {
  color: CButtonColorType;
  content?: string | React.ReactNode;
  rounded: ButtonRoundedType;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  fill?: string;
  logo?: string | StaticImageData;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button = ({
  rounded,
  color,
  onClick,
  className,
  type,
  disabled,
  content,
  logo,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${buttonCustomStyles(rounded, color, disabled)} ${className}`}
      disabled={disabled}
      {...props}
      onClick={onClick}
    >
      {logo && (
        <Image
          src={logo}
          width={25}
          height={25}
          alt="logo"
          className="mr-2"
          draggable={false}
        />
      )}
      {content ? content : children}
    </button>
  );
};

export default Button;
