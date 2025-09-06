import DashboardContainer from '@/containers/DashboardContainer';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Ryvit - Dashboard',
};

const Home = () => {
  return <DashboardContainer />;
};

export default Home;
