import request from '@/utils/request';

const liveStreamApi = async (id: string, token: string) => {
  try {
    const { data } = await request(
      `${process.env.NEXT_PUBLIC_RYVIT_EVENT}/${id}`,
      {
        method: 'PUT',
        headers: { authorization: `Bearer ${token}` },
      },
    );

    return data;
  } catch (error: any) {
    throw error.data;
  }
};

export default liveStreamApi;
