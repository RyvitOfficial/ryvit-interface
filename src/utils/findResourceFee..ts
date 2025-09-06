import { xdr } from '@stellar/stellar-sdk';

const findResourceFee = (transaction: string) => {
  const envelopeJson = JSON.stringify(
    xdr.TransactionEnvelope.fromXDR(transaction, 'base64'),
    null,
    2,
  );

  const envelopeObj = JSON.parse(envelopeJson);

  function walk(obj: any): number[] {
    let results: number[] = [];

    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (key === 'resourceFee' && obj[key]?._value) {
          results.push(Number(obj[key]._value));
        } else {
          results = results.concat(walk(obj[key]));
        }
      }
    }

    return results;
  }

  const allFees = walk(envelopeObj);

  return allFees.length > 1 ? allFees[1] : allFees[0];
};

export default findResourceFee;
