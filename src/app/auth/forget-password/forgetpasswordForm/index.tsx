'use client';

import Input from '@/components/Input';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

import Toast from '@/components/Toasts';
import Button from '@/components/Button';

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
            Forgot Password
          </h5>
          <p className="text-[13px] text-gray-400 text-center mt-1 short:text-xs">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

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
  );
};

export default ForgetPassword;
