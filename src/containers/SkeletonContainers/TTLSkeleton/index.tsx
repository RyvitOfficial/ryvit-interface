'use client';

import Skeleton from '@/components/Skeleton';

const ManageTTLSkeleton = () => {
  return (
    <div
      className="flex flex-col w-full pt-5 px-5 space-y-4"
      style={{ height: 'calc(100vh - 110px)' }}
    >
      {/* TTL Stats Skeleton */}
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
      </div>

      {/* TTL Filter Skeleton */}
      <Skeleton className="h-40 w-full rounded-2xl" />

      <div className="grid grid-cols-[4fr_1.28fr] desktopMax:grid-cols-[4fr_1.1fr] w-full gap-2 min-h-0 h-full">
        {/* Table Skeleton */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-12 w-full rounded-lg" />
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-lg" />
          ))}
        </div>

        {/* Side Panel Skeleton */}
        <div className="flex flex-col gap-4 w-full min-h-full">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-[60px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default ManageTTLSkeleton;
