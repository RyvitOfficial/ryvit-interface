'use client';

import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';

import './globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store';
import Metadata from '@/constants/metaData';
import { Toaster } from 'sonner';
import dynamic from 'next/dynamic';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-grotesk',
  display: 'swap',
});

const Providers = dynamic(
  () => import('./Providers').then((mod) => mod.Providers),
  {
    ssr: false,
  },
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <Metadata />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} ${grotesk.variable} antialiased h-screen`}
      >
        <Provider store={store}>
          <Providers>
            {children}
            <Toaster position="bottom-center" richColors />
          </Providers>
        </Provider>
      </body>
    </html>
  );
}
