import Card from '../Card';
import OverviewField from './overviewField';

interface OverviewProps {
  dataKeyLength: number;
  extendsRestores: { extendes: number; restores: number };
}

const Overview = ({ dataKeyLength, extendsRestores }: OverviewProps) => {
  const calculateFee =
    dataKeyLength > 0 ? (146750 + 19350 * dataKeyLength) / 10 ** 7 : 0;

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
        <div className="space-y-3 desktopMax:space-y-2 mt-5 desktopMax:mt-3 px-6">
          <OverviewField title="DataKey" value={dataKeyLength.toString()} />
          <OverviewField
            title="Extend/Restore"
            value={`${extendsRestores.extendes} / ${extendsRestores.restores}`}
          />
        </div>

        <div className="bg-input py-3 px-6 mt-4 rounded-t-xl desktopMax:mt-3 desktopMax:py-2 font-medium">
          <OverviewField
            title="Fee"
            value={`~ ${calculateFee} XLM`}
            type="white"
          />
        </div>
        {/* 
        <div className="text-sm my-4 px-6">
          <p className="text-yellow-600">Restore TTL (1 selected)</p>
          <p className="text-primary">Enable Auto-Renew (3 selected)</p>
        </div> */}
      </div>
    </Card>
  );
};

export default Overview;
