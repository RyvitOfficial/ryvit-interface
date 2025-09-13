'use client';

import user, { login, logout, setUserInfo } from '@/reducers/user';
import lastLedger from '@/reducers/lastLedger';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { GetTokenIsValid } from './api/getUser';
import { IUser } from './types';

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

const rootReducer = combineReducers({
  user,
  lastLedger,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

if (typeof window !== 'undefined') {
  const rememberMe = getCookie('rememberMe');
  const token = getCookie('token');

  if (token && rememberMe === 'true') {
    GetTokenIsValid(token).then((res) => {
      if (res.result) {
        store.dispatch(login(token));
        store.dispatch(setUserInfo(res.result as IUser));
      } else {
        store.dispatch(logout());
      }
    });
  } else {
    document.cookie = 'rememberMe=; path=/; max-age=0';
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
