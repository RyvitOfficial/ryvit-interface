import {
  xdr,
  Account,
  Networks,
  Operation,
  TransactionBuilder,
} from '@stellar/stellar-sdk';

import getConfig from '../getConfig';

const baseTransaction = async (
  admin: Account,
  call: xdr.Operation<Operation.Payment>,
  network: 'testnet',
) => {
  const { fee } = await getConfig(network);

  let transaction = new TransactionBuilder(admin, {
    fee,
    networkPassphrase: Networks.TESTNET,
  });

  transaction = transaction.addOperation(call);

  transaction = transaction.setTimeout(30);
  const transactionBuild = transaction.build();

  return transactionBuild;
};
export default baseTransaction;
