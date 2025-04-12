import Link from 'next/link';

import CardItem from '@/components/CardItem';

import shortenAddress from '@/utils/shortenAddress';

import { Crypto } from '@/assets';

interface IContractListItem {
  contractAddress: string;
  contractName: string;
  timeToLeave: string;
  manageHref: string;
  iconColor: string;
}

const ContractListItem = ({
  contractAddress,
  contractName,
  timeToLeave,
  manageHref,
  iconColor,
}: IContractListItem) => {
  return (
    <div className="flex items-center w-full bg-white rounded-[20px] py-3 px-6 border border-border">
      <div className="bg-[#F7F7F7] p-3 rounded-2xl mr-12 flex justify-center items-center">
        <Crypto fill={iconColor} />
      </div>
      <div className="flex justify-between items-center w-full">
        <CardItem title="Name" content={contractName} />
        <CardItem
          title="Address"
          content={shortenAddress(contractAddress, 8)}
        />
        <CardItem title="Time To Live" content={timeToLeave} />
        <Link
          href={manageHref}
          className="text-[#1814F3] text-[14px] font-medium mr-10"
        >
          Manage
        </Link>
      </div>
    </div>
  );
};

export default ContractListItem;
