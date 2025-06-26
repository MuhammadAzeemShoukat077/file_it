import {combineReducers, configureStore} from '@reduxjs/toolkit';
import User from './slices/UserSlice';
import Theme from './slices/ThemeSlice';
import DeviceData from './slices/DeviceDataSlice';
import MasterData from './slices/MasterSlice';

const store = configureStore({
  reducer: combineReducers({User, Theme, DeviceData, MasterData}),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const {dispatch, getState} = store;

export default store;
