import { IGetContractResponse } from '@/types';
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const generateEventSDK = (currentContract: IGetContractResponse) => {
  const events = currentContract.event.events.filter((e) => e.selected);
  const handlersString = currentContract.event.events
    .filter((e) => e.selected)
    .map((e) => `${e.name}: (data) => { console.log(data) }`)
    .join(',\n        ');

  const IEventString =
    events.length != 0
      ? ` ${'\n'}interface IEvent {
${events.map((e) => `    ${e.name}: I${capitalize(e.name)}Payload`).join('\n')}
} ${'\n'}`
      : '';

  const IBase =
    events
      .map(
        (e) => `
      ${'\n'}interface I${capitalize(e.name)}Payload extends IPayloadBase {
    value: ${e.valueType.split('|').join('|\n')};
    params: [${e.paramsType.join(', ')}];
}`,
      )
      .join('\n') + '\n';

  return `
import { eventSetup } from 'ryvit';
import { Application } from 'express';
import { rpc } from '@stellar/stellar-sdk';

interface IPayloadBase {
    event: rpc.Api.EventResponse,
    ledger: number,
    hash: string,
};${IBase}${IEventString}
const handleEvents = (app: Application) => {
  eventSetup<IEvent>(app, {
      route: '/example',
      publicKey: "Replace publickey"
      handlers: {
          ${handlersString}
      },
  });
}

export default handleEvents
`;
};

export default generateEventSDK;
