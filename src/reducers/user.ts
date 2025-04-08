import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLogin: boolean;
  token: string | null;
  user: string | null;
}

const initialState: AuthState = {
  isLogin: false,
  token: null,
  user: null,
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
  },
});

export const { login, logout } = user.actions;
export default user.reducer;
