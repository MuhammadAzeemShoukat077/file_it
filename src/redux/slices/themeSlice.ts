import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  btnLoader: boolean;
}

const initialState: ThemeState = {
  btnLoader: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setBtnLoader: (state, action: PayloadAction<boolean>) => {
      state.btnLoader = action.payload;
    },
  },
});

export const { setBtnLoader } = themeSlice.actions;
export default themeSlice.reducer; 