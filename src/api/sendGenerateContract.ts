import request from '@/utils/request';

import { IGeneratedToken } from '@/types';

const sendGenerateContract = async (token: string, tokenName: string) => {
  try {
    const { data } = await request<IGeneratedToken>(
      `${process.env.NEXT_PUBLIC_RYVIT_API}/contracts/generate`,
      {
        body: { tokenName },
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
      },
    );

    return data.result;
  } catch {
    return false;
  }
};

export default sendGenerateContract;
