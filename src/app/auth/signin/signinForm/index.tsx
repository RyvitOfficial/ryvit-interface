'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import Input from '@/components/Input';
import Button from '@/components/Button';
import Toast from '@/components/Toasts';
import Checkbox from '@/components/CheckBox';
import AuthCard from '@/components/AuthCard';

import { login, setUserInfo } from '@/reducers/user';
import { loginUser } from '@/api/authLogin';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';

import { ISignInFormData, IUser } from '@/types';
import { GetTokenIsValid } from '@/api/getUser';
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
      router.push(Pages.DASHBOARD);
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
          dispatch(setUserInfo(res.result as IUser));
        }
      });

      router.push(Pages.DASHBOARD);
    } catch {
      Toast({ text: 'Login failed', type: 'error' });
    }

    setLoading(false);
  };

  return (
    <AuthCard>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full !z-50 px-14 pt-14 short:pt-4 h-fit small:px-4 small:w-[90%] small:m-auto small:flex small:flex-col small:items-center small:justify-center"
      >
        <div className="w-full text-center flex justify-center z-50">
          <Image
            src="/images/logoType.png"
            alt="logoType"
            width={110}
            height={110}
            draggable={false}
          />
        </div>
        <div className="flex flex-col justify-center items-center mb-8">
          <h5 className="text-[27px] font-[600] tracking-tight text-white short:text-xl">
            Welcome back
          </h5>
          <p className="text-xs text-white/90 px-8 text-center mt-1 short:text-xs">
            Access your dashboard and manage your contracts in one place
          </p>
        </div>
        <div className="space-y-4 w-full">
          <div className="relative">
            <Input
              label="Email Address"
              placeholder="you@example.com"
              border
              error
              inputClassName="w-full px-4 py-3 rounded-lg bg-[#1E242C] 
             border border-[#2C3440] text-gray-200 
             placeholder-gray-500 focus:outline-none 
             focus:border-[#1B59F8] focus:ring-1 focus:ring-[#1B59F8]"
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
              inputClassName="w-full px-4 py-3 rounded-lg bg-[#1E242C] 
             border border-[#2C3440] text-gray-200 
             placeholder-gray-500 focus:outline-none 
             focus:border-[#1B59F8] focus:ring-1 focus:ring-[#1B59F8]"
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
            type="secondary"
          />

          <Link href="/auth/forget-password" className="text-primary text-sm">
            Forgot your password ?
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

        <div className="space-x-2 w-full text-center mt-5 pb-8 text-sm short:mt-4 short:pb-4">
          <span className="text-white/90">Don’t have an account?</span>
          <a href={Pages.SIGNUP} className="text-primary hover:text-primary/80">
            Create one
          </a>
        </div>
      </form>
    </AuthCard>
  );
};

export default SignInForm;
