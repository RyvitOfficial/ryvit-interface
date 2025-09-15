import request from '@/utils/request';

const saveDeliveryApi = async (id: string, endpoint: string, token: string) => {
  try {
    const { data } = await request(
      `${process.env.NEXT_PUBLIC_RYVIT_EVENT}/save/${id}`,
      {
        body: { endpoint },
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
      },
    );

    return data;
  } catch (error: any) {
    throw error.data;
  }
};

export default saveDeliveryApi;
