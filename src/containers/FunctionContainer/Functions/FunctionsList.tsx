'use client';

import { AnimatedSelect } from '@/components/Select';
import CLabel from '@/components/Label';

import { ContractFunction } from '@/types';

interface Props {
  functions: ContractFunction[];
  active: ContractFunction | null;
  onSelect: (fn: ContractFunction) => void;
}

const FunctionsList = ({ functions, active, onSelect }: Props) => {
  return (
    <div className="mt-1 w-full">
      <CLabel label="Choose a function" />
      <AnimatedSelect
        options={functions.map((f) => ({
          label: f.name,
          value: f.name,
        }))}
        value={active?.name}
        onChange={(value) => {
          const fn = functions.find((f) => f.name === value);
          if (fn) onSelect(fn);
        }}
        placeholder="Select a function"
        className="w-full !h-[45px] border-none font-jetbrains"
      />
    </div>
  );
};

export default FunctionsList;
