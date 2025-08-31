'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import Card from '@/components/Card';
import Input from '@/components/Input';
import Toast from '@/components/Toasts';
import Button from '@/components/Button';
import LoadingThreeDotsPulse from '@/components/LoadingDots';

import { resetPassword } from '@/api/resetPassword';
import { getValidResetPasswordToken } from '@/api/getValidResetPasswordToken';

import { IResetPasswordForm } from '@/types';

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
        text: 'Password changed successfully',
      });

      router.push('/signin');
    }
  };

  return (
    <>
      {status === 'success' ? (
        <section className="w-1/3 shadow-lg bg-white border border-border rounded-xl small:shadow-none small:rounded-none small:border-none small:h-screen small:w-full">
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
              />
            </div>
            <div className="flex flex-col justify-center items-center mb-8">
              <h5 className="text-[22px] font-Inter font-[600] text-[#343C6A] short:text-xl">
                Reset Your Password
              </h5>
              <p className="text-[13px] text-gray-400 text-center mt-1 short:text-xs">
                Enter your new password below to reset your account password
              </p>
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
            <div className="flex justify-center w-full mt-4">
              <Button
                rounded="xl"
                color="blue"
                type="submit"
                content="Confrim"
                className="w-full cursor-pointer font-Inter font-medium"
              />
            </div>
          </form>
        </section>
      ) : status === 'error' ? (
        <Card bgColor="white" borderColor="#e5e5e5">
          <div className="p-12 text-xl flex flex-col space-y-4">
            <p> Something went wrong</p>
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3 text-center py-2.5 text-sm cursor-pointer font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </Card>
      ) : (
        <LoadingThreeDotsPulse />
      )}
    </>
  );
};

export default ResetPasswordForm;
