import request from '@/utils/request';

export const GetTokenIsValid = async (token: string) => {
  try {
    const { response } = await request(`https://api.ryvit.app/users`, {
      method: 'GET',
      headers: { authorization: `Bearer ${token}` },
    });

    return response.status === 200;
  } catch {
    return false;
  }
};
