import { Horizon, rpc } from '@stellar/stellar-sdk';

export type NetworkType = 'testnet' | 'mainnet';

export interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
}

export interface ISignInFormData {
  email: string;
  password: string;
}

export interface IForgetPassword {
  email: string;
}

export interface IResetPassword {
  password: string;
  token: string;
}

export interface IResetPasswordForm {
  token: string;
  password: string;
}

export interface ApiResponse<T = any> {
  message: string;
  result?: T;
}

export interface IResponseSignIn {
  token?: string;
}

export interface AddContractFormData {
  name: string;
  contractId: string;
}

export interface ISettings {
  plan: number;
  autoExtend: boolean;
  limit: number;
}

export interface IEventStraucture {
  _id: string;
  name: string;
  selected: boolean;
  interfaceType: string;
  paramsType: string[];
  valueType: string;
  config: string;
}

export interface IContractEventConfig {
  _id: string;
  active: boolean;
  endpoint: string;
  privateKey: string;
  publickKey: string;
  user: string;
  endpointTest: string;
  lastSentLedger: number;
  contract: string;
  statusText?: string;
  network: 'testnet' | 'mainnet';
}

export interface IContractEventResponse {
  name: string;
  hash: string;
  ledger: number;
  isSend: boolean;
  endpoint: string;
  privateKey: string;
  value: any;
  params: any[];
  event: rpc.Api.EventResponse;
  realEvent: string;
  contractEventConfig: string;
  createdAt: string;
  _id: string;
}

interface IContractEvents {
  events: IEventStraucture[];
  eventConfig: IContractEventConfig;
  contractEvents: IContractEventResponse[];
}

export interface IGetContractResponse {
  _id: string;
  name: string;
  address: string;
  datakeys: IDataKey[];
  liveLedger: number;
  network: 'testnet' | 'mainnet';
  event: IContractEvents;
  functions: [];
  settings: ISettings;
  isProcessing: boolean;
}

export interface IFunctionValue {
  name: string;
  returnType: string;
  inputValue?: any;
  inputType?: string;
}

export interface IValue {
  noneValue?: undefined;
  functionValue?: IFunctionValue;
  listValue?: number[];
  rangeValue?: { min: number; max: number };
}

export interface IDataKey {
  _id: string;
  name: string;
  type: string;
  network: 'testnet' | 'mainnet';
  contract: string;
  value: string;
  key: string;
  liveLedger: number;
  autoExtend: boolean;
}

export interface IValues {
  value: string;
  key: string;
  liveLedger: number;
  autoSelect: boolean;
}

export type SvgProps = {
  fill?: string;
};

export interface ITransactionResult {
  id: string;
  successful: boolean;
  hash: string;
  created_at: string;
  fee_charged: string;
}

export interface IGeneratedToken {
  name: string;
  symbol: string;
  address: string;
}

interface IWalletTransaction {
  hash?: string;
  amount: number;
  user: string;
  network: NetworkType;
  type: 'deposit' | 'withdraw' | 'extend' | 'plan';
  createdAt: string;
}

export interface IUser {
  name: string;
  logo: string | undefined;
  email: string;
  address: string | undefined;
  isAdmin: boolean;
  balanceTest: number;
  balanceMain: number;
  isVerified: boolean;
  generatedToken: IGeneratedToken | undefined;
  contractsCount: number;
  detaKeysCount: number;
  dataKeysExpireSoonCount: number;
  memo: string;
  walletTransactions: IWalletTransaction[];
}

export interface ISendTransactionOptions {
  network?: string;
  isSoroban?: boolean;
}

export interface ISendTransactionBlux {
  (
    xdr: string,
    options: ISendTransactionOptions & {
      isSoroban: true;
    },
  ): Promise<rpc.Api.GetSuccessfulTransactionResponse>;
  (
    xdr: string,
    options?: ISendTransactionOptions & {
      isSoroban?: false;
    },
  ): Promise<Horizon.HorizonApi.SubmitTransactionResponse>;
}

export interface ITransactionDetails {
  hash: string;
  created_at: number;
  values: any | undefined;
  status:
    | rpc.Api.GetTransactionStatus.FAILED
    | rpc.Api.GetTransactionStatus.SUCCESS
    | rpc.Api.GetTransactionStatus.NOT_FOUND;
  fee: number;
}

export interface IResponseCreateTransactions {
  extend: string[];
  restore: string[];
}

export type SorobanType =
  | 'u32'
  | 'i32'
  | 'u64'
  | 'i64'
  | 'u128'
  | 'i128'
  | 'string'
  | 'symbol'
  | 'bool'
  | 'address'
  | 'bytes';

export type InputField = {
  name: string;
  label?: string;
  type: SorobanType;
  placeholder?: string;
  required?: boolean;
};

export type ContractFunction = {
  name: string;
  inputs: InputField[];
  description?: string;
};

export type ContractMeta = {
  id: string;
  label: string;
  functions: ContractFunction[];
};
