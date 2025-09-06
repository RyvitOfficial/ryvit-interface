import Card from '../Card';
import OverviewField from './overviewField';

import calculateStatusContract from '@/utils/calculateStatusContract';

import { IDataKey } from '@/types';

interface OverviewProps {
  dataKeys: IDataKey[];
  selectedDataKeys: Record<string, string>[];
}

const Overview = ({ dataKeys, selectedDataKeys }: OverviewProps) => {
  const keys = selectedDataKeys.map((s) => s.key);

  const selected = dataKeys.filter((d) => keys.includes(d.key));

  const calculateFee =
    selected.length > 0 ? (146750 + 19350 * selected.length) / 10 ** 7 : 0;

  const needExpireCount = selected.filter(
    (s) => calculateStatusContract(s.liveLedger) !== 'expired',
  ).length;

  const needRestoreCount = selected.filter(
    (s) => calculateStatusContract(s.liveLedger) === 'expired',
  ).length;

  return (
    <Card
      bgColor="#121319"
      borderColor="transparent"
      className="!rounded-xl !overflow-hidden"
    >
      <div className="h-full flex flex-col">
        <div className="pt-4 desktopMax:pt-3 px-6">
          <h3 className="text-lg font-medium text-white">Overview</h3>
        </div>
        <div className="space-y-3 mt-5 px-4">
          <OverviewField title="DataKey" value={selected.length.toString()} />
          <OverviewField
            title="Extend/Restore"
            value={`${needExpireCount} / ${needRestoreCount}`}
          />
        </div>

        <div className="bg-input py-3 px-2 mt-4 rounded-t-xl desktopMax:mt-3 desktopMax:py-2 font-medium">
          <OverviewField
            title="Fee"
            value={`~ ${calculateFee} XLM`}
            type="white"
          />
        </div>
      </div>
    </Card>
  );
};

export default Overview;
