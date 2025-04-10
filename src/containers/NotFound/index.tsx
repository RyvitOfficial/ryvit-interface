import Image from 'next/image';
import Link from 'next/link';

const NotFoundContainer = () => {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white/20 px-6 py-24 sm:py-32 lg:px-8 z-50">
        <div className="text-center">
          <div className="flex justify-center w-full">
            <Image
              src="/images/logoType.png"
              alt="logoType"
              width={200}
              height={200}
            />
          </div>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm cursor-pointer font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
      <div className="absolute -z-[5] top-1/2 left-1/2 w-[1000px] h-full bg-[radial-gradient(circle,_rgba(27,89,248,0.5)_0%,_rgba(27,89,248,0)_30%)] blur-[150px] transform -translate-x-1/2 -translate-y-1/2 animate-pulse "></div>
    </>
  );
};

export default NotFoundContainer;
