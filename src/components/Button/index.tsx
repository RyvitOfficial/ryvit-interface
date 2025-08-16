import React, { ReactNode } from 'react';
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
  | 'yellow'
  | 'green'
  | 'gray';

interface ButtonProps {
  color: CButtonColorType;
  content?: string | React.ReactNode;
  rounded: ButtonRoundedType;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  fill?: string;
  logo?: string | StaticImageData | React.ReactNode;
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
  const renderLogo = () => {
    if (!logo) return null;
    if (typeof logo === 'string' || (logo as StaticImageData)?.src) {
      return (
        <Image
          src={logo as string | StaticImageData}
          width={25}
          height={25}
          alt="logo"
          className="mr-2"
          draggable={false}
        />
      );
    }
    return <div className="mr-2 flex items-center">{logo as ReactNode}</div>;
  };

  return (
    <button
      type={type}
      className={`${buttonCustomStyles(rounded, color, disabled)} ${className}`}
      disabled={disabled}
      {...props}
      onClick={onClick}
    >
      {renderLogo()}

      {content ? content : children}
    </button>
  );
};

export default Button;
