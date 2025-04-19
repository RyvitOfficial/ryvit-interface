import { Api } from '@stellar/stellar-sdk/rpc';

import Toast from '@/components/Toasts';

import { buildPayment } from '@/utils/soroban/buildPayment';

import { InformExtendApi } from '@/api/informExtendApi';
import { InformCreateExtendApi } from '@/api/InformCreateExtendApi';
import { SendTransactionDetails } from '@/api/sendExtendDetails';

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
  walletAddress: string | null | undefined,
  token: string | null,
) => {
  if (method === 'ryvit') {
    const selectedDatakeysName = selectedKeys.map((key) => key.name);
    setIsOpen(false);
    setMethod(null);

    setLoadingTitle('Extending Data...');
    setLoadingIsOpen(true);

    await InformExtendApi({ dataKeys: selectedDatakeysName }, token!, id);

    setLoadingIsOpen(false);

    Toast({
      type: 'success',
      text: 'Extending your DataKeys...',
    });

    setClearTrigger((prev) => prev + 1);
  } else if (method === 'wallet') {
    if (walletAddress) {
      const selectedDatakeysName = selectedKeys.map((key) => key.name);
      setIsOpen(false);

      const payment = await buildPayment(walletAddress);

      const sendPaymentTx = (await sendTransaction(
        payment.toXDR(),
      )) as ITransactionResult;

      if (sendPaymentTx.successful) {
        setLoadingIsOpen(true);

        const res = await InformCreateExtendApi(
          { dataKeys: selectedDatakeysName, admin: walletAddress },
          token!,
          id,
        );

        setLoadingIsOpen(false);
        setClearTrigger((prev) => prev + 1);
        setMethod(null);

        if (res.result) {
          const txsDetails: ITransactionDetails[] = [];

          for (let i = 0; i < res.result.length; i++) {
            const resultTx = (await sendTransaction(
              res.result[i].txExtend,
            )) as ITransactionResult;

            txsDetails.push({
              hash: resultTx.hash,
              created_at: new Date(resultTx.created_at).getTime() / 1000,
              values: '',
              status: resultTx.successful
                ? Api.GetTransactionStatus.SUCCESS
                : Api.GetTransactionStatus.FAILED,
              useValues: res.result[i].useValues,
              useNames: res.result[i].useNames,
            });

            Toast({
              type: 'error',
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
      setIsOpen(false);
      login();
    }
    setMethod(null);
  }
};

export default ExtendTransactions;
