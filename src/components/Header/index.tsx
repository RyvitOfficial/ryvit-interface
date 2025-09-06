'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AnimatedSelect } from '../Select';
import UserMenu from '@/containers/UserMenu';
import ContractSelect from '@/containers/ContractSelect';

import { useAppSelector } from '@/hooks/useRedux';
import { setUserNetwork } from '@/reducers/user';

import { NetworkType } from '@/types';

const networkOptions = [
  { label: 'Testnet', value: '1' },
  { label: 'Mainnet', value: '3' },
];

interface HeaderProps {
  title: string;
  currentContractId?: string;
  isShowContractSelect?: boolean;
}

const Header = ({
  title,
  currentContractId,
  isShowContractSelect,
}: HeaderProps) => {
  const [selectedNetwork, setselectedNetwork] = useState('');

  const dispatch = useDispatch();

  const user = useAppSelector((state) => state.user.details);
  const lastLedger = useAppSelector((state) => state.lastLedger.ledger);

  const selectOnChange = (value: string) => {
    setselectedNetwork(value);
    dispatch(setUserNetwork(value as NetworkType));
  };

  return (
    <header className="w-full bg-transparent flex items-center justify-between h-24 px-8">
      <div className="flex items-center gap-2 text-2xl text-white font-[600]">
        <span>{title}</span>
        {isShowContractSelect && (
          <>
            <span className="text-gray-500">/</span>
            <div className="w-[270px]">
              <ContractSelect currentId={currentContractId!} />
            </div>
          </>
        )}
      </div>
      <section className="flex items-center space-x-4">
        <div className="Ledger flex justify-center h-14 shadow-md items-center space-x-2 bg-bgblack2 rounded-lg pl-4 overflow-hidden desktopMax:text-sm">
          <div className="flex items-center space-x-2">
            <div className="bg-green-500 h-[9px] w-[9px] rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium font-jetbrains">
              Last Ledger
            </span>
          </div>
          <div className="flex justify-center items-center h-full min-w-[80px]">
            <span className="text-base text-primary font-jetbrains font-bold">
              {lastLedger}
            </span>
          </div>
        </div>

        <div className="w-[150px]">
          <AnimatedSelect
            options={networkOptions}
            value={selectedNetwork}
            defaultValue={networkOptions[0].value}
            onChange={selectOnChange}
            network
            className="!text-[15px] !bg-bgblack2 border-none !text-white font-jetbrains !rounded-lg !h-14 !shadow-md"
          />
        </div>
        <UserMenu>
          <div className="w-10 h-10 rounded-full bg-primary/20 flex justify-center items-center">
            <p className="text-primary text-base">
              {user?.name[0].toUpperCase()}
            </p>
          </div>
        </UserMenu>
      </section>
    </header>
  );
};

export default Header;
