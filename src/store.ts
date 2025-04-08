'use client';

import user, { login } from '@/reducers/user';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

const rootReducer = combineReducers({
  user,
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
  }
  if (rememberMe === 'true') {
    if (token) {
      store.dispatch(login(token));
    }
  } else {
    document.cookie = 'rememberMe=; path=/; max-age=0';
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
