import { combineReducers, configureStore } from '@reduxjs/toolkit';
import User from './slices/UserSlice';
import Theme from './slices/ThemeSlice';
import DeviceData from './slices/DeviceDataSlice';
import MasterData from './slices/MasterSlice';
import media from './slices/MediaSlice';

const rootReducer = combineReducers({
  User,
  Theme,
  DeviceData,
  MasterData,
  media
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const { dispatch, getState } = store;

export default store; 