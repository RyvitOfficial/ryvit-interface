import request from '@/utils/request';

import { ISettings } from '@/types';

export const InformSettingApi = async (
  formData: ISettings,
  token: string,
  id: string,
) => {
  try {
    const { data } = await request(
      `https://api.ryvit.app/contracts/${id}/settings`,
      {
        method: 'PUT',
        body: formData,
        headers: { authorization: `Bearer ${token}` },
      },
    );

    return data;
  } catch (error: any) {
    throw error.data;
  }
};
