'use client';

import AccountIdenticon from '@/components/AccountIdenticon';
import ContractCard from '@/components/ContractCard';

import { IGetContractResponse } from '@/types';
import calculateStatusContract from '@/utils/calculateStatusContract';

interface ContractListProps {
  search: string;
  data: IGetContractResponse[];
}

export default function ContractList({ search, data }: ContractListProps) {
  const filtered = data.filter(
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
            functions={c.functions.length}
            events={c.events.length}
            ttl={c.datakeys.length.toString()}
            status={calculateStatusContract(c.liveLedger)}
            network={c.network}
            // addedDate={c.addedDate}
            icon={<AccountIdenticon address={c.address} size={18} />}
            processing={c.isProcessing}
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
