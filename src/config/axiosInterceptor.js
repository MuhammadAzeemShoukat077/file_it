import axios from 'axios';
import {API_URL} from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const axiosInitialization = () => {
  axios.defaults.baseURL = API_URL;
  axios.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      // config.headers['Content-Type'] = 'application/json';
      return config;
    },
    error => {
      Promise.reject(error);
    },
  );
  axios.interceptors.response.use(
    response => response.data,
    error => {
      if (error?.response?.status === 401) {
        // Unauthorized user, token expired, etc.
        AsyncStorage.clear();
      } else if (error.message === 'Network Error' && !error.response) {
        Toast.show({
          type: 'error',
          text1: "It seems like you're currently offline. Please check your internet connection.",
          position: 'bottom',
          visibilityTime: 3000,
        });
      } else {
        if (!(axios.isCancel(error) || error.code === 'ECONNABORTED')) {
          Toast.show({
            type: 'error',
            text1: 'Oops! Something unexpected happened.',
            position: 'bottom',
            visibilityTime: 2000,
          });
        }
      }
      return Promise.reject(error);
    },
  );
};

export default axiosInitialization;
