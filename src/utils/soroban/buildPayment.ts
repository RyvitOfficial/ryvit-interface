import { Account, Asset, Horizon, Operation } from '@stellar/stellar-sdk';
import baseTransaction from './baseTrasaction';

export const buildPayment = async (admin: string) => {
  const serverHorizon = new Horizon.Server(
    'https://horizon-testnet.stellar.org',
  );

  const accountResponse = await serverHorizon.loadAccount(admin);
  const adminUserH = new Account(admin, accountResponse.sequence);

  const paymentCall = Operation.payment({
    amount: '0.01',
    asset: Asset.native(),
    destination: 'GBYC7O7ZT2ZUMZCSBEK3LRHQPAXPCBXGFZMF56CCJ44MOIDB4KIESGCX',
    source: admin,
  });

  return await baseTransaction(adminUserH, paymentCall, 'testnet');
};
