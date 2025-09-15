import getConfig from '../getConfig';
import { buildPayment } from './buildPayment';
import finalizeTransaction from '../finalizeTransaction';

const withdrawXlm = async (memo: string, amount: string, address: string) => {
  const { server, adminSecretKey, serverHorizon } = await getConfig('testnet');

  const tx = await buildPayment(
    process.env.NEXT_PUBLIC_RYVIT_WALLET as string,
    `w-${memo}`,
    amount,
    address,
  );

  tx.sign(adminSecretKey);

  const result = await serverHorizon.submitTransaction(tx);

  const finalize = await finalizeTransaction(result.hash, server);

  return {
    hash: result.hash,
    finalize,
  };
};

export default withdrawXlm;
