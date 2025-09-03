'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { contractsOptions } from '@/constants/options';
import FunctionContainerSkeleton from '@/containers/SkeletonContainers/FunctionSkeleton';

export default function FunctionPage() {
  const router = useRouter();

  useEffect(() => {
    if (contractsOptions.length > 0) {
      router.replace(`function/${contractsOptions[0].value}`);
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center">
      <FunctionContainerSkeleton />
    </div>
  );
}
