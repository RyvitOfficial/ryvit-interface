import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './useRedux';

import { GetContract } from '@/api/getContracts';
import { setUserContracts } from '@/reducers/user';

import { IGetContractResponse } from '@/types';

export type ContractDataType = {
  loading: boolean;
  data: null | IGetContractResponse[];
  error: null | any;
};

export const useGetContracts = () => {
  const dispatch = useDispatch();

  const token = useAppSelector((state) => state.user.token);
  const network = useAppSelector((state) => state.user.network);

  useEffect(() => {
    const data = () => {
      if (token) {
        GetContract(token, network).then((contract) => {
          dispatch(setUserContracts(contract.result as IGetContractResponse[]));
        });
      }
    };

    data();

    const intervalId = setInterval(data, 5000);

    return () => clearInterval(intervalId);
  }, [token, network, dispatch]);
};
