'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import LoadingProgressBar from '@/components/Loading';

import { useAppSelector } from '@/hooks/useRedux';

import { Pages } from '@/constants/Pages';

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
      router.push(Pages.DASHBOARD);
    }
  }, [isLogin, router, isMounted]);

  if (!isMounted || showLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoadingProgressBar />
      </div>
    );
  }

  if (isLogin) return null;

  return (
    <div className="w-full h-dvh flex justify-between items-center overflow-hidden bg-bgblack [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:40px_40px]">
      <div className="flex items-center justify-center w-full h-full !z-[9999] flex-col">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
