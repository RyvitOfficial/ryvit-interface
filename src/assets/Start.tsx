import { SvgProps } from '@/types';

const Icon = ({ fill }: SvgProps) => (
  <svg
    width="12"
    height="15"
    viewBox="0 0 12 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_343_4360)">
      <path
        d="M2.88672 1.81652C2.48203 1.56769 1.97344 1.55949 1.56055 1.79191C1.14766 2.02433 0.890625 2.46183 0.890625 2.93761V12.5626C0.890625 13.0384 1.14766 13.4759 1.56055 13.7083C1.97344 13.9407 2.48203 13.9298 2.88672 13.6837L10.7617 8.87121C11.1527 8.63332 11.3906 8.20949 11.3906 7.75011C11.3906 7.29074 11.1527 6.86964 10.7617 6.62902L2.88672 1.81652Z"
        fill={fill}
      />
    </g>
    <defs>
      <clipPath id="clip0_343_4360">
        <path d="M0.890625 0.75H11.3906V14.75H0.890625V0.75Z" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Icon;
