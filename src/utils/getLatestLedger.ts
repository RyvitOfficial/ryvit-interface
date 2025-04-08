import getConfig from './getConfig';

export const getLatestLedger = async () => {
  const { server } = await getConfig('testnet');
  const lastLedger = await server.getLatestLedger();

  return lastLedger.sequence;
};
