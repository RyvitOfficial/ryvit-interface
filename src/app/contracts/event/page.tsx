'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { contractsOptions } from '@/constants/options';
import EventContainerSkeleton from '@/containers/SkeletonContainers/EventSkeleton';

export default function EventPage() {
  const router = useRouter();

  useEffect(() => {
    if (contractsOptions.length > 0) {
      router.replace(`event/${contractsOptions[0].value}`);
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center">
      <EventContainerSkeleton />
    </div>
  );
}
