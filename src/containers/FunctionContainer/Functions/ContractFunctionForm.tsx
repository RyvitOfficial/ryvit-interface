'use client';

import { useState } from 'react';

import Button from '@/components/Button';
import CInput from '@/components/Input';

import { coerceByType, errorFor } from '@/utils/helpers';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

import { ContractFunction, ContractMeta } from '@/types';

interface Props {
  contract: ContractMeta;
  fn: ContractFunction;
}

const FunctionForm = ({ contract, fn }: Props) => {
  const [formData, setFormData] = useState<Record<string, string | boolean>>(
    {},
  );
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleChange = (name: string, type: any, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: errorFor(type, value) }));
  };

  const handleExecute = () => {
    const nextErrors: Record<string, string | null> = {};
    fn.inputs.forEach((inp) => {
      if (inp.required)
        nextErrors[inp.name] = errorFor(inp.type, formData[inp.name]);
    });
    setErrors(nextErrors);

    if (Object.values(nextErrors).some((x) => x)) return;

    const args = fn.inputs.map((i) =>
      coerceByType(formData[i.name] ?? '', i.type),
    );

    console.log({ contractId: contract.id, fn: fn.name, args });
    alert(`Executing ${fn.name} with args: ${JSON.stringify(args, null, 2)}`);
  };

  return (
    <div className="mt-4">
      {fn.inputs.length === 0 ? (
        <div className="text-zinc-500 text-sm">
          This function has no inputs.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {fn.inputs.map((inp) => (
            <div key={inp.name} className="">
              <CInput
                className="w-full"
                inputClassName="!bg-bgblack2 border border-border2/40 focus:border-border2/40 text-white ring-none font-jetbrains !placeholder-white/60"
                placeholder={inp.placeholder}
                value={(formData[inp.name] as string) ?? ''}
                onChange={(e) =>
                  handleChange(inp.name, inp.type, e.target.value)
                }
                label={capitalizeFirstLetter(inp.label ?? inp.name)}
                border
              />
              {errors[inp.name] && (
                <p className="text-[10px] text-red-500 mt-1">
                  {errors[inp.name]}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
      <Button
        content="▶ Execute Function"
        color="blue"
        rounded="sm"
        onClick={handleExecute}
        className="w-full mt-5 h-[40px] font-normal"
      />
    </div>
  );
};

export default FunctionForm;
