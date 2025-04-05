import request from '@/utils/request';

interface VerifyEmailResponse {
  response: Response;
  data: any;
}

export const verifyEmail = async (
  token: string,
): Promise<VerifyEmailResponse> => {
  return await request('https://api.ryvit.app/users/verify', {
    method: 'PUT',
    body: { token },
  });
};
