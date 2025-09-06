import request from '@/utils/request';

interface IInformExtendApi {
  keys: string[];
}

export const InformExtendApi = async (
  formData: IInformExtendApi,
  token: string,
  id: string,
) => {
  try {
    const { data } = await request(
      `${process.env.NEXT_PUBLIC_RYVIT_TTL}/${id}`,
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
