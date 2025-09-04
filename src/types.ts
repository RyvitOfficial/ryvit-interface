import { rpc } from '@stellar/stellar-sdk';

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

export interface IGetContractResponse {
  _id: string;
  name: string;
  address: string;
  datakeys: IDataKey[];
  liveLedger: number;
  network: 'testnet' | 'mainnet';
  events: [];
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
}

export interface ITransactionDetails {
  hash: string;
  created_at: number;
  values: any | undefined;
  status:
    | rpc.Api.GetTransactionStatus.FAILED
    | rpc.Api.GetTransactionStatus.SUCCESS
    | rpc.Api.GetTransactionStatus.NOT_FOUND;
  useValues: IValues[];
  useNames: string[];
}

export interface IResponseCreateTransactions {
  txExtend: string;
  useNames: string[];
  useValues: IValues[];
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
