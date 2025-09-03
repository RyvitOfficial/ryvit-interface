'use client';

import { ContractStatusBadgeType } from '@/components/ContractStatusBadge';
import AccountIdenticon from '@/components/AccountIdenticon';
import ContractCard from '@/components/ContractCard';

import { contracts } from '@/constants/options';

import shortenAddress from '@/utils/shortenAddress';

import { NetworkType } from '@/types';

interface ContractListProps {
  search: string;
}

export default function ContractList({ search }: ContractListProps) {
  const filtered = contracts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      {filtered.length > 0 ? (
        filtered.map((c, i) => (
          <ContractCard
            key={i}
            name={c.name}
            address={c.address}
            functions={c.functions}
            events={c.events}
            ttl={c.ttl}
            status={c.status as ContractStatusBadgeType}
            network={c.network as NetworkType}
            addedDate={c.addedDate}
            icon={<AccountIdenticon address={c.address} size={18} />}
          />
        ))
      ) : (
        <div className="col-span-2 text-center text-gray-400 mt-4">
          No contracts found
        </div>
      )}
    </div>
  );
}
