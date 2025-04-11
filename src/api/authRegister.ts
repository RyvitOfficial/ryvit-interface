import request from '@/utils/request';

import { SignUpFormData, ApiResponse } from '@/types';

export const registerUser = async (
  formData: SignUpFormData,
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
