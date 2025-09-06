'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import EventContainerSkeleton from '@/containers/SkeletonContainers/EventSkeleton';

import { useAppSelector } from '@/hooks/useRedux';

export default function EventPage() {
  const router = useRouter();

  const contract = useAppSelector((state) => state.user.contracts);

  useEffect(() => {
    if (contract.length > 0) {
      router.replace(`event/${contract[0].address}`);
    } else {
      router.push('/contracts');
    }
  }, [router, contract]);

  return (
    <div className="flex items-center justify-center">
      <EventContainerSkeleton />
    </div>
  );
}
