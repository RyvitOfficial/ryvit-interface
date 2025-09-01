import EventContainer from '@/containers/EventContainer';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Ryvit - Event',
};

const Event = ({ params }: { params: { contractId: string } }) => {
  const { contractId } = params;

  return <EventContainer currentContractId={contractId} />;
};

export default Event;
