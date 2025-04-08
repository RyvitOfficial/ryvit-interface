import { useEffect, useState } from 'react';

import { GetContract } from '@/api/getContracts';

import { IGetContractResponse } from '@/types';

export type ContractDataType = {
  loading: boolean;
  data: null | IGetContractResponse[];
  error: null | any;
};

export const useGetContracts = (token: string, network: string) => {
  const [contractData, setContractData] = useState<ContractDataType>({
    loading: true,
    data: null,
    error: false,
  });

  useEffect(() => {
    const data = () => {
      GetContract(token, network)
        .then((contract) => {
          setContractData({
            loading: false,
            data: contract,
            error: null,
          });
        })
        .catch(() =>
          setContractData({
            loading: false,
            data: null,
            error: true,
          }),
        );
    };

    data();

    const intervalId = setInterval(data, 5000);

    return () => clearInterval(intervalId);
  }, [token, network]);

  return contractData;
};
