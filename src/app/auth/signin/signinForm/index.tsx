'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import Input from '@/components/Input';
import Button from '@/components/Button';
import Toast from '@/components/Toasts';
import Checkbox from '@/components/CheckBox';

import { login, setUserInfo } from '@/reducers/user';
import { loginUser } from '@/api/authLogin';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';

import { ISignInFormData } from '@/types';
import { GetTokenIsValid } from '@/api/getUser';
import Link from 'next/link';
import { Pages } from '@/constants/Pages';

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInFormData>();

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

  const onSubmit = async (data: ISignInFormData) => {
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

      if (rememberMe) {
        document.cookie = `rememberMe=true; path=/; max-age=${
          30 * 24 * 60 * 60
        }`;
      } else {
        document.cookie = `rememberMe=false; path=/;`;
      }

      GetTokenIsValid(resultLogin.result.token).then((res) => {
        if (res) {
          dispatch(setUserInfo(res));
        }
      });

      router.push('/dashboard');
    } catch {
      Toast({ text: 'Login failed', type: 'error' });
    }

    setLoading(false);
  };

  return (
    <section className="w-1/3 shadow-lg bg-white border border-border rounded-xl small:shadow-none small:rounded-none small:border-none small:h-screen small:w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-14 pt-12 short:pt-4 h-fit small:px-4 small:w-[90%] small:m-auto small:flex small:flex-col small:items-center small:justify-center"
      >
        <div className="w-full text-center flex justify-center mb-2">
          <Image
            src="/images/logoType.png"
            alt="logoType"
            width={130}
            height={130}
          />
        </div>
        <div className="flex flex-col justify-center items-center mb-8">
          <h5 className="text-[22px] font-Inter font-[600] text-[#343C6A] short:text-xl">
            Sign in to Account
          </h5>
          <p className="text-[13px] text-gray-400 text-center mt-1 short:text-xs">
            Log in to access your dashboard and features
          </p>
        </div>
        <div className="space-y-4 w-full">
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

        <div className="flex justify-between px-1 small:px-0 mt-3 mb-8 text-gray-500 w-full">
          <Checkbox
            label="Remember me"
            checked={rememberMe}
            value={'Remember me'}
            onChange={handleCheckBoxChange}
            type="primary"
          />

          <Link
            href="/forget-password"
            className="!text-[#1B59F8] font-medium text-[14px]"
          >
            {' '}
            Forgot Password?
          </Link>
        </div>

        <div className="flex justify-center w-full">
          <Button
            rounded="xl"
            color="blue"
            type="submit"
            content={loading ? 'Signing In...' : 'Sign In'}
            className="w-full cursor-pointer font-Inter font-medium"
          />
        </div>

        {/* <div>
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
        </div> */}

        <div className="font-[600] w-full text-center mt-5 pb-8 short:mt-4 short:pb-4">
          <span> have an account?</span>
          <a href={Pages.SIGNUP} className="text-blue-700">
            Sign Up
          </a>
        </div>
      </form>
    </section>
  );
};

export default SignInForm;
