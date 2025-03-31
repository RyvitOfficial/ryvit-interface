/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';

import AuthLayout from '@/containers/AuthLayout';
import SignUpForm from './signupForm';

export const metadata: Metadata = {
  title: 'Ryvit - Sign Up',
};

const SignUp = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;
