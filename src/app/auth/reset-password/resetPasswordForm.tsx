'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import Input from '@/components/Input';
import Toast from '@/components/Toasts';
import Button from '@/components/Button';
import AuthCard from '@/components/AuthCard';
import LoadingThreeDotsPulse from '@/components/LoadingDots';

import { resetPassword } from '@/api/resetPassword';
import { getValidResetPasswordToken } from '@/api/getValidResetPasswordToken';

import { IResetPasswordForm } from '@/types';
import { Pages } from '@/constants/Pages';

interface IResetPasswordProps {
  token: string;
}

const ResetPasswordForm = ({ token }: IResetPasswordProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordForm>();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );
  const router = useRouter();

  useEffect(() => {
    const resetPassword = async () => {
      const response = await getValidResetPasswordToken(token);

      if (response.status >= 400) {
        setStatus('error');
      } else {
        setStatus('success');
      }
    };

    resetPassword();
  }, [token]);

  const onSubmit = async (data: IResetPasswordForm) => {
    const response = await resetPassword({ ...data, token });

    if (response.status >= 400) {
      Toast({
        type: 'error',
        text: 'Something went wrong. Please check the link or request a new password reset',
      });
    } else {
      Toast({
        type: 'success',
        text: 'Your password has been updated successfully. You can now sign in.',
      });

      router.push(Pages.SIGNIN);
    }
  };

  return (
    <>
      {status === 'success' ? (
        <AuthCard>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full px-14 py-12 h-fit small:px-4 small:w-[90%] small:m-auto small:flex small:flex-col small:items-center small:justify-center"
          >
            <div className="w-full text-center flex justify-center mb-2">
              <Image
                src="/images/logoType.png"
                alt="logoType"
                width={130}
                height={130}
                draggable={false}
                style={{ height: 'auto', width: 'auto' }}
              />
            </div>
            <div className="flex flex-col justify-center items-center mb-8">
              <h5 className="text-[22px] font-Inter font-[600] text-[#343C6A] short:text-xl">
                Create a New Password
              </h5>
              <p className="text-[13px] text-gray-400 text-center mt-1 short:text-xs">
                Please choose a strong password to secure your account
              </p>
            </div>

            <div className="relative">
              <Input
                type="password"
                label="New Password"
                placeholder="Enter your new password"
                border
                hideCharacter
                error
                errorMsg={errors.password && errors.password.message}
                {...register('password', { required: 'Password is required' })}
              />
            </div>
            <div className="flex justify-center w-full mt-4">
              <Button
                rounded="xl"
                color="blue"
                type="submit"
                content="Reset Password"
                className="w-full cursor-pointer font-Inter font-medium"
              />
            </div>
          </form>
        </AuthCard>
      ) : status === 'error' ? (
        <AuthCard>
          <div className="px-12 py-24 flex flex-col justify-center items-center gap-4">
            <p className="text-white text-2xl font-medium">
              Invalid or expired link
            </p>
            <p className="text-gray-300 px-4 mb-8 text-sm text-center">
              The password reset link is not valid anymore. Please request a new
              reset link.
            </p>
            <Link
              href="/"
              className="w-1/3 rounded-lg bg-primary px-3 text-center py-2.5 text-sm cursor-pointer text-white shadow-xs hover:bg-primary/80"
            >
              Go back home
            </Link>
          </div>
        </AuthCard>
      ) : (
        <LoadingThreeDotsPulse />
      )}
    </>
  );
};

export default ResetPasswordForm;
