import Card from '@/components/Card';
import DashboardStats from '../OverviewCard';
import QuickActions from '../QuickActions';
import WalletBalanceCard from '../WalletBalanceCard';

const DashboardContainer = () => {
  return (
    <div className="w-full h-full flex-grow flex flex-col items-start justify-start px-6 gap-6">
      <div className="w-full">
        <DashboardStats />
      </div>

      <Card bgColor="bgblack" borderColor="#3741514D" className="p-5 w-full">
        <h2 className="text-white font-bold pb-4">Quick Actions</h2>
        <div className="w-full">
          <QuickActions />
        </div>
      </Card>

      <WalletBalanceCard />
    </div>
  );
};

export default DashboardContainer;
