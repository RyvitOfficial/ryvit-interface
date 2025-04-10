import { CButtonVariantType, CButtonColorType } from './index';

const buttonCustomStyles = (
  variant: CButtonVariantType,
  color?: CButtonColorType,
  disabled?: boolean,
) => {
  let colorStyles = '';
  if (color === 'blue') {
    colorStyles = 'bg-[#1B59F8] h-10 text-white hover:bg-[#343C6A] ';
  } else if (color === 'white') {
    colorStyles = 'bg-white !text-primary !rounded hover:bg-white/90';
  } else if (color === 'outline') {
    colorStyles =
      'border-2 border-white !rounded-sm text-white hover:bg-white hover:text-blue-600 font-medium';
  } else if (color === 'outlineWhiteBlack') {
    colorStyles =
      'border border-[#D5D7DA] text-[#414651] hover:bg-[#e5e5e5]/50';
  } else if (color === 'darkBlue') {
    colorStyles = 'text-white !bg-secondary !rounded hover:!bg-secondary/80';
  } else if (color === 'discard') {
    colorStyles =
      'text-red-600 !bg-red-100 !rounded-[8px] hover:!bg-red-200/80';
  } else if (color === 'red') {
    colorStyles = 'bg-red-500 text-white';
  }

  const VariantStyles = disabled
    ? '!bg-gray-300 !text-white hover:!bg-gray-300 !cursor-not-allowed	'
    : variant === 'simple'
    ? 'rounded-[8px] transition text-center text-base px-6 h-12 flex flex-row justify-center items-center whitespace-nowrap select-none cursor-pointer'
    : 'rounded-[12px] h-12 text-white transition text-base text-center flex justify-center items-center select-none cursor-pointer';

  return `${colorStyles} ${VariantStyles}`;
};

export default buttonCustomStyles;
