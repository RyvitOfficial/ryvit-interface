export const liveLedgerToPercentage = (
  liveLedger: number,
  lastLedger: number,
) => {
  const percentage = Math.round((lastLedger * 100) / liveLedger);
  return percentage > 100 ? 100 : percentage;
};
