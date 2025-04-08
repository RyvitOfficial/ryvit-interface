'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { RootState } from '@/store';

import Aside from '@/components/Aside';
import Header from '@/components/Header';

const titleMap: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/contracts': 'Contracts',
  '/dashboard/activities': 'Activities',
  '/dashboard/wallet': 'Wallet',
  '/dashboard/settings': 'Settings',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const title = titleMap[pathname];
  const isLogin = useSelector((state: RootState) => state.user.isLogin);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!isLogin) {
      router.push('/signin');
    }
  }, [isLogin, router]);

  if (!isMounted) return null;

  if (!isLogin) return null;

  return (
    <div className="bg-background w-full h-full flex justify-center items-center">
      <div className="flex justify-center items-start space-x-4 h-[95%] w-[97%] !m-auto">
        <Aside />

        <section className="flex flex-col w-full">
          <Header title={title} />
          <article>{children}</article>
        </section>
      </div>
    </div>
  );
}
