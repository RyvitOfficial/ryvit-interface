import { useAppSelector } from '@/hooks/useRedux';

const LastLedgerCard = () => {
  const lastLedger = useAppSelector((state) => state.lastLedger.ledger);

  return (
    <div className="Ledger flex justify-center h-14 shadow-md items-center space-x-2 bg-bgblack2 rounded-xl pl-4 overflow-hidden desktopMax:text-sm">
      <div className="flex items-center space-x-2">
        <div className="bg-green-500 h-[9px] w-[9px] rounded-full animate-pulse"></div>
        <span className="text-white text-sm font-medium font-jetbrains">
          Last Ledger
        </span>
      </div>
      <div className="flex justify-center items-center h-full min-w-[80px]">
        <span className="text-base text-blue-500 font-jetbrains font-bold">
          {lastLedger}
        </span>
      </div>
    </div>
  );
};

export default LastLedgerCard;
