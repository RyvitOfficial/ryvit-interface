'use client';

import { Pages } from '@/constants/Pages';
import { useAppSelector } from '@/hooks/useRedux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isLogin = useAppSelector((state: RootState) => state.user.isLogin);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!isLogin) {
      router.push(Pages.SIGNIN);
    }
  }, [isLogin, router]);

  if (!isMounted) return null;

  if (!isLogin) return null;
  return <>{children}</>;
}
