import request from '@/utils/request';

import { IForgetPassword, ApiResponse } from '@/types';

export const forgetPassword = async (
  formData: IForgetPassword,
): Promise<ApiResponse> => {
  try {
    const { data } = await request(
      `${process.env.NEXT_PUBLIC_RYVIT_API}/users/reset`,
      {
        method: 'POST',
        body: formData,
      },
    );

    return data;
  } catch (error: any) {
    throw error.data;
  }
};
