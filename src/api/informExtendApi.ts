import request from '@/utils/request';

interface IInformExtendApi {
  dataKeys: string[];
}

export const InformExtendApi = async (
  formData: IInformExtendApi,
  token: string,
  id: string,
) => {
  try {
    const { data } = await request(
      `https://api.ryvit.app/contracts/${id}/extend`,
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
