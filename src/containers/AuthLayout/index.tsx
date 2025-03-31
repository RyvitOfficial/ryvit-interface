'use client';

interface IAuthLayout {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: IAuthLayout) => {
  return (
    <div className="w-full h-full flex justify-between items-center ">
      <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle,_rgba(27,89,248,0.5)_0%,_rgba(27,89,248,0)_70%)] blur-[150px] transform -translate-x-1/2 -translate-y-1/2 animate-pulse "></div>

      <div className="flex items-center justify-center w-full !z-[9999]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
