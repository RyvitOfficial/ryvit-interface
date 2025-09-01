import Skeleton from '@/components/Skeleton';

const EventContainerSkeleton = () => {
  return (
    <div
      className="p-5 desktopMax:p-3 w-full grid grid-rows-[200px_1fr] gap-4 desktopMax:gap-2 overflow-hidden"
      style={{ height: 'calc(100vh - 110px)' }}
    >
      <Skeleton className="w-full h-full rounded-2xl" />

      <div className="grid grid-cols-12 gap-4 desktopMax:gap-2 h-full">
        <div className="col-span-6 h-full">
          <Skeleton className="w-full h-full rounded-2xl" />
        </div>
        <div className="col-span-6 h-full">
          <Skeleton className="w-full h-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default EventContainerSkeleton;
