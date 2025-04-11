import freighterApi from '@stellar/freighter-api';
import { Transaction } from '@stellar/stellar-sdk';

const signTransaction = async (
  address: string,
  passPhrase: string,
  xdr: string,
) => {
  const signed = await freighterApi.signTransaction(xdr, {
    networkPassphrase: passPhrase,
    address,
  });

  return new Transaction(signed.signedTxXdr, passPhrase);
};

export default signTransaction;
