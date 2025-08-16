import EventContainer from '@/containers/EventContainer';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Ryvit - Event',
};

const Event = () => {
  return <EventContainer />;
};

export default Event;
