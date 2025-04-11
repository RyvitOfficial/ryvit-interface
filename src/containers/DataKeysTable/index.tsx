/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import Checkbox from '@/components/CheckBox';
import CircleProgress from '@/components/CircleProgressBar';

import { liveLedgerToPercentage } from '@/utils/liveLedgerToPercentage';

import { useAppSelector } from '@/hooks/useRedux';

import { IDataKey } from '@/types';

interface DataKeysTableProps {
  dataKeys: IDataKey[];
  onSelectionChange?: (selected: { id: string; name: string }[]) => void;
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
        .map((item) => ({ id: item._id, name: item.name }));
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
    <div className="p-5 bg-white rounded-[13px] border-2 border-border h-[100%] overflow-y-auto">
      <h2 className="text-lg font-semibold text-secondary mb-4">DataKeys</h2>
      <div className="border border-border rounded-xl ">
        <div className="grid grid-cols-[80px_2fr_1fr_1fr_1fr_1fr] items-center text-sm font-medium text-[#272833] border-b py-3 px-4 bg-[#f7f7f7]">
          <div>
            <Checkbox
              checked={isAllSelected}
              onChange={toggleSelectAll}
              value="select"
            />
          </div>
          <div>Name</div>
          <div>Subscribe</div>
          <div>Live Ledger</div>
          <div>Values</div>
          <div>Expired</div>
        </div>

        {dataKeys.map((item) => {
          const isSelected = selected.includes(item._id);
          return (
            <div
              key={item._id}
              className={`grid grid-cols-[80px_2fr_1fr_1fr_1fr_1fr] items-center text-sm text-gray-700 border-b last:border-b-0 p-4 ${
                isSelected ? 'bg-blue-50' : ''
              }`}
            >
              <div>
                <Checkbox
                  checked={isSelected}
                  onChange={() => toggleSelection(item._id)}
                  value={item._id}
                  type="secondary"
                />
              </div>
              <div>{item.name}</div>
              <div>{item.values ? item.values.length : 1}</div>
              <div>{item.liveLedger}</div>
              <div>
                <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-md">
                  {item.valuesType}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  {liveLedgerToPercentage(item.liveLedger, lastLedger)}%
                </span>
                <CircleProgress
                  size={25}
                  strokeWidth={3}
                  percentage={liveLedgerToPercentage(
                    item.liveLedger,
                    lastLedger,
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
