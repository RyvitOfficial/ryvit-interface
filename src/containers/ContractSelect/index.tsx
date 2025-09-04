'use client';

import { useRouter, usePathname } from 'next/navigation';

import { AnimatedSelect } from '@/components/Select';
import AccountIdenticon from '@/components/AccountIdenticon';

import { useAppSelector } from '@/hooks/useRedux';

interface ContractSelectProps {
  currentId: string;
}

const ContractSelect = ({ currentId }: ContractSelectProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const contractsOptions = useAppSelector((state) => state.user.contracts).map(
    (item) => ({
      label: item.name,
      value: item.address,
    }),
  );

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
