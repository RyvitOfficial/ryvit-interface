import {
  xdr,
  Account,
  Networks,
  Operation,
  TransactionBuilder,
  SorobanDataBuilder,
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
  keys?: xdr.LedgerKey[],
  type?: 'extend' | 'restore',
) => {
  const { fee } = await getConfig(network);

  let transaction = new TransactionBuilder(admin, {
    fee,
    networkPassphrase: Networks.TESTNET,
  });

  if (keys) {
    if (type === 'extend') {
      transaction = transaction.setSorobanData(
        new SorobanDataBuilder().setFootprint(keys).build(),
      );
    } else {
      transaction = transaction.setSorobanData(
        new SorobanDataBuilder().setReadWrite(keys).build(),
      );
    }
  }

  transaction = transaction.addOperation(call);

  transaction = transaction.addMemo(Memo.text('Manage TTL https://ryvit.app'));

  transaction = transaction.setTimeout(0);

  const transactionBuild = transaction.build();

  return transactionBuild;
};
export default baseTransaction;
