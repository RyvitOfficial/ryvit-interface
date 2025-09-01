'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import ManageTTLSkeleton from '@/containers/SkeletonContainers/TTLSkeleton';

import { contractsOptions } from '@/constants/options';

export default function TTLPage() {
  const router = useRouter();

  useEffect(() => {
    if (contractsOptions.length > 0) {
      router.replace(`ttl/${contractsOptions[0].value}`);
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center">
      <ManageTTLSkeleton />
    </div>
  );
}
