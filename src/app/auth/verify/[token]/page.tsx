'use client';

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { Pages } from '@/constants/Pages';
import AuthCard from '@/components/AuthCard';
import AuthLayout from '@/containers/AuthLayout';

import { verifyEmail } from '@/api/verifyEmail';

const VerifyEmailPage = ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const router = useRouter();
  const { token } = use(params);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const verify = async () => {
      try {
        const { response, data } = await verifyEmail(token);

        if (response.status === 200) {
          setStatus('success');
          setTimeout(() => router.push(Pages.SIGNIN), 3000);
        } else {
          setStatus('error');
          setErrorMessage(
            data.error?.message ||
              'The verification link is invalid or has expired.',
          );
        }
      } catch (error: any) {
        setStatus('error');
        setErrorMessage(
          error.data?.error?.message || 'An error occurred. Please try again.',
        );
      }
    };

    verify();
  }, [router, token]);

  const states = {
    loading: {
      icon: (
        <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
      ),
      title: 'Verifying your email...',
      subtitle: 'Please wait a moment while we confirm your account.',
      color: 'text-white',
    },
    success: {
      icon: (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 text-3xl mb-6"
        >
          ✓
        </motion.div>
      ),
      title: 'Email Verified 🎉',
      subtitle: 'Redirecting you to sign in...',
      color: 'text-green-600',
    },
    error: {
      icon: (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 text-3xl mb-6"
        >
          ✕
        </motion.div>
      ),
      title: 'Verification Failed',
      subtitle: errorMessage,
      color: 'text-red-600',
    },
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className="py-10 text-center flex flex-col items-center">
          <Image
            src="/images/logoType.png"
            alt="logoType"
            width={140}
            height={140}
            className="mb-10"
            draggable={false}
            style={{ height: 'auto', width: 'auto' }}
          />

          {states[status].icon}

          <h2 className={`text-xl font-semibold ${states[status].color}`}>
            {states[status].title}
          </h2>
          <p className="text-gray-600 text-sm mt-2 max-w-xs">
            {states[status].subtitle}
          </p>

          {status === 'error' && (
            <div className="mt-6 flex flex-col items-center gap-3">
              <p className="text-xs text-gray-500">
                Please try again or request a new verification link.
              </p>
              <button
                onClick={() => router.push(Pages.SIGNUP)}
                className="px-5 py-2 text-sm font-medium rounded-xl bg-primary text-white hover:bg-primary/90 shadow-sm transition"
              >
                Request New Link
              </button>
            </div>
          )}
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default VerifyEmailPage;
