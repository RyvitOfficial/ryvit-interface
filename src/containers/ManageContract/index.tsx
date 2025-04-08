'use client';

import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useRedux';

import { GetContractDetail } from '@/api/getContractDetail';

import { IGetContractResponse } from '@/types';

interface ManageContractProps {
  id: string;
}

const ManageContract = ({ id }: ManageContractProps) => {
  const [details, setDetails] = useState<IGetContractResponse>();
  const token = useAppSelector((state) => state.user.token);

  useEffect(() => {
    const data = () => {
      GetContractDetail(id, token!, 'testnet').then((details) =>
        setDetails(details),
      );
    };

    data();
  }, [id, token]);
  return <div>{details?.liveLedger}</div>;
};

export default ManageContract;
