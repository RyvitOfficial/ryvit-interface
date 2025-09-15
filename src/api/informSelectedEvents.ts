import request from '@/utils/request';

const informSelectedEvents = async (
  id: string,
  eventIds: string[],
  token: string,
) => {
  try {
    const { data } = await request(
      `${process.env.NEXT_PUBLIC_RYVIT_EVENT}/${id}`,
      {
        body: { eventIds },
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
      },
    );

    return data;
  } catch (error: any) {
    throw error.data;
  }
};

export default informSelectedEvents;
