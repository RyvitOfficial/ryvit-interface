'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import ContractListItem from '@/components/ContractListItem';

import { generateRandomHexColor } from '@/utils/generateRandomHexColor';

import { IGetContractResponse } from '@/types';

interface ContractListProps {
  data: IGetContractResponse[];
}

const ContractsList = ({ data }: ContractListProps) => {
  const [randomColor, setRandomColor] = useState(['']);

  useEffect(() => {
    setRandomColor(generateRandomHexColor(data.length));
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center justify-start w-full space-y-4 mt-5"
    >
      {data.map((contract, index) => (
        <ContractListItem
          key={contract.address}
          contractName={contract.name}
          contractAddress={contract.address}
          timeToLeave={contract.liveLedger.toString()}
          manageHref={`/dashboard/contracts/${contract._id}`}
          iconColor={randomColor[index]}
        />
      ))}
    </motion.div>
  );
};

export default ContractsList;
