import { Metadata } from 'next/types';

import FunctionContainer from '@/containers/FunctionContainer';
import NoteCard from '@/components/NoteCard';

export const metadata: Metadata = {
  title: 'Ryvit - Function',
};

const Function = async ({}: // params,
{
  params: Promise<{ contractId: string }>;
}) => {
  // const { contractId } = await params;

  return (
    <div>
      <div className="mb-4">
        <NoteCard />
      </div>

      <FunctionContainer />
    </div>
  );
};

export default Function;
