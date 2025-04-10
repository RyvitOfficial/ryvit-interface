import { Metadata } from 'next/types';

import NotFoundContainer from '@/containers/NotFound';

export const metadata: Metadata = {
  title: 'Ryvit - 404 Not Found',
};

const NotFound = () => {
  return <NotFoundContainer />;
};

export default NotFound;
