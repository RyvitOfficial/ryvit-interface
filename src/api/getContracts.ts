import request from '@/utils/request';

import { IGetContractResponse } from '@/types';

export const GetContract = async (token: string, network: string) => {
  try {
    const { data } = await request<IGetContractResponse[]>(
      `https://api.ryvit.app/contracts?network=${network}`,
      {
        method: 'GET',
        headers: { authorization: `Bearer ${token}` },
      },
    );

    return data.result!;
  } catch (error: any) {
    throw error.data;
  }
};
