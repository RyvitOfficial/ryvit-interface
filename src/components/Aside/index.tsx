'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBlux } from '@bluxcc/react';

import Button from '../Button';

import shortenAddress from '@/utils/shortenAddress';

import { navItems } from '@/constants/options';
import { Wallet } from '@/assets';

const Aside = () => {
  const pathname = usePathname();

  const { isAuthenticated, profile, user, login, isReady } = useBlux();

  const activeHref = [...navItems]
    .sort((a, b) => b.href.length - a.href.length)
    .find(
      ({ href }) => pathname === href || pathname.startsWith(href + '/'),
    )?.href;

  const userAddress = user.wallet
    ? user.wallet.address
      ? user.wallet.address
      : ''
    : '';

  const handleConnect = async () => {
    login();

    if (userAddress) {
      return;
    }
  };

  const handleOpenProfile = () => {
    profile();
  };

  return (
    <div className="bg-bgblack1 border-2 border-borderblack w-full h-full flex flex-col justify-between">
      <div>
        <div className="w-full flex items-center justify-center mb-6 mt-4">
          <Image
            src="/images/logoType.png"
            alt="logoType"
            width={130}
            height={130}
          />
        </div>
        <nav className="flex flex-col space-y-2 px-5 mt-3 tablet:px-1">
          {navItems.map(({ name, href, icon }) => {
            const isActive = href === activeHref;
            return (
              <Link
                key={name}
                href={href}
                className={`flex items-center space-x-3 px-4 py-[14px] rounded-xl transition-colors ${
                  isActive
                    ? 'bg-primary/15 text-primary font-[600]'
                    : 'text-txtgray hover:bg-primary/15'
                }`}
              >
                <span>{icon}</span>
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-5 w-full">
        {!isAuthenticated ? (
          <Button
            rounded="xl"
            color="blue"
            onClick={handleConnect}
            disabled={!isReady}
            className="w-full justify-between items-center"
          >
            <p>Connect</p>
            <Wallet />
          </Button>
        ) : (
          <Button
            rounded="xl"
            color="outlineWhiteBlack"
            className="w-full justify-between items-center"
            onClick={handleOpenProfile}
          >
            <p>{shortenAddress(userAddress, 5)}</p>
            <Wallet />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Aside;
