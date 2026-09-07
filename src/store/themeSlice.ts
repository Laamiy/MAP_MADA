import { createSlice, } from '@reduxjs/toolkit'
import type {  PayloadAction } from '@reduxjs/toolkit';
import type { MapTheme } from '@/types/map.theme.types';


interface ThemeState {currentTheme: MapTheme;}

const initialState: ThemeState = {
  currentTheme: 'dark',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<MapTheme>) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
