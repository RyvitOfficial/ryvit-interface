'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import Button from '../Button';
import { NetworkBadge } from '../NetworkBadge';
import shortenAddress from '@/utils/shortenAddress';
import { TTLStatusBadge, TTLStatusType } from '../StatusBadge';

import { NetworkType } from '@/types';
import { Delete, EventList, Function, TTL } from '@/assets';
import { DeleteContract } from '@/api/DeleteContract';
import { useAppSelector } from '@/hooks/useRedux';
import DeleteContractModal from '@/containers/Modals/DeleteContractModal';
import { useState } from 'react';

interface ContractCardProps {
  name: string;
  address: string;
  functions: number;
  events: number;
  ttl: string;
  status: TTLStatusType;
  network: NetworkType;
  icon?: React.ReactNode;
  processing?: boolean;
  id: string;
}

const ContractCard = ({
  name,
  address,
  functions,
  events,
  ttl,
  status,
  network,
  icon,
  processing,
  id,
}: ContractCardProps) => {
  const [DeleteContractModalIsOpen, setDeleteContractModalIsOpen] =
    useState(false);
  const token = useAppSelector((state) => state.user.token);
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(`/${path}/${address}`);
  };

  const handleOpenModal = () => {
    setDeleteContractModalIsOpen(true);
  };

  const handleDeleteContract = async () => {
    await DeleteContract(token!, id);
    setDeleteContractModalIsOpen(false);
  };

  const handleOnClose = () => {
    setDeleteContractModalIsOpen(false);
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

      <div className="flex justify-start items-center gap-12 text-sm mt-2 px-2">
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Functions</p>
          <p className="font-medium text-white">{functions}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Events</p>
          <p className="font-medium text-white">{events}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-400">Entries</p>
          <p className="font-medium text-white">{ttl}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <Button
          color="black"
          rounded="sm"
          content="Call Functions"
          logo={<Function />}
          onClick={() => handleNavigate('function')}
        />
        <Button
          color="black"
          rounded="sm"
          content="Extend TTL"
          logo={<TTL />}
          onClick={() => handleNavigate('ttl')}
        />
        <Button
          color="black"
          rounded="sm"
          content="Watch Events"
          logo={<EventList />}
          onClick={() => handleNavigate('event')}
        />

        <div
          className="bg-[#EF4444]/20 hover:bg-[#EF4444]/30 flex items-center px-4 rounded-xl ml-auto cursor-pointer h-8"
          onClick={handleOpenModal}
        >
          <Delete fill="#F87171" />
        </div>
      </div>

      {processing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm z-10"
        >
          <motion.div
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
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-white/80 text-sm mt-2 text-center max-w-xs"
          >
            Sending data to the network. This may take a few seconds.
          </motion.p>
        </motion.div>
      )}

      <DeleteContractModal
        isOpen={DeleteContractModalIsOpen}
        onClose={handleOnClose}
        DeleteOnClick={handleDeleteContract}
      />
    </div>
  );
};

export default ContractCard;
