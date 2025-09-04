'use client';

import { Inter, JetBrains_Mono } from 'next/font/google';

import './globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store';
import Metadata from '@/constants/metaData';
import { Toaster } from 'sonner';
import { Providers } from './Providers';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
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
      <body
        className={`${inter.variable} ${jetbrains.variable} antialiased h-screen`}
      >
        <Provider store={store}>
          <Providers>
            {children}
            <Toaster position="bottom-center" />
          </Providers>
        </Provider>
      </body>
    </html>
  );
}
