export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  OTPVerification: undefined;
  ResetPassword: undefined;
  Home: undefined;
  DetailCard: {
    id: number;
    title: string;
    date: string;
    image: { uri: string } | any;
  };
  GetStarted: undefined;
  Camera: undefined;
  // Add more screens here as needed
}; 