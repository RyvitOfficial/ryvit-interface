import { NetworkType } from '@/types';
import { Horizon, Keypair, rpc } from '@stellar/stellar-sdk';

const getConfig = async (network: NetworkType) => {
  const BASE_FEE = '100000';
  const MAINNET_SOROBAN_RPC_URL = 'https://soroban-testnet.stellar.org';
  const TESTNET_SOROBAN_RPC_URL = 'https://soroban-testnet.stellar.org';
  const ADMIN_SECRET_KEY = process.env
    .NEXT_PUBLIC_RYVIT_SECRET_WALLET as string;
  const MAINNET_HORIZON_URL = 'https://horizon.stellar.org/';
  const TESTNET_HORIZON_URL = 'https://horizon-testnet.stellar.org/';

  if (network === 'mainnet') {
    const server = new rpc.Server(MAINNET_SOROBAN_RPC_URL);
    const adminSecretKey = Keypair.fromSecret(ADMIN_SECRET_KEY);
    const serverHorizon = new Horizon.Server(MAINNET_HORIZON_URL);
    const admin = await server.getAccount(adminSecretKey.publicKey());

    return {
      fee: BASE_FEE,
      admin,
      server,
      serverHorizon,
      adminSecretKey,
    };
  }

  const server = new rpc.Server(TESTNET_SOROBAN_RPC_URL);
  const adminSecretKey = Keypair.fromSecret(ADMIN_SECRET_KEY);
  const serverHorizon = new Horizon.Server(TESTNET_HORIZON_URL);
  const admin = await server.getAccount(adminSecretKey.publicKey());

  return {
    fee: BASE_FEE,
    admin,
    server,
    serverHorizon,
    adminSecretKey,
  };
};
export default getConfig;
