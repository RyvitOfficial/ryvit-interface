import { use } from 'react';
import { Metadata } from 'next/types';

import ManageTTLContainer from '@/containers/ManageTTLContainer';

export const metadata: Metadata = {
  title: 'Ryvit - Manage TTL',
};

const TTL = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  console.log(id);

  return <ManageTTLContainer />;
};

export default TTL;
