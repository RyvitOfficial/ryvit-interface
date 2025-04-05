import AuthLayout from '@/containers/AuthLayout';
import SignInForm from './signinForm';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Ryvit - Sign In',
};

const SignIn = () => {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
};

export default SignIn;
