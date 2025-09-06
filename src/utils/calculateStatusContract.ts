import { store } from '@/store';
import { liveLedgerToPercentage } from './liveLedgerToPercentage';

const calculateStatusContract = (
  ledger: number,
): 'expired' | 'near_expiry' | 'active' => {
  const state = store.getState();
  const lastLedger = state.lastLedger.ledger;
  const percentage = liveLedgerToPercentage(ledger, lastLedger);

  return lastLedger > ledger
    ? 'expired'
    : percentage > 85
    ? 'near_expiry'
    : 'active';
};

export default calculateStatusContract;
