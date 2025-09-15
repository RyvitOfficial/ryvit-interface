import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './useRedux';

import { IGetContractResponse, IUser } from '@/types';
import { GetTokenIsValid } from '@/api/getUser';
import { setUserInfo } from '@/reducers/user';

export type ContractDataType = {
  loading: boolean;
  data: null | IGetContractResponse[];
  error: null | any;
};

export const useGetUser = () => {
  const dispatch = useDispatch();

  const token = useAppSelector((state) => state.user.token);
  const isLogin = useAppSelector((state) => state.user.isLogin);

  useEffect(() => {
    const data = () => {
      if (token && isLogin) {
        GetTokenIsValid(token).then((user) => {
          dispatch(setUserInfo(user.result as IUser));
        });
      }
    };

    data();

    const intervalId = setInterval(data, 7000);

    return () => clearInterval(intervalId);
  }, [token, dispatch, isLogin]);
};
