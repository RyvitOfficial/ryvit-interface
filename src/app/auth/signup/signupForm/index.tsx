'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import Input from '@/components/Input';
import Button from '@/components/Button';
import Toast from '@/components/Toasts';
import AuthCard from '@/components/AuthCard';

import { registerUser } from '@/api/authRegister';

import { Pages } from '@/constants/Pages';
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
    <AuthCard>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-14 pt-12 short:pt-4 h-fit small:px-4 small:w-[90%] small:m-auto small:flex small:flex-col small:items-center small:justify-center"
      >
        <div className="w-full text-center flex justify-center z-50">
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
            Create your account
          </h5>
          <p className="text-xs text-white/90 px-8 text-center mt-1 short:text-xs">
            Sign up to get started with your journey.
          </p>
        </div>

        <div className="space-y-4 w-full">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            border
            error
            inputClassName="w-full px-4 py-3 rounded-lg bg-[#1E242C] 
             border border-[#2C3440] text-gray-200 
             placeholder-gray-500 focus:outline-none 
             focus:border-primary focus:ring-1 focus:ring-primary"
            errorMsg={errors.email?.message}
            {...register('name', { required: 'Full Name is required' })}
          />

          <Input
            label="Email"
            placeholder="Enter your email address"
            border
            error
            inputClassName="w-full px-4 py-3 rounded-lg bg-[#1E242C] 
             border border-[#2C3440] text-gray-200 
             placeholder-gray-500 focus:outline-none 
             focus:border-primary focus:ring-1 focus:ring-primary"
            errorMsg={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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
            inputClassName="w-full px-4 py-3 rounded-lg bg-[#1E242C] 
             border border-[#2C3440] text-gray-200 
             placeholder-gray-500 focus:outline-none 
             focus:border-primary focus:ring-1 focus:ring-primary"
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

        <div className="space-x-2 w-full text-center mt-5 pb-8 text-sm short:mt-4 short:pb-4">
          <span className="text-white/90">Already have an account?</span>{' '}
          <a href={Pages.SIGNIN} className="text-primary hover:text-primary/80">
            Sign In
          </a>
        </div>
      </form>
    </AuthCard>
  );
};

export default SignUpForm;
