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

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLogin = true;
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },

    logout: (state) => {
      state.isLogin = false;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = user.actions;
export default user.reducer;
