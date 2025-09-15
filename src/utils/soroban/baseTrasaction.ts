import {
  xdr,
  Account,
  Networks,
  Operation,
  TransactionBuilder,
  Memo,
} from '@stellar/stellar-sdk';

import getConfig from '../getConfig';
import { NetworkType } from '@/types';

const baseTransaction = async (
  admin: Account,
  call:
    | xdr.Operation<Operation.ExtendFootprintTTL>
    | xdr.Operation<Operation.RestoreFootprint>
    | xdr.Operation<Operation.Payment>,
  network: NetworkType,
  memo?: string,
) => {
  const { fee } = await getConfig(network);

  let transaction = new TransactionBuilder(admin, {
    fee,
    networkPassphrase: Networks.TESTNET,
  });

  transaction = transaction.addOperation(call);

  transaction = transaction.addMemo(
    Memo.text(memo ? memo : 'Manage TTL https://ryvit.app'),
  );

  transaction = transaction.setTimeout(0);

  const transactionBuild = transaction.build();

  return transactionBuild;
};
export default baseTransaction;
