'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Toast from '@/components/Toasts';

import { registerUser } from '@/api/authRegister';

import { SignUpFormData } from '@/types';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignUpFormData) => {
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
      alert(error.message || 'Registration failed');
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
              Create your account
            </h5>
            <p className="text-[13px] text-gray-400 text-center mt-1">
              Sign up to get started with your journey.
            </p>
          </div>

          <div className="space-y-4">
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

          <div className="flex justify-center mt-4">
            <Button
              variant="form"
              color="blue"
              type="submit"
              content={loading ? 'Signing Up...' : 'Sign Up'}
              className="w-full cursor-pointer font-medium"
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
            <span>Already have an account?</span>{' '}
            <a href="/signin" className="text-blue-700">
              Sign In
            </a>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignUpForm;
