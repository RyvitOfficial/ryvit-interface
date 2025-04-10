export const liveLedgerToPercentage = (
  liveLedger: number,
  lastLedger: number,
) => {
  return Math.round((lastLedger * 100) / liveLedger);
};
