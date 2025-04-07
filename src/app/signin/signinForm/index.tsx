'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Toast from '@/components/Toasts';
import Checkbox from '@/components/CheckBox';

import { login } from '@/reducers/user';
import { loginUser } from '@/api/authLogin';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';

import { SignInFormData } from '@/types';

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const isLogin = useAppSelector((state) => state.user.isLogin) || false;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLogin) {
      router.push('/dashboard');
    }
  }, [isLogin, router]);

  const handleCheckBoxChange = () => {
    setRememberMe(!rememberMe);
  };

  const onSubmit = async (data: SignInFormData) => {
    setLoading(true);

    try {
      const loginPromise = loginUser(data);

      Toast({
        type: 'process',
        text: 'Signing you in...',
        promise: loginPromise,
        successMessage: 'Welcome back!',
        errorMessage: 'Login failed. Please check your credentials.',
      });

      const resultLogin = await loginPromise;

      if (!resultLogin.result?.token) {
        Toast({ text: 'Token not found in response.', type: 'error' });
        return;
      }

      dispatch(login(resultLogin.result.token));
      localStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');
      router.push('/dashboard');
    } catch {
      Toast({ text: 'Login failed', type: 'error' });
    }

    setLoading(false);
  };

  return (
    <div className="w-4/15">
      <Card bgColor="white" borderColor="#E9EAEB" className="shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="px-14 pt-12">
          <div className="w-full text-center flex justify-center mb-2">
            <Image
              src="/images/logoType.png"
              alt="logoType"
              width={130}
              height={130}
            />
          </div>
          <div className="flex flex-col justify-center items-center mb-8">
            <h5 className="text-[22px] font-Inter font-[600] text-[#343C6A]">
              Sign in to Account
            </h5>
            <p className="text-[13px] text-gray-400 text-center mt-1">
              Log in to access your dashboard and features
            </p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <Input
                label="Email Address"
                placeholder="Enter your email address"
                border
                error
                errorMsg={errors.email && errors.email.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
            </div>

            <div className="relative">
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                border
                hideCharacter
                error
                errorMsg={errors.password && errors.password.message}
                {...register('password', { required: 'Password is required' })}
              />
            </div>
          </div>

          <div className="flex justify-between px-1 mt-3 mb-8 text-gray-500">
            <Checkbox
              label="Remember me"
              checked={rememberMe}
              value={'Remember me'}
              onChange={handleCheckBoxChange}
              type="primary"
            />

            <a href="#" className="!text-[#1B59F8] font-medium text-[14px]">
              Forgot Password?
            </a>
          </div>

          <div className="flex justify-center">
            <Button
              variant="form"
              color="blue"
              type="submit"
              content={loading ? 'Signing In...' : 'Sign In'}
              className="w-full cursor-pointer font-Inter font-medium"
            />
          </div>

          <div>
            <p className="text-[14px] font-[600] mt-4">
              By continuing you agree{' '}
              <a href="#" className="text-blue-700">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-700">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div className="font-[600] w-full text-center mt-12 pb-8">
            <span> have an account?</span>{' '}
            <a href="/signup" className="text-blue-700">
              Sign Up
            </a>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignInForm;
