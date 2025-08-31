'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import Input from '@/components/Input';
import Button from '@/components/Button';
import Toast from '@/components/Toasts';

import { registerUser } from '@/api/authRegister';

import { ISignUpFormData } from '@/types';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFormData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ISignUpFormData) => {
    setLoading(true);

    try {
      const registerPromise = registerUser(data);
      await Toast({
        type: 'process',
        text: 'Creating your account...',
        promise: registerPromise,
        successMessage: 'Account created! Please verify your email.',
        errorMessage: 'Registration failed. Try again later.',
      });
    } catch (error: any) {
      Toast(error.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <section className="w-1/3 shadow-lg bg-white border border-border rounded-xl small:shadow-none small:rounded-none small:border-none small:h-screen small:w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-14 pt-12 short:pt-4 h-fit small:px-4 small:w-[90%] small:m-auto small:flex small:flex-col small:items-center small:justify-center"
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
            Create your account
          </h5>
          <p className="text-[13px] text-gray-400 text-center mt-1 short:text-xs">
            Sign up to get started with your journey.
          </p>
        </div>

        <div className="space-y-4 w-full">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            border
            error
            errorMsg={errors.name && errors.name.message}
            {...register('name', { required: 'Full Name is required' })}
          />

          <Input
            label="Email"
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

          <Input
            type="password"
            label="Password"
            placeholder="Create a secure password"
            border
            hideCharacter
            error
            errorMsg={errors.password && errors.password.message}
            {...register('password', { required: 'Password is required' })}
          />
        </div>

        <div className="flex justify-center mt-6 w-full">
          <Button
            rounded="xl"
            color="blue"
            type="submit"
            content={loading ? 'Signing Up...' : 'Sign Up'}
            className="w-full cursor-pointer font-medium"
          />
        </div>

        <div className="font-[500] w-full text-center mt-5 pb-8 short:mt-4 short:pb-4">
          <span>Already have an account?</span>{' '}
          <a href="/signin" className="text-blue-700">
            Sign In
          </a>
        </div>
      </form>
    </section>
  );
};

export default SignUpForm;
