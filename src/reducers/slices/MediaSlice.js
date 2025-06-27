import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mediaData: [],
  loading: false,
  error: null,
};

const MediaSlice = createSlice({
  name: 'MediaSlice',
  initialState,
  reducers: {
    setMediaData: (state, action) => {
      state.mediaData = action.payload;
    },
    addMedia: (state, action) => {
      state.mediaData = [action.payload, ...state.mediaData];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setMediaData, addMedia, setLoading, setError } =
  MediaSlice.actions;

export default MediaSlice.reducer;
