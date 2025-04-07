'use client';

import Aside from '@/components/Aside';
import Header from '@/components/Header';
import { usePathname } from 'next/navigation';

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
  const title = titleMap[pathname];

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
