import CreateContractContainer from '../CreateContractContainer';
import DashboardStats from '../OverviewCard';
import RecentContract from '../RecentContract';

const DashboardContainer = () => {
  return (
    <div className="w-full h-full flex-grow flex flex-col items-start justify-start">
      <div className="w-full">
        <DashboardStats />
      </div>

      <div className="overflow-y-auto w-full h-full small:flex small:flex-col-reverse gap-4 mt-4 desktop:grid desktop:grid-cols-[2fr_22%] flex-grow">
        <div className="h-full">
          <RecentContract />
        </div>
        <div className="h-full">
          <CreateContractContainer />
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
