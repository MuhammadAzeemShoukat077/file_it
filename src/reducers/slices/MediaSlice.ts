import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MediaState {
  mediaData: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MediaState = {
  mediaData: [],
  loading: false,
  error: null,
};

const MediaSlice = createSlice({
  name: 'MediaSlice',
  initialState,
  reducers: {
    setMediaData: (state, action: PayloadAction<any[]>) => {
      state.mediaData = action.payload;
    },
    addMedia: (state, action: PayloadAction<any>) => {
      state.mediaData = [action.payload, ...state.mediaData];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setMediaData, addMedia, setLoading, setError } = MediaSlice.actions;

export default MediaSlice.reducer; 