/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';

import AuthLayout from '@/containers/AuthLayout';
import SignInForm from './signinForm';

export const metadata: Metadata = {
  title: 'Ryvit - Sign in',
};

const SignIn = () => {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
};

export default SignIn;
