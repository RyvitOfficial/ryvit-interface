/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import Checkbox from '@/components/CheckBox';

import { IDataKey } from '@/types';
import { TTLStatusBadge } from '@/components/StatusBadge';
import CSwitch from '@/components/Switch';
import ProgressBar from '@/components/ProgressBar';

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

  // const lastLedger = useAppSelector((state) => state.lastLedger.ledger);

  const isAllSelected = selected.length === dataKeys.length;

  useEffect(() => {
    if (onSelectionChange) {
      const selectedData = dataKeys
        .filter((item) => selected.includes(item._id))
        .map((item) => ({
          id: item._id,
          name: item.name,
          status: item.status,
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
                  label={item.name}
                />
              </div>

              {/* expires */}
              <div className="text-white">{item.expiresAt}</div>

              {/* time remaining */}
              <div className="flex items-center gap-2">
                <div className="w-36">
                  <ProgressBar
                    label="2d 12h"
                    percent={45}
                    status={item.status}
                  />
                </div>
                {/* <span className="text-txtgray text-sm">
                  {item.timeRemaining}
                </span> */}
              </div>

              {/* status */}
              <div>
                <TTLStatusBadge status={item.status} />
              </div>

              <div className="text-white">{item.liveLedger}</div>

              {/* auto renew */}
              <div>
                <CSwitch checked={item.autoRenew} onChange={() => {}} />
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
