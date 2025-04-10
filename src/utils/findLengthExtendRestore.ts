import { store } from '@/store';

import { IDataKey } from '@/types';

export const findLengthExtendRestore = (
  dataKeys: IDataKey[],
  selected: Record<string, string>[],
) => {
  const state = store.getState();
  const lastLedger = state.lastLedger.ledger;

  const selectedIds = selected.map((select) => select.id);
  const matchDataKeys = dataKeys.filter((key) => selectedIds.includes(key._id));

  let extendes = 0;
  let restores = 0;

  for (let i = 0; i < matchDataKeys.length; i++) {
    if (lastLedger < matchDataKeys[i].liveLedger) {
      extendes += 1;
    }

    if (lastLedger >= matchDataKeys[i].liveLedger) {
      restores += 1;
    }
  }

  return { extendes, restores };
};
