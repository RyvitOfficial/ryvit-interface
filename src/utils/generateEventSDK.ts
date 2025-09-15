import { IGetContractResponse } from '@/types';

const generateEventSDK = (currentContract: IGetContractResponse) => {
  const iEventString = currentContract.event.events
    .filter((e) => e.selected)
    .map((e) => `${e.name}: IPayload`)
    .join('\n    ');

  const handlersString = currentContract.event.events
    .filter((e) => e.selected)
    .map((e) => `${e.name}: (data) => { console.log(data) }`)
    .join(',\n        ');

  return `
import { eventSetup } from 'ryvit';
import { Application } from 'express';
import { rpc } from '@stellar/stellar-sdk';


interface IPayload {
    event: rpc.Api.EventResponse,
    ledger: number,
    hash: string,
    value: any,
    params: any[]
};

interface IEvent {
    ${iEventString}
}

const handleEvents = (app: Application) => {
  eventSetup<IEvent>(app, {
      route: '/example',
      handlers: {
          ${handlersString}
      },
      publicKey: "Replace publickey"
  });
}

export default handleEvents
`;
};

export default generateEventSDK;
