'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import FunctionContainerSkeleton from '@/containers/SkeletonContainers/FunctionSkeleton';

import { useAppSelector } from '@/hooks/useRedux';

export default function FunctionPage() {
  const router = useRouter();

  const contract = useAppSelector((state) => state.user.contracts);

  useEffect(() => {
    if (contract.length > 0) {
      router.replace(`function/${contract[0].address}`);
    } else {
      router.push('/contracts');
    }
  }, [router, contract]);

  return (
    <div className="flex items-center justify-center">
      <FunctionContainerSkeleton />
    </div>
  );
}
