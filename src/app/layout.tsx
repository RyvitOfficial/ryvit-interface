import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

export const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Ryvit',
  description: 'Automating TTL management for blockchain developers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased h-dvh`}>{children}</body>
    </html>
  );
}
