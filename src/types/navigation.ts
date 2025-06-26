export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  OTPVerification: undefined;
  ResetPassword: undefined;
  Home: { capturedImage?: string } | undefined;
  DetailCard: {
    id: number;
    title: string;
    date: string;
    address: string;
    image: any;
  };
  GetStarted: undefined;
  Camera: undefined;
  // Add more screens here as needed
}; 