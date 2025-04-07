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

export type SvgProps = {
  fill?: string;
};
