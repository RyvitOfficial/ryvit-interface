import { rpc, Horizon } from '@stellar/stellar-sdk';

import { NetworkType } from '@/types';

const getConfig = async (network: NetworkType) => {
  const BASE_FEE = '100000';
  const MAINNET_SOROBAN_RPC_URL = 'https://soroban-testnet.stellar.org';
  const TESTNET_SOROBAN_RPC_URL = 'https://soroban-testnet.stellar.org';

  const fee = BASE_FEE || '100000';

  if (network === 'mainnet') {
    const server = new rpc.Server(MAINNET_SOROBAN_RPC_URL);
    const serverHorizon = new Horizon.Server('https://horizon.stellar.org');

    return {
      fee,
      server,
      serverHorizon,
    };
  }

  const server = new rpc.Server(TESTNET_SOROBAN_RPC_URL);
  const serverHorizon = new Horizon.Server('https://horizon.stellar.org');

  return {
    fee,
    server,
    serverHorizon,
  };
};
export default getConfig;
