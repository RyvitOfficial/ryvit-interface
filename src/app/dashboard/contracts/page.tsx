import ContractsContainer from '@/containers/ContractsContainer';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Ryvit - Contracts',
};

const Contracts = () => {
  return (
    <div>
      <ContractsContainer />
    </div>
  );
};

export default Contracts;
