'use client';

import { BluxProvider, networks } from '@bluxcc/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BluxProvider
      config={{
        appName: 'Ryvit',
        networks: [networks.testnet],
        appearance: {
          theme: 'light',
          background: '#ffffff',
          accent: '#1B59F8',
          textColor: '#000000',
          font: 'Inter',
          cornerRadius: '16px',
          logo: '/images/logoType.png',
        },
        loginMethods: ['wallet'],
        defaultNetwork: networks.testnet,
      }}
    >
      {children}
    </BluxProvider>
  );
}
