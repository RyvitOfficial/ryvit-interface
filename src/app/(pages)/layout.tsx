'use client';

import AuthGuard from '@/app/AuthGuard';
import Aside from '@/components/Aside';
import Header from '@/components/Header';
import LoadingProgressBar from '@/components/Loading';
import NotFoundContainer from '@/containers/NotFound';
import { useContractValidation } from '@/hooks/useContractValidation';
import { useGetContracts } from '@/hooks/useGetContracts';
import useLedgerUpdater from '@/hooks/useLedgerUpdater';
import resolveTitle from '@/utils/resolveTitle';
import { usePathname } from 'next/navigation';

const titleMap: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/contracts': 'Contracts',
  '/event/*': 'Event Monitoring',
  '/ttl/*': 'TTL Manager',
  '/function/*': 'Call Function',
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

  const pathParts = pathname.split('/');
  const lastPath = pathParts[pathParts.length - 1];

  const { isNotFound, isLoading, isShowContractSelect } =
    useContractValidation(lastPath);

  if (isLoading) {
    return <LoadingProgressBar />;
  }

  if (isNotFound) {
    return <NotFoundContainer />;
  }

  const currentContractId = lastPath;
  return (
    <AuthGuard>
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
    </AuthGuard>
  );
}
