import request from '@/utils/request';

export const getValidResetPasswordToken = async (token: string) => {
  try {
    const { response } = await request(
      `${process.env.NEXT_PUBLIC_RYVIT_API}/users/reset/${token}`,
      {
        method: 'GET',
        headers: { authorization: `Bearer ${token}` },
      },
    );

    return response;
  } catch (error: any) {
    throw error.data;
  }
};
