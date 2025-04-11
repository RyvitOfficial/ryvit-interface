'use client';

import user, { login, logout, setUserInfo } from '@/reducers/user';
import lastLedger from '@/reducers/lastLedger';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { GetTokenIsValid } from './api/getUser';

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

  if (token) {
    store.dispatch(login(token));

    GetTokenIsValid(token).then((res) => {
      if (res) {
        store.dispatch(setUserInfo(res));
        store.dispatch(login(token));
      } else {
        store.dispatch(logout());
      }
    });
  }

  if (rememberMe === 'true') {
    if (token) {
      store.dispatch(login(token));

      GetTokenIsValid(token).then((res) => {
        if (res) {
          store.dispatch(setUserInfo(res));
          store.dispatch(login(token));
        } else {
          store.dispatch(logout());
        }
      });
    }
  } else {
    document.cookie = 'rememberMe=; path=/; max-age=0';
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
