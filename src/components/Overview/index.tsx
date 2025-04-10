import Card from '../Card';
import OverviewField from './overviewField';

interface OverviewProps {
  plan: number;
  dataKeyLength: number;
  nextLedger: number;
  extendsRestores: { extendes: number; restores: number };
}

const Overview = ({
  plan,
  dataKeyLength,
  nextLedger,
  extendsRestores,
}: OverviewProps) => {
  const calculateFee =
    dataKeyLength > 0 ? (146750 + 19350 * dataKeyLength) / 10 ** 7 : 0;

  return (
    <Card
      bgColor="#fff"
      borderColor="#E9EAEB"
      className="!rounded-2xl !overflow-hidden"
    >
      <div className="h-full">
        <div className="pt-4 px-6">
          <h3 className="text-lg font-medium text-secondary">Overview</h3>
        </div>
        <div className="space-y-4 mt-5 px-6">
          <OverviewField title="Plan" value={`${plan} Month`} />
          <OverviewField title="DataKey" value={dataKeyLength.toString()} />
          <OverviewField title="Next Ledger" value={nextLedger.toString()} />
          <OverviewField
            title="Extend/Restore"
            value={`${extendsRestores.extendes} / ${extendsRestores.restores}`}
          />
        </div>

        <div className="bg-primary py-3 px-6 mt-4">
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
