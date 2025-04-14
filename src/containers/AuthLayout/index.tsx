'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import LoadingProgressBar from '@/components/Loading';

import { useAppSelector } from '@/hooks/useRedux';

interface IAuthLayout {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: IAuthLayout) => {
  const router = useRouter();
  const isLogin = useAppSelector((state) => state.user.isLogin);

  const [isMounted, setIsMounted] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMounted && isLogin) {
      router.push('/dashboard');
    }
  }, [isLogin, router, isMounted]);

  if (!isMounted || showLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white">
        <LoadingProgressBar />
      </div>
    );
  }

  if (isLogin) return null;

  return (
    <div className="w-full h-dvh flex justify-between items-center overflow-hidden">
      <div className="small:hidden absolute top-1/2 left-1/2 w-[1000px] h-full bg-[radial-gradient(circle,_rgba(27,89,248,0.5)_0%,_rgba(27,89,248,0)_70%)] blur-[150px] transform -translate-x-1/2 -translate-y-1/2 animate-pulse "></div>

      <div className="flex items-center justify-center w-full h-full !z-[9999]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
