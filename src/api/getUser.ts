import { IUser } from '@/types';
import request from '@/utils/request';

export const GetTokenIsValid = async (token: string) => {
  try {
    const { data } = await request<IUser>(
      `${process.env.NEXT_PUBLIC_RYVIT_API}/users`,
      {
        method: 'GET',
        headers: { authorization: `Bearer ${token}` },
      },
    );

    return data.result;
  } catch {
    return false;
  }
};
