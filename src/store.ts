'use client';

import user, { login } from '@/reducers/user';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

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
  const rememberMe = localStorage.getItem('rememberMe');
  if (rememberMe && rememberMe === 'true') {
    const token = localStorage.getItem('token');
    if (token) {
      store.dispatch(login(token));
    } else {
      localStorage.removeItem('token');
    }
  } else {
    localStorage.removeItem('rememberMe');
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
