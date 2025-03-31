/* eslint-disable react/no-unescaped-entities */
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';

import googleLogo from '../../../../public/images/Google__G__logo.svg.png';
import Image from 'next/image';

const SignUpForm = () => {
  return (
    <div className="w-3/10">
      <Card bgColor="white" borderColor="#E9EAEB" className="shadow-lg">
        <div className="px-14 pt-12">
          <div className="w-full text-center flex justify-center mb-12">
            <Image
              src="/images/logoType.png"
              alt="logoType"
              width={130}
              height={130}
            />
          </div>
          <div className="flex flex-col justify-center items-center mb-4">
            <h4 className="text-primary bg-primary text-xl font-inter font-medium">
              Register
            </h4>
            <h5 className="text-3xl font-Inter font-[600] text-primary">
              Welcome!
            </h5>
            <span className="text-[#a8a7a8] text-[12px] font-inter font-medium mb-8 mt-2">
              Register with your Google account
            </span>
            <Button
              variant="form"
              color="white"
              type="button"
              content="Google"
              className="w-full !rounded-xl cursor-pointer !h-10 !text-[15px] hover:bg-gray-100 transition mb-5"
              logo={googleLogo}
            />

            <div className="w-full relative my-4 flex justify-center">
              <div className="bg-[#d4d4d4] w-full h-[1px]"></div>
              <div className="absolute top-[-11px] !bg-white w-[100px] h-6 z-[9999] text-center">
                Or
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Please Enter Your Full Name"
              border
            />

            <Input label="Email" placeholder="Please Enter Your Email" border />
            <Input
              label="Password"
              placeholder="Please Enter Your Password"
              border
            />
          </div>

          <div className="flex justify-center mt-4">
            <Button
              variant="form"
              color="blue"
              type="submit"
              content="Sign Up"
              className="w-full cursor-pointer font-Inter font-medium"
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
            <span>Don't have an account?</span>{' '}
            <a href="/signup" className="text-blue-700">
              Sign Up
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignUpForm;
