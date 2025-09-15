'use client';

import { useAppSelector } from '@/hooks/useRedux';

import EventConfig from './EventConfig';
import LiveStream from './LiveStream';
import SDKConfig from './SDKConfig';

interface EventContainerProps {
  currentContractId: string;
}

const EventContainer = ({ currentContractId }: EventContainerProps) => {
  const contracts = useAppSelector((state) => state.user.contracts);

  const selectedContract = contracts.filter(
    (e) => e.address === currentContractId,
  );

  return (
    <div
      className="p-5 desktopMax:p-3 w-full h-full grid grid-cols-12 gap-4 desktopMax:gap-2"
      style={{ height: 'calc(100vh - 110px)' }}
    >
      <div className="col-span-12">
        <EventConfig currentContract={selectedContract[0]} />
      </div>

      <div className="col-span-6 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <LiveStream currentContract={selectedContract[0]} />
        </div>
      </div>

      <div className="col-span-6 flex flex-col overflow-hidden h-full bg-bgblack1 rounded-2xl">
        <div className="flex-1 overflow-y-auto">
          <SDKConfig currentContract={selectedContract[0]} />
        </div>
      </div>
    </div>
  );
};

export default EventContainer;
