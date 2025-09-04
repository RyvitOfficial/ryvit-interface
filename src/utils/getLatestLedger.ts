import { store } from '@/store';

import getConfig from './getConfig';
import { setCloseLedger, setLastLedger } from '@/reducers/lastLedger';

export const getLatestLedger = async () => {
  const dispatch = store.dispatch;

  const { server, serverHorizon } = await getConfig('testnet');
  const lastLedger = await server.getLatestLedger();

  const ledgers = await serverHorizon.ledgers().order('desc').limit(2).call();
  const [latest, previous] = ledgers.records;

  const t1 = new Date(latest.closed_at).getTime();
  const t2 = new Date(previous.closed_at).getTime();
  const diff = (t1 - t2) / 1000;

  dispatch(setCloseLedger(diff));

  dispatch(setLastLedger(lastLedger.sequence));

  return lastLedger.sequence;
};
