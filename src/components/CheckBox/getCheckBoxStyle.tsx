import { CheckboxType } from '.';

export const getCheckBoxStyle = (
  type: CheckboxType,
  checked: boolean,
  disabled: boolean,
) => {
  switch (type) {
    case 'primary': {
      return `w-5 h-5 border-2 ${
        disabled ? 'pointer-events-none opacity-70' : 'cursor-pointer'
      }
      ${
        checked
          ? 'bg-[#1B59F8] border !border-[#1B59F8]'
          : 'bg-white border border-gray'
      }`;
    }

    case 'secondary': {
      return `w-[18px] h-[18px] border-1 ${
        disabled
          ? 'pointer-events-none !bg-bgblack1 border !border-[#333]'
          : 'cursor-pointer'
      }
      ${
        checked
          ? 'bg-bgblack1 border !border-[#1B59F8]'
          : ' bg-black1 border !border-border2'
      }`;
    }
  }
};
