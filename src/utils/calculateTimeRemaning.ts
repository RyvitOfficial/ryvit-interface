import { store } from '@/store';

const calculateTimeRemaning = (liveLedger: number) => {
  const state = store.getState();

  const { ledger, close } = state.lastLedger;

  const remaning = (liveLedger - ledger) * close;
  const day = Math.round(remaning / 84600);
  const hour = Math.round((remaning % 84600) / 3600);
  return day < 0 && hour < 0 ? '0d 0h' : `${day}d ${hour}h`;
};

export default calculateTimeRemaning;
