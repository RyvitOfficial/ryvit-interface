import request from '@/utils/request';

import { ISignUpFormData, ApiResponse } from '@/types';

export const registerUser = async (
  formData: ISignUpFormData,
): Promise<ApiResponse> => {
  try {
    const { data } = await request(
      `${process.env.NEXT_PUBLIC_RYVIT_API}/users`,
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
