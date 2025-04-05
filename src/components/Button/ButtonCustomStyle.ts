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
  }

  const VariantStyles =
    variant === 'simple'
      ? 'rounded-[30px] text-center text-base px-6 h-11 flex flex-row justify-center items-center whitespace-nowrap select-none'
      : 'bg-[#1B59F8] rounded-[12px] w-[329px] h-12 text-white transition text-base text-center flex justify-center items-center select-none';

  return `${colorStyles} ${VariantStyles}`;
};

export default buttonCustomStyles;
