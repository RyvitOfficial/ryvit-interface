import { SvgProps } from '@/types';

const Icon = ({ fill }: SvgProps) => (
  <svg
    width="10"
    height="16"
    viewBox="0 0 10 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_343_4364)">
      <path
        d="M1.5 2C0.671875 2 0 2.67188 0 3.5V12.5C0 13.3281 0.671875 14 1.5 14H2.5C3.32812 14 4 13.3281 4 12.5V3.5C4 2.67188 3.32812 2 2.5 2H1.5ZM7.5 2C6.67188 2 6 2.67188 6 3.5V12.5C6 13.3281 6.67188 14 7.5 14H8.5C9.32812 14 10 13.3281 10 12.5V3.5C10 2.67188 9.32812 2 8.5 2H7.5Z"
        fill={fill}
      />
    </g>
    <defs>
      <clipPath id="clip0_343_4364">
        <rect width="10" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Icon;
