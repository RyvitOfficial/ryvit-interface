import { AddContractFormData } from '@/types';
import request from '@/utils/request';

export const AddContract = async (
  formData: AddContractFormData,
  token: string,
) => {
  try {
    const { data } = await request(
      `${process.env.NEXT_PUBLIC_RYVIT_API}/contracts/`,
      {
        method: 'POST',
        body: formData,
        headers: { authorization: `Bearer ${token}` },
      },
    );

    return data;
  } catch (error: any) {
    throw error.data;
  }
};
