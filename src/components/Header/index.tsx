'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import UserMenu from '@/containers/UserMenu';

import { getChangedDigits } from '@/utils/getChangerNumber';
import { getLatestLedger } from '@/utils/getLatestLedger';

import { useAppSelector } from '@/hooks/useRedux';
import { AnimatedSelect } from '../Select';

const networkOptions = [
  { label: 'Testnet', value: '1' },
  { label: 'Mainnet', value: '3' },
];

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const [lastLedger, setLastLedger] = useState<string>('0');
  const [previousLedger, setPreviousLedger] = useState<string>('324233');
  const [selectedNetwork, setselectedNetwork] = useState('');

  const user = useAppSelector((state) => state.user.details);

  useEffect(() => {
    const data = () => {
      getLatestLedger().then((ledger) => {
        setPreviousLedger(lastLedger);
        setLastLedger(ledger.toString());
      });
    };

    data();

    const intervalId = setInterval(data, 2000);

    return () => clearInterval(intervalId);
  }, [lastLedger]);

  const selectOnChange = (value: string) => {
    setselectedNetwork(value);
  };

  const changedDigits = getChangedDigits(previousLedger, lastLedger);

  return (
    <header className="w-full bg-transparent flex items-center justify-between h-24 px-8">
      <span className="text-2xl text-white font-[600]">{title}</span>
      <section className="flex items-center space-x-4">
        <div className="Ledger flex justify-center h-11 items-center space-x-2 bg-bgblack1 border-2 border-border3 rounded-lg pl-4 overflow-hidden desktopMax:!h-9 desktopMax:text-sm">
          <div className="flex items-center space-x-2">
            <div className="bg-green-500 h-[9px] w-[9px] rounded-full animate-pulse"></div>
            <span className="text-white/80 text-sm font-medium font-jetbrains">
              Last Ledger
            </span>
          </div>

          <div className="flex justify-center items-center h-full min-w-[80px]">
            <span className="text-base text-primary font-jetbrains font-bold">
              {lastLedger.split('').map((digit, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: changedDigits.includes(index) ? 0.7 : 1 }}
                  transition={{
                    duration: 1,
                    type: 'tween',
                    ease: 'linear',
                  }}
                  className={
                    changedDigits.includes(index)
                      ? 'text-blue-400'
                      : 'text-primary'
                  }
                >
                  {digit}
                </motion.span>
              ))}
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
            className="desktopMax:!h-9 desktopMax:text-sm !bg-bgblack1 !border-[#334155] text-white/80"
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
