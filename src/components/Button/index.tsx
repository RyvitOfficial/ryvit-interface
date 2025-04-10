import React from 'react';
import Image, { StaticImageData } from 'next/image';

import buttonCustomStyles from './ButtonCustomStyle';

export type CButtonVariantType = 'simple' | 'form';
export type CButtonColorType =
  | 'blue'
  | 'darkBlue'
  | 'white'
  | 'outline'
  | 'outlineWhiteBlack'
  | 'discard'
  | 'red';

interface ButtonProps {
  color?: CButtonColorType;
  content: string | React.ReactNode;
  variant: CButtonVariantType;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  fill?: string;
  logo?: string | StaticImageData;
  onClick?: () => void;
}

const Button = ({
  variant,
  color,
  onClick,
  className,
  type,
  disabled,
  content,
  logo,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${buttonCustomStyles(variant, color, disabled)} ${className}`}
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
      {content}
    </button>
  );
};

export default Button;
