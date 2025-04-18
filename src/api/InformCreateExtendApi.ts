import request from '@/utils/request';

import { IResponseCreateTransactions } from '@/types';

interface IInformCreateExtendApi {
  dataKeys: string[];
  admin: string;
}

export const InformCreateExtendApi = async (
  formData: IInformCreateExtendApi,
  token: string,
  id: string,
) => {
  try {
    const { data } = await request<IResponseCreateTransactions[]>(
      `${process.env.NEXT_PUBLIC_RYVIT_API}/contracts/extend/${id}/create`,
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
