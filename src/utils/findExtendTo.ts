import { rpc } from '@stellar/stellar-sdk';

const findExtendTo = (tx: rpc.Api.GetSuccessfulTransactionResponse) => {
  const metaJson = JSON.stringify(tx.resultMetaXdr.value(), null, 2);

  const metaObj = JSON.parse(metaJson);

  function findLiveUntilLedgerSeq(obj: any): number[] {
    let results: number[] = [];

    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (key === 'liveUntilLedgerSeq') {
          results.push(Number(obj[key]));
        } else {
          results = results.concat(findLiveUntilLedgerSeq(obj[key]));
        }
      }
    }

    return results;
  }

  const allLiveUntil = findLiveUntilLedgerSeq(metaObj);

  return allLiveUntil.length > 1 ? allLiveUntil[1] : allLiveUntil[0];
};

export default findExtendTo;
