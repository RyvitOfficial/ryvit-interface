'use client';
import Image from 'next/image';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { verifyEmail } from '@/api/verifyEmail';
import { Pages } from '@/constants/Pages';

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
          setTimeout(() => {
            router.push(Pages.SIGNIN);
          }, 3000);
        } else if (response.status === 400) {
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

  const renderIcon = () => {
    if (status === 'loading') {
      return (
        <div className="w-12 h-12 border-4 border-[#1B59F8] border-t-transparent rounded-full animate-spin mb-4 mx-auto" />
      );
    } else if (status === 'success') {
      return <div className="text-5xl text-green-500 mb-4">✅</div>;
    } else if (status === 'error') {
      return <div className="text-5xl text-red-500 mb-4">❌</div>;
    }
  };

  const renderMessage = () => {
    if (status === 'loading') {
      return 'Verifying your email...';
    } else if (status === 'success') {
      return 'Your email has been successfully verified! Redirecting to sign in...';
    } else {
      return errorMessage;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center border border-[#E9EAEB]">
        <div className="w-full text-center flex justify-center mb-12">
          <Image
            src="/images/logoType.png"
            alt="logoType"
            width={130}
            height={130}
          />
        </div>
        {renderIcon()}
        <p className="text-gray-700 text-base font-medium">{renderMessage()}</p>
        {status === 'error' && (
          <p className="text-sm text-gray-500 mt-2">
            Please try again or request a new verification link.
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
