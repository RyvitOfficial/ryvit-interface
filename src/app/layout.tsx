'use client';

import { Inter } from 'next/font/google';

import './globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store';
import Metadata from '@/constants/metaData';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

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
      <body className={`${inter.variable} antialiased h-screen`}>
        <Provider store={store}>
          {children}
          <Toaster position="bottom-center" />
        </Provider>
      </body>
    </html>
  );
}
