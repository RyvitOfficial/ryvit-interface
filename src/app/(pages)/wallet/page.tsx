import WalletContainer from '@/containers/WalletContainer';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Ryvit - Wallet',
};

const Wallet = () => {
  return <WalletContainer />;
};

export default Wallet;
