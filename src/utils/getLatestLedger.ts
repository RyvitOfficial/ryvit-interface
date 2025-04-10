import { store } from '@/store';
import getConfig from './getConfig';
import { set } from '@/reducers/lastLedger';

export const getLatestLedger = async () => {
  const dispatch = store.dispatch;

  const { server } = await getConfig('testnet');
  const lastLedger = await server.getLatestLedger();

  dispatch(set(lastLedger.sequence));

  return lastLedger.sequence;
};
