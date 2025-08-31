'use client';

import ContractCard from '@/components/ContractCard';
import { ContractStatusBadgeType } from '@/components/ContractStatusBadge';
import { NetworkType } from '@/types';

interface ContractListProps {
  search: string;
}

const contracts = [
  {
    name: 'Wagent',
    address: 'CABC123...DEF456',
    functions: 8,
    events: 3,
    ttl: '15d',
    status: 'active',
    network: 'testnet',
    addedDate: '2024-01-20',
    icon: '',
  },
  {
    name: 'Token DGS',
    address: 'CAFS1LK...DFRT3',
    functions: 4,
    events: 2,
    ttl: '57d',
    status: 'active',
    network: 'testnet',
    addedDate: '2024-01-20',
    icon: '',
  },
  {
    name: 'FLuxity',
    address: 'CDLZFC3...XYZ123',
    functions: 12,
    events: 5,
    ttl: '120d',
    status: 'inactive',
    network: 'mainnet',
    addedDate: '2024-01-15',
    icon: '',
  },
  {
    name: 'ABS',
    address: 'CDLZFC3...XYZ123',
    functions: 12,
    events: 5,
    ttl: '120d',
    status: 'inactive',
    network: 'mainnet',
    addedDate: '2024-01-15',
    icon: '',
  },
];

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
            icon={c.icon}
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
