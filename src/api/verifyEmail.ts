import request from '@/utils/request';

interface VerifyEmailResponse {
  response: Response;
  data: any;
}

export const verifyEmail = async (
  token: string,
): Promise<VerifyEmailResponse> => {
  return await request(`${process.env.NEXT_PUBLIC_RYVIT_API}/users/verify`, {
    method: 'PUT',
    body: { token },
  });
};
