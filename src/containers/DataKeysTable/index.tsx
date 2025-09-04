/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import CSwitch from '@/components/Switch';
import Checkbox from '@/components/CheckBox';
import ProgressBar from '@/components/ProgressBar';
import { TTLStatusBadge } from '@/components/StatusBadge';

import { liveLedgerToPercentage } from '@/utils/liveLedgerToPercentage';
import calculateStatusContract from '@/utils/calculateStatusContract';
import calculateTimeRemaning from '@/utils/calculateTimeRemaning';
import shortenAddress from '@/utils/shortenAddress';

import { useAppSelector } from '@/hooks/useRedux';

import { IDataKey } from '@/types';

interface DataKeysTableProps {
  dataKeys: IDataKey[];
  onSelectionChange?: (
    selected: { id: string; name: string; status: string }[],
  ) => void;
  clearTrigger: number;
}

export const DataKeysTable = ({
  dataKeys,
  onSelectionChange,
  clearTrigger,
}: DataKeysTableProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const lastLedger = useAppSelector((state) => state.lastLedger.ledger);

  const isAllSelected = selected.length === dataKeys.length;

  useEffect(() => {
    if (onSelectionChange) {
      const selectedData = dataKeys
        .filter((item) => selected.includes(item._id))
        .map((item) => ({
          id: item._id,
          name: item.name,
          status: 'expired',
        }));
      onSelectionChange(selectedData);
    }
  }, [selected]);

  useEffect(() => {
    setSelected([]);
  }, [clearTrigger]);

  const toggleSelection = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    const newSelected = isAllSelected ? [] : dataKeys.map((item) => item._id);
    setSelected(newSelected);
  };

  return (
    <div className="py-5 bg-bgblack rounded-xl h-full overflow-y-auto">
      <h2 className="text-xl font-semibold text-white mb-4 px-6 py-2">
        Data Keys
      </h2>
      <div className="overflow-y-auto ">
        {/* header */}
        <div className="grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr_1fr] text-base desktopMax:text-sm font-medium text-txtgray bg-bgblack2/40 px-8 py-6 border-t border-border5 sticky top-0 w-full z-10">
          <div>Key Name</div>
          <div>Expires</div>
          <div>Time Remaining</div>
          <div>Status</div>
          <div>Live Ledger</div>
          <div>Auto-Renew</div>
        </div>

        {/* rows */}
        {dataKeys.map((item) => {
          const isSelected = selected.includes(item._id);
          return (
            <div
              key={item._id}
              className={`grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr_1fr] text-sm items-center px-8 py-[18px] border-b border-border5 ${
                isSelected ? 'bg-input' : 'bg-transparent'
              }`}
            >
              {/* name */}
              <div className="text-white font-jetbrains flex gap-2">
                <Checkbox
                  checked={isSelected}
                  onChange={() => toggleSelection(item._id)}
                  value={item._id}
                  type="secondary"
                  label={
                    `${item.name} ${item.value}`.length > 18
                      ? `${item.name} ${shortenAddress(item.value, 4)}`
                      : `${item.name} ${item.value}`
                  }
                />
              </div>

              {/* expires */}
              <div className="text-white">
                {calculateTimeRemaning(item.liveLedger)}
              </div>

              {/* time remaining */}
              <div className="flex items-center gap-2">
                <div className="w-36">
                  <ProgressBar
                    label={
                      (
                        100 -
                        liveLedgerToPercentage(item.liveLedger, lastLedger)
                      ).toString() + '%'
                    }
                    percent={liveLedgerToPercentage(
                      item.liveLedger,
                      lastLedger,
                    )}
                    status={calculateStatusContract(item.liveLedger)}
                  />
                </div>
              </div>

              {/* status */}
              <div>
                <TTLStatusBadge
                  status={calculateStatusContract(item.liveLedger)}
                />
              </div>

              <div className="text-white">{item.liveLedger}</div>

              {/* auto renew */}
              <div>
                <CSwitch checked={item.autoExtend} onChange={() => {}} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2 pl-4 mt-4">
        <Checkbox
          checked={isAllSelected}
          onChange={toggleSelectAll}
          value="select"
          type="secondary"
        />
        <span className="text-white text-xs font-jetbrains">select all</span>
      </div>
    </div>
  );
};
