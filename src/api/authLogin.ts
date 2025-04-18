import { IResponseSignIn, ISignInFormData } from '@/types';
import request from '@/utils/request';

export const loginUser = async (formData: ISignInFormData) => {
  try {
    const { data } = await request<IResponseSignIn>(
      `${process.env.NEXT_PUBLIC_RYVIT_API}/users/login`,
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
