'use client';

import { useEffect, useState } from 'react';

import Card from '@/components/Card';
import FunctionForm from './ContractFunctionForm';
import FunctionsList from './FunctionsList';

import { ContractFunction } from '@/types';
import { MOCK_CONTRACTS } from '@/constants/options';

const ContractFunctionContainer = () => {
  const contract = MOCK_CONTRACTS.find(
    (c) =>
      c.label === 'GAXPZRKDJY4X4VHN3GC2YPRBAM7CRGB3H64R3TMVFUUYIVUF2UTBOY4B',
  );

  const [activeFn, setActiveFn] = useState<ContractFunction | null>(null);

  useEffect(() => {
    if (contract && contract.functions.length > 0) {
      setActiveFn(contract.functions[0]);
    }
  }, [contract]);

  if (!contract) {
    return (
      <Card
        bgColor="#121319"
        borderColor="transparent"
        className="w-full text-white py-5 px-6 flex flex-col gap-4"
      >
        <p>Contract not found</p>
      </Card>
    );
  }

  if (!activeFn) return null;
  return (
    <Card
      bgColor="#121319"
      borderColor="transparent"
      className="w-full text-white py-5 px-6 flex flex-col gap-4"
    >
      <h2 className="text-lg font-medium font-jetbrains desktopMax:text-base text-white mb-2 shrink-0">
        Functions
      </h2>

      <div>
        <FunctionsList
          functions={contract.functions}
          active={activeFn}
          onSelect={setActiveFn}
        />

        {activeFn && <FunctionForm contract={contract} fn={activeFn} />}
      </div>
    </Card>
  );
};

export default ContractFunctionContainer;
