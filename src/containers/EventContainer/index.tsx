import EventConfig from './EventConfig';
import LiveStream from './LiveStream';
import SDKConfig from './SDKConfig';

interface EventContainerProps {
  currentContractId: string;
}

const EventContainer = ({ currentContractId }: EventContainerProps) => {
  return (
    <div className="p-5 desktopMax:p-3 w-full h-full grid grid-cols-12 gap-4 desktopMax:gap-2">
      <div className="col-span-12">
        <EventConfig currentContractId={currentContractId} />
      </div>

      <div className="col-span-6 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <LiveStream />
        </div>
      </div>

      <div className="col-span-6 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <SDKConfig />
        </div>
      </div>
    </div>
  );
};

export default EventContainer;
