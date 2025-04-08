import { use } from 'react';
import { Metadata } from 'next/types';

import ManageContract from '@/containers/ManageContract';

export const metadata: Metadata = {
  title: 'Ryvit - Manage Contract',
};

const Contracts = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return <ManageContract id={id} />;
};

export default Contracts;
