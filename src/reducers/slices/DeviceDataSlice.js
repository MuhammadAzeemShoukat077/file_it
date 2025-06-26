// deviceDataSlice.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  deviceData: [],
  deviceSerialsData: [],
};

const deviceDataSlice = createSlice({
  name: 'DeviceData',
  initialState,
  reducers: {
    setDeviceData: (state, action) => {
      state.deviceData = action.payload;
    },
    setDeviceSerialsData: (state, action) => {
      state.deviceSerialsData = action.payload;
    },
  },
});

export const {setDeviceData, setDeviceSerialsData} = deviceDataSlice.actions;
export default deviceDataSlice.reducer;
