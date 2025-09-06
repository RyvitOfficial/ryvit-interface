import { Metadata } from 'next/types';

import ManageTTLContainer from '@/containers/ManageTTLContainer';

export const metadata: Metadata = {
  title: 'Ryvit - Manage TTL',
};

const TTL = async ({ params }: { params: Promise<{ contractId: string }> }) => {
  const { contractId } = await params;

  return <ManageTTLContainer currentContractId={contractId} />;
};

export default TTL;
