import { ButtonRoundedType, CButtonColorType } from './index';

const buttonCustomStyles = (
  rounded: ButtonRoundedType,
  color: CButtonColorType,
  disabled?: boolean,
): string => {
  const colorClasses: Record<CButtonColorType, string> = {
    blue: 'bg-[#1B59F8] text-white hover:bg-[#343C6A]',
    white: 'bg-white !text-primary !rounded hover:bg-white/90',
    outline:
      'border-2 border-white !rounded-sm text-white hover:bg-white hover:text-blue-600 font-medium',
    outlineWhiteBlack:
      'border border-[#D5D7DA] text-[#414651] hover:bg-[#e5e5e5]/50',
    darkBlue: 'text-white bg-secondary !rounded hover:bg-secondary/80',
    discard: 'text-red-600 !bg-red-100 !rounded-[8px] hover:!bg-red-200/80',
    red: 'bg-red-500 text-white',
  };

  const baseStyle =
    ' h-12 transition px-6 text-base text-center flex justify-center items-center select-none cursor-pointer whitespace-nowrap';

  const disabledStyle =
    '!bg-gray-300 !text-white hover:!bg-gray-300 !cursor-not-allowed';

  const roundedStyle = `${
    rounded === 'sm' ? 'rounded-[8px]' : 'rounded-[12px]'
  }`;

  const buttonStyle = `${baseStyle} ${roundedStyle} ${
    disabled && disabledStyle
  }`;

  return `${colorClasses[color]} ${buttonStyle}`.trim();
};

export default buttonCustomStyles;
