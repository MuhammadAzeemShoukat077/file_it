import Toast from 'react-native-toast-message';

interface ApiResponse {
  status: boolean;
  message?: string;
  data?: any;
  errors?: Array<{ message: string }>;
}

export const showSuccessMessage = (responseData: ApiResponse) => {
  if (responseData?.message) {
    Toast.show({
      type: 'success',
      text1: responseData.message,
      position: 'bottom',
      visibilityTime: 3000
    });
  }
};

export const showErrorMessage = (responseData: ApiResponse | any) => {
  let errorArray: string[] = [];

  if (responseData?.errors?.length) {
    responseData.errors.forEach((e: { message: string }) => errorArray.push(e.message));
  } else if (responseData?.message) {
    errorArray.push(responseData.message);
  } else {
    errorArray.push('Something went wrong!');
  }

  errorArray.forEach((errorMessage, index) => {
    setTimeout(() => {
      Toast.show({
        type: 'error',
        text1: errorMessage,
        position: 'bottom',
        visibilityTime: 5000
      });
    }, index * 3000);
  });
}; 