import request from '@/utils/request';

const TestDeliveryApi = async (id: string, endpoint: string, token: string) => {
  try {
    const { data } = await request(
      `${process.env.NEXT_PUBLIC_RYVIT_EVENT}/test/${id}`,
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

export default TestDeliveryApi;
