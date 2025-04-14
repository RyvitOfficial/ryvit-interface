import { IResetPassword } from '@/types';
import request from '@/utils/request';

export const resetPassword = async (formData: IResetPassword) => {
  try {
    const { response } = await request(
      `${process.env.NEXT_PUBLIC_RYVIT_API}/users/reset`,
      {
        method: 'PUT',
        body: formData,
      },
    );

    return response;
  } catch (error: any) {
    throw error.data;
  }
};
