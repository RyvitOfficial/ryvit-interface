import request from '@/utils/request';

export const DeleteContract = async (token: string, id: string) => {
  try {
    const { data } = await request(
      `${process.env.NEXT_PUBLIC_RYVIT_API}/contracts/${id}`,
      {
        method: 'Delete',
        headers: { authorization: `Bearer ${token}` },
      },
    );

    return data;
  } catch (error: any) {
    throw error.data;
  }
};
