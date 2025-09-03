'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { RootState } from '@/store';

import Aside from '@/components/Aside';
import Header from '@/components/Header';
import resolveTitle from '@/utils/resolveTitle';
import { Providers } from '../Providers';
import { StrKey } from '@stellar/stellar-sdk';

const titleMap: Record<string, string> = {
  '/contracts': 'Contracts',
  '/contracts/event/*': 'Event Monitoring',
  '/contracts/ttl/*': 'TTL Manager',
  '/contracts/function/*': 'Call Function',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const router = useRouter();
  const title = resolveTitle(pathname, titleMap);
  const isLogin = useSelector((state: RootState) => state.user.isLogin);

  const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  //   if (!isLogin) {
  //     router.push('/signin');
  //   }
  // }, [isLogin, router]);

  // if (!isMounted) return null;

  // if (!isLogin) return null;

  const pathParts = pathname.split('/');
  const isValid = StrKey.isValidEd25519PublicKey(
    pathParts[pathParts.length - 1].toLocaleUpperCase(),
  );
  const currentContractId = isValid ? pathParts[pathParts.length - 1] : '';

  return (
    <Providers>
      <div className="bg-background w-full h-screen flex justify-center items-center">
        <div className="flex justify-center items-start h-full w-full !m-auto">
          <div className="h-full w-1/5">
            <Aside />
          </div>

          <section className="w-full h-full flex flex-col overflow-auto">
            <div className="w-full shrink-0">
              <Header title={title} currentContractId={currentContractId} />
            </div>
            <article className="w-full flex-1 ">{children}</article>
          </section>
        </div>
      </div>
    </Providers>
  );
}
