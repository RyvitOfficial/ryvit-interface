'use client';

import Image from 'next/image';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Activity, File, Home, Setting, Wallet } from '@/assets';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: <Home /> },
  { name: 'Contracts', href: '/dashboard/contracts', icon: <File /> },
  { name: 'Activities', href: '/dashboard/activities', icon: <Activity /> },
  { name: 'Wallet', href: '/dashboard/wallet', icon: <Wallet /> },
  { name: 'Settings', href: '/dashboard/settings', icon: <Setting /> },
];

const Aside = () => {
  const pathname = usePathname();

  return (
    <div className="bg-white rounded-[13px] border-2 border-[#E9EAEB] w-1/5 h-full">
      <div className="w-full flex items-center justify-center py-8">
        <Image
          src="/images/logoType.png"
          alt="logoType"
          width={130}
          height={130}
        />
      </div>
      <nav className="flex flex-col space-y-2 px-5 mt-3">
        {navItems.map(({ name, href, icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center space-x-3 px-4 py-[14px] rounded-xl transition-colors ${
                isActive
                  ? 'bg-primary/15 text-primary font-[600]'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <span>{icon}</span>
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Aside;
