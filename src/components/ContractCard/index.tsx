'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import Button from '../Button';
import { NetworkBadge } from '../NetworkBadge';
import shortenAddress from '@/utils/shortenAddress';
import { TTLStatusBadge, TTLStatusType } from '../StatusBadge';

import { NetworkType } from '@/types';
import { Delete, Event, EventList, TTL } from '@/assets';

interface ContractCardProps {
  name: string;
  address: string;
  functions: number;
  events: number;
  ttl: string;
  status: TTLStatusType;
  network: NetworkType;
  addedDate?: string;
  icon?: React.ReactNode;
  processing?: boolean;
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
  processing,
}: ContractCardProps) => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(`/contracts/${path}/${address}`);
  };

  return (
    <div className="bg-bgblack rounded-xl p-4 flex flex-col gap-3 shadow-md relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-md text-cyan-400">
            {icon || '◎'}
          </div>
          <div>
            <h3 className="text-base font-medium text-white">{name}</h3>
            <p className="text-xs text-txtgray font-jetbrains">
              {shortenAddress(address)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TTLStatusBadge status={status} />
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
          onClick={() => handleNavigate('function')}
        />
        <Button
          color="black"
          rounded="sm"
          content="Manage TTL"
          logo={<TTL />}
          onClick={() => handleNavigate('ttl')}
        />
        <Button
          color="black"
          rounded="sm"
          content="Events"
          logo={<EventList />}
          onClick={() => handleNavigate('event')}
        />
        <Button
          color="secondRed"
          rounded="sm"
          content="Remove"
          className="ml-auto !h-8"
          logo={<Delete fill="#F87171" />}
        />
      </div>

      {processing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm z-50"
        >
          <motion.p
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-white text-xl font-medium flex items-center gap-2"
          >
            Adding your contract
            <motion.div className="flex space-x-1 mt-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    delay: i * 0.2,
                  }}
                  className="block w-2 h-2 bg-white rounded-full"
                />
              ))}
            </motion.div>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-white/80 text-sm mt-2 text-center max-w-xs text-sm"
          >
            Sending data to the network. This may take a few seconds.
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

export default ContractCard;
