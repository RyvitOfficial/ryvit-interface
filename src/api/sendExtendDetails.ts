import request from '@/utils/request';

import { ITransactionDetails } from '@/types';

export const SendTransactionDetails = async (
  transactions: ITransactionDetails[],
  token: string,
  id: string,
) => {
  try {
    const { data } = await request(
      `${process.env.NEXT_PUBLIC_RYVIT_API}/contracts/extend/${id}`,
      {
        method: 'PUT',
        body: { transactions: transactions },
        headers: { authorization: ` Bearer ${token} ` },
      },
    );

    return data;
  } catch (error: any) {
    throw error.data;
  }
};
