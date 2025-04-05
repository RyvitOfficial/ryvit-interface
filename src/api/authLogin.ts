import { IResponseSignIn, SignInFormData } from '@/types';
import request from '@/utils/request';

export const loginUser = async (formData: SignInFormData) => {
  try {
    const { data } = await request<IResponseSignIn>(
      'https://api.ryvit.app/users/login',
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
