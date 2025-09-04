'use client';

import { usePathname } from 'next/navigation';

import Aside from '@/components/Aside';
import Header from '@/components/Header';
import resolveTitle from '@/utils/resolveTitle';
import AuthGuard from '../AuthGuard';
import useLedgerUpdater from '@/hooks/useLedgerUpdater';
import { useGetContracts } from '@/hooks/useGetContracts';

const titleMap: Record<string, string> = {
  '/dashboard': 'Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const title = resolveTitle(pathname, titleMap);

  useLedgerUpdater();
  useGetContracts();

  return (
    <AuthGuard>
      <div className="bg-background w-full h-screen flex justify-center items-center">
        <div className="flex justify-center items-start h-full w-full !m-auto">
          <div className="h-full w-1/5">
            <Aside />
          </div>

          <section className="w-full h-full flex flex-col overflow-auto">
            <div className="w-full shrink-0">
              <Header title={title} />
            </div>
            <article className="w-full flex-1 ">{children}</article>
          </section>
        </div>
      </div>
    </AuthGuard>
  );
}
