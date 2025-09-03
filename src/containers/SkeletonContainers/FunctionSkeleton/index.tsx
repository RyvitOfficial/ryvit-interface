import Skeleton from '@/components/Skeleton';

const FunctionContainerSkeleton = () => {
  return (
    <div
      className="grid grid-cols-2 gap-4 w-full"
      style={{ height: 'calc(100vh - 110px)' }}
    >
      <div className="col-span-1">
        <Skeleton className="w-full h-full rounded-2xl" />

        <div className="mt-4">
          <Skeleton className="w-full h-full rounded-2xl" />
        </div>
      </div>

      <div className="col-span-1">
        <Skeleton className="w-full h-full rounded-2xl" />
      </div>
    </div>
  );
};

export default FunctionContainerSkeleton;
