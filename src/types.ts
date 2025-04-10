export type NetworkType = 'testnet' | 'mainnet';

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export interface SignInFormData {
  email: string;
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
  settings: ISettings;
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
  value: IValue;
  liveLedger: number;
  network: 'testnet' | 'mainnet';
  contract: string;
  valuesType: 'range' | 'list' | 'function' | 'none';
  values?: string[] | number[];
}

export type SvgProps = {
  fill?: string;
};
