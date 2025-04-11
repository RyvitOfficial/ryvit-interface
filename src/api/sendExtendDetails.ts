import request from '@/utils/request';

import { ITransactionDetails } from '@/types';

interface ISendTransactionDetails {
  transactions: ITransactionDetails[];
  successes: string[];
}

export const SendTransactionDetails = async (
  formData: ISendTransactionDetails,
  token: string,
  id: string,
) => {
  try {
    const { data } = await request(
      `${process.env.NEXT_PUBLIC_RYVIT_API}/contracts/extend/${id}`,
      {
        method: 'PUT',
        body: formData,
        headers: { authorization: `Bearer ${token}` },
      },
    );

    return data;
  } catch (error: any) {
    throw error.data;
  }
};
