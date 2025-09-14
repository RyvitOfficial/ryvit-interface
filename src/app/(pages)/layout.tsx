'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import Aside from '@/components/Aside';
import Header from '@/components/Header';
import LoadingProgressBar from '@/components/Loading';
import NotFoundContainer from '@/containers/NotFound';

import { useContractValidation } from '@/hooks/useContractValidation';
import { useGetContracts } from '@/hooks/useGetContracts';
import useLedgerUpdater from '@/hooks/useLedgerUpdater';
import resolveTitle from '@/utils/resolveTitle';

const titleMap: Record<string, string> = {
  '/home': 'Dashboard',
  '/contracts': 'Contracts',
  '/event/*': 'Event Monitoring',
  '/ttl/*': 'TTL Manager',
  '/function/*': 'Call Function',
  '/wallet': 'Wallet',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isLogin = useSelector((state: RootState) => state.user.isLogin);

  useEffect(() => {
    setIsMounted(true);
    if (!isLogin) {
      router.replace('/auth/signin');
    }
  }, [isLogin, router]);

  useLedgerUpdater();
  useGetContracts();
  const title = resolveTitle(pathname, titleMap);

  const pathParts = pathname.split('/');
  const lastPath = pathParts[pathParts.length - 1];

  const { isNotFound, isLoading, isShowContractSelect } =
    useContractValidation(lastPath);

  if (!isMounted) return null;

  if (!isLogin) return null;

  if (isLoading) {
    return <LoadingProgressBar />;
  }

  if (isNotFound) {
    return <NotFoundContainer />;
  }

  const currentContractId = lastPath;
  return (
    <div className="bg-background w-full h-screen flex justify-center items-center">
      <div className="flex justify-center items-start h-full w-full !m-auto">
        <div className="h-full w-1/5">
          <Aside />
        </div>

        <section className="w-full h-full flex flex-col overflow-auto">
          <div className="w-full shrink-0">
            <Header
              title={title}
              currentContractId={currentContractId}
              isShowContractSelect={isShowContractSelect}
            />
          </div>
          <article className="w-full flex-1">{children}</article>
        </section>
      </div>
    </div>
  );
}
