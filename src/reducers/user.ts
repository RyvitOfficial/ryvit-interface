import { IGetContractResponse, IUser, NetworkType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLogin: boolean;
  token: string | null;
  details: IUser | null;
  user: string | null;
  contracts: IGetContractResponse[];
  network: NetworkType;
  isLoading: boolean;
}

const initialState: AuthState = {
  isLogin: false,
  token: null,
  details: null,
  user: null,
  contracts: [],
  isLoading: true,
  network: 'testnet',
};

function setCookie(name: string, value: string, days?: number) {
  let cookie = `${name}=${value}; path=/;`;
  if (days) {
    const maxAge = days * 24 * 60 * 60;
    cookie += ` max-age=${maxAge};`;
  }
  document.cookie = cookie;
}

function removeCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0;`;
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLogin = true;
      state.token = action.payload;
      setCookie('token', action.payload, 30);
    },

    logout: (state) => {
      state.isLogin = false;
      state.token = null;
      removeCookie('token');
      removeCookie('rememberMe');
    },

    setUserInfo: (state, action: PayloadAction<IUser>) => {
      state.details = action.payload;
    },

    setUserContracts: (
      state,
      action: PayloadAction<IGetContractResponse[]>,
    ) => {
      state.contracts = action.payload;
      state.isLoading = false;
    },

    setUserNetwork: (state, action: PayloadAction<NetworkType>) => {
      state.network = action.payload;
    },
  },
});

export const { login, logout, setUserInfo, setUserContracts, setUserNetwork } =
  user.actions;
export default user.reducer;
