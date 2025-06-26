import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

// Define response type for your API
export interface ApiResponse<T = any> {
  status: boolean;
  data: T;
  message?: string;
}

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosInitialization = (): void => {
  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      return { ...response, data: response.data };
    },
    (error: AxiosError) => {
      if (error?.response?.status === 401) {
        AsyncStorage.clear();
      } else if (error.message === 'Network Error' && !error.response) {
        Toast.show({
          type: 'error',
          text1: "It seems like you're currently offline. Please check your internet connection.",
          position: 'bottom',
          visibilityTime: 3000,
        });
      } else {
        if (!(axios.isCancel(error) || (error as any).code === 'ECONNABORTED')) {
          Toast.show({
            type: 'error',
            text1: 'Oops! Something unexpected happened.',
            position: 'bottom',
            visibilityTime: 2000,
          });
        }
      }
      return Promise.reject(error);
    }
  );
};

export { axiosInstance };
export default axiosInitialization;
