import { Metadata } from 'next';
import { use } from 'react';

import AuthLayout from '@/containers/AuthLayout';
import ResetPasswordForm from '../resetPasswordForm';

export const metadata: Metadata = {
  title: 'Ryvit - Forget Password',
};

const ResetPassword = ({ params }: { params: Promise<{ token: string }> }) => {
  const { token } = use(params);
  return (
    <AuthLayout>
      <ResetPasswordForm token={token} />
    </AuthLayout>
  );
};

export default ResetPassword;
