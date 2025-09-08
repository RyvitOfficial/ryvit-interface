'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import UserMenu from '@/containers/UserMenu';
import ContractSelect from '@/containers/ContractSelect';
import { NetworkButton } from '@/components/NetworkSelect';
import LastLedgerCard from '@/components/LastLedgerCard';

import { useAppSelector } from '@/hooks/useRedux';
import { setUserNetwork } from '@/reducers/user';

import { NetworkType } from '@/types';

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
  const [selectedNetwork, setselectedNetwork] =
    useState<NetworkType>('testnet');

  const dispatch = useDispatch();

  const user = useAppSelector((state) => state.user.details);

  const selectOnChange = (value: NetworkType) => {
    setselectedNetwork(value);
    dispatch(setUserNetwork(value));
  };

  return (
    <header className="w-full bg-transparent flex items-center justify-between h-24 px-8">
      <div className="flex items-center gap-2 text-2xl text-white font-[600]">
        <span>{title}</span>
        {isShowContractSelect && (
          <>
            <span className="text-gray-500">/</span>
            {currentContractId && (
              <div className="w-[270px]">
                <ContractSelect currentId={currentContractId} />
              </div>
            )}
          </>
        )}
      </div>

      <section className="flex items-center space-x-4">
        <LastLedgerCard />

        <div className="w-[150px]">
          <NetworkButton onChange={selectOnChange} value={selectedNetwork} />
        </div>
        <UserMenu>
          <div className="w-14 h-14 rounded-xl bg-gradient-to-bl from-bgblack2 to-primary/20 flex justify-center items-center hover:bg-bgblack transition-all duration-200">
            <p className="text-primary text-xl font-medium">
              {user?.name[0].toUpperCase()}
            </p>
          </div>
        </UserMenu>
      </section>
    </header>
  );
};

export default Header;
