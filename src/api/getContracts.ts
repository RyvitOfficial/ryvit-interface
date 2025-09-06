import request from '@/utils/request';

import { IGetContractResponse } from '@/types';

export const GetContract = async (token: string, network: string) => {
  try {
    const { data } = await request<IGetContractResponse[]>(
      `${process.env.NEXT_PUBLIC_RYVIT_API}/contracts?network=${network}`,
      {
        method: 'GET',
        headers: { authorization: `Bearer ${token}` },
      },
    );

    return data;
  } catch (error: any) {
    throw error.data;
  }
};
