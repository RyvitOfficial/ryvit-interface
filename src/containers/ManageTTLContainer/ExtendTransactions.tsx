import { Api } from '@stellar/stellar-sdk/rpc';
import { rpc } from '@stellar/stellar-sdk';

import Toast from '@/components/Toasts';

import { InformExtendApi } from '@/api/informExtendApi';
import { InformCreateExtendApi } from '@/api/InformCreateExtendApi';
import { SendTransactionDetails } from '@/api/sendExtendDetails';

import { buildPayment } from '@/utils/soroban/buildPayment';
import getConfig from '@/utils/getConfig';
import findExtendTo from '@/utils/findExtendTo';

import { ITransactionDetails, ITransactionResult } from '@/types';

const ExtendTransactions = async (
  method: string | null,
  selectedKeys: Record<string, string>[],
  id: string,
  setClearTrigger: (_: (_: number) => number) => void,
  setIsOpen: (_: boolean) => void,
  setLoadingIsOpen: (_: boolean) => void,
  setMethod: (_: string | null) => void,
  setLoadingTitle: (_: string) => void,
  sendTransaction: (_: string) => Promise<unknown>,
  login: () => void,
  setWaitConnectWallet: (_: boolean) => void,
  waitConnectWallet: boolean,
  walletAddress: string | null | undefined,
  token: string | null,
) => {
  if (waitConnectWallet) {
    setWaitConnectWallet(false);
  }

  if (method === 'ryvit') {
    const selectedDatakeys = selectedKeys.map((key) => key.key);

    setIsOpen(false);
    setMethod(null);

    setLoadingTitle('Extending Data...');
    setLoadingIsOpen(true);

    await InformExtendApi({ keys: selectedDatakeys }, token!, id);

    setLoadingIsOpen(false);

    Toast({
      type: 'loading',
      text: 'Extending your DataKeys...',
    });

    setClearTrigger((prev) => prev + 1);
  } else if (method === 'wallet') {
    if (walletAddress) {
      const { server } = await getConfig('testnet');

      const selectedDatakeys = selectedKeys.map((key) => key.key);
      setIsOpen(false);

      const payment = await buildPayment(walletAddress);

      const sendPaymentTx = (await sendTransaction(
        payment.toXDR(),
      )) as ITransactionResult;

      if (sendPaymentTx.successful) {
        setLoadingIsOpen(true);

        const res = await InformCreateExtendApi(
          { keys: selectedDatakeys, admin: walletAddress },
          token!,
          id,
        );

        setLoadingIsOpen(false);
        setClearTrigger((prev) => prev + 1);
        setMethod(null);

        if (res.result) {
          const resTx = [...res.result.extend, ...res.result.restore];

          const txsDetails: ITransactionDetails[] = [];

          for (let i = 0; i < resTx.length; i++) {
            const tx = await sendTransaction(resTx[i]);

            const resultTx = tx as ITransactionResult;
            const details = await server.getTransaction(resultTx.hash);

            txsDetails.push({
              hash: resultTx.hash,
              created_at: new Date(resultTx.created_at).getTime() / 1000,
              values: findExtendTo(
                details as rpc.Api.GetSuccessfulTransactionResponse,
              ),
              status: resultTx.successful
                ? Api.GetTransactionStatus.SUCCESS
                : Api.GetTransactionStatus.FAILED,
              fee: Number(resultTx.fee_charged),
            });

            Toast({
              type: 'success',
              text: 'DataKeys were successfully extended.',
            });
          }

          await SendTransactionDetails(txsDetails, token!, id);
        } else {
          Toast({
            type: 'error',
            text: 'error',
          });
        }
      }
    } else {
      setWaitConnectWallet(true);
      setIsOpen(false);
      login();
    }
    setMethod(null);
  }
};

export default ExtendTransactions;
