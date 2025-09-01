import EventContainer from '@/containers/EventContainer';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Ryvit - Event',
};

const Event = async ({
  params,
}: {
  params: Promise<{ contractId: string }>;
}) => {
  const { contractId } = await params;

  return <EventContainer currentContractId={contractId} />;
};

export default Event;
