import { Account, Asset, Horizon, Operation } from '@stellar/stellar-sdk';
import baseTransaction from './baseTrasaction';

export const buildPayment = async (admin: string) => {
  const serverHorizon = new Horizon.Server(
    'https://horizon-testnet.stellar.org',
  );

  const accountResponse = await serverHorizon.loadAccount(admin);
  const adminUserH = new Account(admin, accountResponse.sequence);

  const paymentCall = Operation.payment({
    amount: '0.09',
    asset: Asset.native(),
    destination: process.env.NEXT_PUBLIC_RYVIT_WALLET as string,
    source: admin,
  });

  return await baseTransaction(adminUserH, paymentCall, 'testnet');
};
