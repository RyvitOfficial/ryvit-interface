import DashboardContainer from '@/containers/DashboardContainer';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Ryvit - Dashboard',
};

const Dashboard = () => {
  return <DashboardContainer />;
};

export default Dashboard;
