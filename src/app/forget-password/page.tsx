import { Metadata } from 'next';

import AuthLayout from '@/containers/AuthLayout';
import ForgetPassword from './forgetpasswordForm';

export const metadata: Metadata = {
  title: 'Ryvit - Forget Password',
};

const SignUp = () => {
  return (
    <AuthLayout>
      <ForgetPassword />
    </AuthLayout>
  );
};

export default SignUp;
