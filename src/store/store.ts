import { configureStore } from '@reduxjs/toolkit';
import  { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook, } from 'react-redux';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom typed hooks to use across your app
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
