import { Metadata } from 'next/types';

import FunctionContainer from '@/containers/FunctionContainer';

export const metadata: Metadata = {
  title: 'Ryvit - Function',
};

const Function = async ({
  params,
}: {
  params: Promise<{ contractId: string }>;
}) => {
  const { contractId } = await params;

  return <FunctionContainer currentContractId={contractId} />;
};

export default Function;
