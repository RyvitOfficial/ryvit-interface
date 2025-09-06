'use client';

import { ReactNode } from 'react';
import BluxWrapper from './BluxWrapper';

export function Providers({ children }: { children: ReactNode }) {
  return <BluxWrapper>{children}</BluxWrapper>;
}
