'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { getChangedDigits } from '@/utils/getChangerNumber';
import { getLatestLedger } from '@/utils/getLatestLedger';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const [lastLedger, setLastLedger] = useState<string>('0');
  const [previousLedger, setPreviousLedger] = useState<string>('324233');

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

  const changedDigits = getChangedDigits(previousLedger, lastLedger);

  return (
    <header className="w-full bg-white rounded-[13px] border-2 border-border flex items-center justify-between h-[80px] px-8">
      <span className="text-2xl text-[#343C6A] font-[600]">{title}</span>
      <section className="flex items-center space-x-4">
        <div className="Ledger flex justify-center items-center space-x-2 border border-border rounded-xl pl-4 overflow-hidden">
          <div className="flex items-center space-x-2">
            <div className="bg-green-500 h-[9px] w-[9px] rounded-full animate-pulse"></div>
            <span className="text-secondary/70 text-[14px] font-medium">
              Last Ledger
            </span>
          </div>

          <div className="bg-[#E9EFFF] flex justify-center py-2 h-full min-w-[80px]">
            <span className="text-[13px] text-primary">
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

        <div className="w-10 h-10 rounded-full bg-primary/26 flex justify-center items-center">
          <p className="text-primary text-base">D</p>
        </div>
      </section>
    </header>
  );
};

export default Header;
