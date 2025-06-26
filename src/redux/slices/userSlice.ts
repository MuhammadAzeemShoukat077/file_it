import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
  id: number;
  fullName: string;
  email: string;
  token: string;
}

interface UserState {
  userData: UserData | null;
}

const initialState: UserState = {
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer; 