import { Add, Charge, Event, Time } from '@/assets';
import ActionCard from '@/components/ActionCard';

const QuickActions = () => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <ActionCard
        icon={<Add fill="#60A5FA" />}
        label="Add Contract"
        description="Deploy new smart contract"
        iconBg="#23385C"
        bg="#1D2536"
        borderColor="#3B82F6"
      />
      <ActionCard
        icon={<Time fill="#C084FC" />}
        label="Manage TTL"
        description="Extend contract lifetime"
        bg="#282136"
        iconBg="#422B5D"
        borderColor="#A855F7"
      />
      <ActionCard
        icon={<Event fill="#4ADE80" />}
        label="Watch Events"
        description="Monitor contract activity"
        bg="#1B2C27"
        iconBg="#1C4B32"
        borderColor="#22C55E"
      />
      <ActionCard
        icon={<Charge fill="#FACC15" />}
        label="Recharge"
        description="Add XLM to wallet"
        iconBg="#EAB30833"
        bg="#2F2A1E"
        borderColor="#EAB308"
      />
    </div>
  );
};

export default QuickActions;
