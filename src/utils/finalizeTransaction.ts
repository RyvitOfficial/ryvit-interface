import { rpc } from '@stellar/stellar-sdk';

const finalizeTransaction = async (hash: string, server: rpc.Server) => {
  for (let index = 0; index < 20; index++) {
    const tx = await server.getTransaction(hash);

    if (tx.status === 'SUCCESS') {
      return true;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return false;

  throw Error;
};

export default finalizeTransaction;
