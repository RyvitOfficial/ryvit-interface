import { AddContractFormData } from '@/types';
import request from '@/utils/request';

export const AddContract = async (
  formData: AddContractFormData,
  token: string,
) => {
  try {
    const { data } = await request('https://api.ryvit.app/contracts/', {
      method: 'POST',
      body: formData,
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error: any) {
    throw error.data;
  }
};
