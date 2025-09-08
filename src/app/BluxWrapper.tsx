'use client';

import { BluxProvider, networks } from '@bluxcc/react';

export default function BluxWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BluxProvider
      config={{
        appName: 'Ryvit',
        networks: [networks.testnet],
        appearance: {
          theme: 'dark',
          background: '#141419',
          accent: '#1b59f8',
          bgField: '#1f1f26',
          textColor: '#ffffff',
          borderRadius: '20px',
          includeBorders: true,
          borderWidth: '1px',
          borderColor: 'rgba(55, 65, 81, 0.5)',
          font: 'Inter',
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
