'use client';

import { useRouter, usePathname } from 'next/navigation';

import { AnimatedSelect } from '@/components/Select';
import { contractsOptions } from '@/constants/options';

interface ContractSelectProps {
  currentId: string;
}

const ContractSelect = ({ currentId }: ContractSelectProps) => {
  const router = useRouter();
  const pathname = usePathname();

  console.log(currentId);

  const handleChange = (newId: string) => {
    const pathSegments = pathname.split('/');

    pathSegments.pop();

    const newPath = [...pathSegments, newId].join('/');

    router.push(newPath);
  };

  return (
    <AnimatedSelect
      options={contractsOptions}
      onChange={handleChange}
      value={currentId}
      network={false}
      className="desktopMax:h-[35px] desktopMax:text-[13px] border-none"
    />
  );
};

export default ContractSelect;
