import { IDataKey } from '@/types';

export const CalculateSubscribeLength = (
  dataKeys: IDataKey[],
  selected: Record<string, string>[],
) => {
  const selectedIds = selected.map((select) => select.id);
  const matchDataKeys = dataKeys.filter((key) => selectedIds.includes(key._id));

  const subscribeDataKeys = matchDataKeys.map((key) =>
    key.values ? key.values.length : 1,
  );

  return subscribeDataKeys.reduce((a, b) => a + b, 0);
};
