'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import Input from '@/components/Input';
import Toast from '@/components/Toasts';
import Button from '@/components/Button';
import AuthCard from '@/components/AuthCard';

import { forgetPassword } from '@/api/forgetPassword';

import { IForgetPassword } from '@/types';

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgetPassword>();

  const onSubmit = async (data: IForgetPassword) => {
    await forgetPassword(data);

    await Toast({
      type: 'success',
      text: 'Please check your email.',
    });
  };

  return (
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
          />
        </div>
        <div className="flex flex-col justify-center items-center mb-8">
          <h5 className="text-[27px] font-[600] tracking-tight text-white short:text-xl">
            Forgot your password?
          </h5>
          <p className="text-xs text-white/90 px-8 text-center mt-1 short:text-xs">
            Enter your email address and we’ll send you a link to reset your
            password.
          </p>
        </div>

        <div className="relative">
          <Input
            label="Email Address"
            placeholder="Enter your email address"
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

        <div className="w-full flex justify-end gap-3 mt-8 h-10">
          <Button
            rounded="xl"
            color="dark"
            type="button"
            className="cursor-pointer !h-12 text-white text-sm"
          >
            <Link href="/auth/signin">Go Back Home</Link>
          </Button>
          <Button
            rounded="xl"
            color="blue"
            type="submit"
            content="Send Reset Link"
            className="w-full"
          />
        </div>
      </form>
    </AuthCard>
  );
};

export default ForgetPassword;
