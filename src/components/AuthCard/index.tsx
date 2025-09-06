import { ReactNode } from 'react';

interface AuthCardProp {
  children: ReactNode;
}

const AuthCard = ({ children }: AuthCardProp) => {
  return (
    <section className="w-1/3 overflow-hidden shadow-2xl shadow-primary/5 bg-gradient-to-b from-bgblack2 to-[#0E1112] border-2 border-[#1B59F8]/10 z-50 relative m-auto rounded-xl small:shadow-none small:rounded-none small:border-none small:h-screen small:w-full">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 
                w-full h-28 
                bg-gradient-to-b from-primary/20 to-transparent overflow-hidden
                [mask-image:linear-gradient(to_right,transparent,black,transparent)]
                [mask-repeat:no-repeat] [mask-size:100%_100%] -z-50"
      >
        <div className="absolute inset-0 opacity-100 bg-grid-pattern"></div>
      </div>
      {children}
    </section>
  );
};

export default AuthCard;
