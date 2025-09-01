import { Metadata } from 'next/types';

import ManageTTLContainer from '@/containers/ManageTTLContainer';

export const metadata: Metadata = {
  title: 'Ryvit - Manage TTL',
};

const TTL = ({ params }: { params: { contractId: string } }) => {
  const { contractId } = params;

  return <ManageTTLContainer currentContractId={contractId} />;
};

export default TTL;
