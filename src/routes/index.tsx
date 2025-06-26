import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailCardScreen from '../screens/DetailCardScreen';
import GetStartedScreen from '../screens/GetStartedScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="GetStarted"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DetailCard" component={DetailCardScreen} />
    </Stack.Navigator>
  );
};

export default Routes; 