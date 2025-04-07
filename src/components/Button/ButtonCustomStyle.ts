import { CButtonVariantType, CButtonColorType } from './index';

const buttonCustomStyles = (
  variant: CButtonVariantType,
  color?: CButtonColorType,
) => {
  let colorStyles = '';
  if (color === 'blue') {
    colorStyles = 'bg-[#1B59F8] h-10 text-white hover:bg-[#343C6A] ';
  } else if (color === 'white') {
    colorStyles = 'bg-white border border-[#E9EAEB] !text-[#343C6A]';
  } else if (color === 'outline') {
    colorStyles =
      'border-2 border-white !rounded-sm text-white hover:bg-white hover:text-blue-600 font-medium';
  } else if (color === 'outlineWhiteBlack') {
    colorStyles =
      'border border-[#D5D7DA] text-[#414651] hover:bg-[#e5e5e5]/50';
  }

  const VariantStyles =
    variant === 'simple'
      ? 'rounded-[12px] transition text-center text-base px-6 h-12 flex flex-row justify-center items-center whitespace-nowrap select-none cursor-pointer'
      : 'bg-[#1B59F8] rounded-[12px] w-[329px] h-12 text-white transition text-base text-center flex justify-center items-center select-none cursor-pointer';

  return `${colorStyles} ${VariantStyles}`;
};

export default buttonCustomStyles;
