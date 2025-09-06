import Image from 'next/image';
import Link from 'next/link';

const NotFoundContainer = () => {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-bgblack1 bg-grid-pattern px-6 py-24 sm:py-32 lg:px-8 z-50">
        <div className="w-full text-center flex justify-center z-50 absolute top-0">
          <Image
            src="/images/logoType.png"
            alt="logoType"
            width={200}
            height={200}
            className="mt-8"
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 
                w-full h-28 
                bg-gradient-to-b from-primary/20 to-transparent overflow-hidden
                [mask-image:linear-gradient(to_right,transparent,black,transparent)]
                [mask-repeat:no-repeat] [mask-size:100%_100%] -z-50"
          >
            <div className="absolute inset-0 opacity-100 bg-grid-pattern"></div>
          </div>
        </div>
        <div className="text-center">
          <h1 className="mt-4 text-6xl font-bold tracking-tight text-balance text-primary sm:text-7xl">
            404
          </h1>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-balance text-white sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm cursor-pointer font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
      <div className="absolute -z-[5] top-1/2 left-1/2 w-[1000px] h-full bg-[radial-gradient(circle,_rgba(27,89,248,0.5)_0%,_rgba(27,89,248,0)_30%)] blur-[150px] transform -translate-x-1/2 -translate-y-1/2 animate-pulse "></div>
    </>
  );
};

export default NotFoundContainer;
