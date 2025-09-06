import request from '@/utils/request';

import { IResponseCreateTransactions } from '@/types';

interface IInformCreateExtendApi {
  keys: string[];
  admin: string;
}

export const InformCreateExtendApi = async (
  formData: IInformCreateExtendApi,
  token: string,
  id: string,
) => {
  try {
    const { data } = await request<IResponseCreateTransactions>(
      `${process.env.NEXT_PUBLIC_RYVIT_TTL}/${id}/sing`,
      {
        method: 'POST',
        body: formData,
        headers: { authorization: `Bearer ${token}` },
      },
    );

    return data;
  } catch (error: any) {
    throw error.data;
  }
};
