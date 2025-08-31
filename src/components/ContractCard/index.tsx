'use client';

import Button from '../Button';
import { NetworkBadge } from '../NetworkBadge';
import { useRouter } from 'next/navigation';

import { NetworkType } from '@/types';
import {
  ContractStatusBadge,
  ContractStatusBadgeType,
} from '../ContractStatusBadge';

import { Delete, Event, EventList, TTL } from '@/assets';

interface ContractCardProps {
  name: string;
  address: string;
  functions: number;
  events: number;
  ttl: string;
  status: ContractStatusBadgeType;
  network: NetworkType;
  addedDate: string;
  icon?: React.ReactNode;
}

const ContractCard = ({
  name,
  address,
  functions,
  events,
  ttl,
  status,
  network,
  addedDate,
  icon,
}: ContractCardProps) => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(`/contracts/${path}/${address}`);
  };
  return (
    <div className="bg-bgblack rounded-xl p-4 flex flex-col gap-3 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 text-cyan-400">
            {icon || '◎'}
          </div>
          <div>
            <h3 className="text-base font-medium text-white">{name}</h3>
            <p className="text-xs text-txtgray font-jetbrains">{address}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ContractStatusBadge status={status} />
          <NetworkBadge network={network as NetworkType} />
        </div>
      </div>

      <div className="flex justify-start items-center gap-12 text-sm mt-2">
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Functions</p>
          <p className="font-medium text-white">{functions}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Events</p>
          <p className="font-medium text-white">{events}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-400">TTL</p>
          <p className="font-medium text-white">{ttl}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Added</p>
          <p className="font-medium text-white">{addedDate}</p>
        </div>
      </div>

      <div className="flex gap-2 mt-2 font-jetbrains">
        <Button
          color="black"
          rounded="sm"
          content="View Functions"
          logo={<Event />}
          onClick={() => handleNavigate('functions')}
        />
        <Button
          color="black"
          rounded="sm"
          content="Manage TTL"
          logo={<TTL />}
        />
        <Button
          color="black"
          rounded="sm"
          content="Events"
          logo={<EventList />}
        />
        <Button
          color="secondRed"
          rounded="sm"
          content="Remove"
          className="ml-auto !h-8"
          logo={<Delete fill="#F87171" />}
        />

        {/* <button className="flex items-center gap-1 px-3 py-1 ml-auto rounded-md bg-red-900 text-sm text-red-100 hover:bg-red-800">
          Remove
        </button> */}
      </div>
    </div>
  );
};

export default ContractCard;
