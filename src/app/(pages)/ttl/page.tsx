'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import ManageTTLSkeleton from '@/containers/SkeletonContainers/TTLSkeleton';

import { useAppSelector } from '@/hooks/useRedux';

export default function TTLPage() {
  const router = useRouter();

  const contract = useAppSelector((state) => state.user.contracts);

  useEffect(() => {
    if (contract.length > 0) {
      router.replace(`ttl/${contract[0].address}`);
    } else {
      router.push('/contracts');
    }
  }, [router, contract]);

  return (
    <div className="flex items-center justify-center">
      <ManageTTLSkeleton />
    </div>
  );
}
