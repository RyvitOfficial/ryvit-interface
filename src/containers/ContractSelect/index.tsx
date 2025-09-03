'use client';

import { useRouter, usePathname } from 'next/navigation';

import { AnimatedSelect } from '@/components/Select';
import AccountIdenticon from '@/components/AccountIdenticon';

import { contractsOptions } from '@/constants/options';

interface ContractSelectProps {
  currentId: string;
}

const ContractSelect = ({ currentId }: ContractSelectProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newId: string) => {
    const newPath = pathname.split('/').slice(0, -1).concat(newId).join('/');
    router.push(newPath);
  };

  const enhancedOptions = contractsOptions.map((opt) => ({
    ...opt,
    icon: <AccountIdenticon address={opt.value} size={15} />,
  }));

  return (
    <AnimatedSelect
      options={enhancedOptions}
      onChange={handleChange}
      value={currentId}
      network={false}
      className="desktopMax:text-[13px] border-none font-jetbrains !h-14 !text-sm"
      placeholder="Choose Contract"
      address
    />
  );
};

export default ContractSelect;
