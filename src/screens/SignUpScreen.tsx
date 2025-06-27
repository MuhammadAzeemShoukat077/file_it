import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../reducers/slices/UserSlice';
import { setBtnLoader } from '../reducers/slices/ThemeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance, ApiResponse } from '../config/axiosInterceptor';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import { showSuccessMessage, showErrorMessage } from '../helpers/helper';

type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
};

interface FormValues {
  fullName: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Name is required'),
  email: Yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    // .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .required('Password is required'),
});

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const btnLoader = useSelector((state: any) => state.Theme.btnLoader);
  const [apiError, setApiError] = useState('');

  const handleFormSubmit = async (values: FormValues) => {
    try {
      setApiError('');
      dispatch(setBtnLoader(true));

      console.log('Sending registration request with:', {
        name: values.fullName,
        email: values.email,
        password: '***' // password masked for security
      });

      const response = await axiosInstance.post<ApiResponse<{
        user: {
          id: number;
          fullName: string;
          email: string;
          createdAt: string;
          updatedAt: string;
        };
        token: {
          type: string;
          name: string | null;
          token: string;
          abilities: string[];
          lastUsedAt: string | null;
          expiresAt: string;
        };
      }>>('/api/register?frontend_url=http://localhost:3000', {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });

      console.log('Registration response:', {
        status: response.data?.status,
        message: response.data?.message
      });

      if (response.data?.status) {
        showSuccessMessage(response.data);
        const userData = {
          id: response.data.data.user.id.toString(),
          fullName: response.data.data.user.fullName,
          email: response.data.data.user.email,
          token: response.data.data.token.token,
        };
        
        dispatch(setUserData(userData));
        await AsyncStorage.setItem('token', response.data.data.token.token);
        
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });
      } else {
        showErrorMessage(response.data);
        setApiError(response.data?.message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('Detailed signup error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      showErrorMessage(error.response?.data);
      const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
      setApiError(errorMessage);
    } finally {
      dispatch(setBtnLoader(false));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.topSection}>
            <View style={styles.logoWrapper}>
              <View style={styles.logoContainer}>
                <Image 
                  source={require('../assets/logo.png')}
                  style={styles.logo}
                />
              </View>
            </View>
            <Text style={styles.welcomeText}>Sign Up to get Register!</Text>
          </View>

          <Formik<FormValues>
            initialValues={{ fullName: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, isSubmitting, ...formikProps }) => (
              <View style={styles.formSection}>
                <InputField type="text" name="fullName" label="Name" placeholder="Enter Name" formik={formikProps}/>
                <InputField type="email" name="email" label="Email" placeholder="Email address" formik={formikProps}/>
                <InputField type="password" name="password" label="Password" placeholder="Password" formik={formikProps}/>

                {apiError ? (
                  <Text style={styles.errorText}>{apiError}</Text>
                ) : null}
                <View style={styles.btnContainer}>
                  <TouchableOpacity 
                    style={[styles.actionBtn, (btnLoader || isSubmitting) && styles.actionBtnDisabled]}
                    onPress={() => handleSubmit()}
                    disabled={btnLoader || isSubmitting}
                  >
                    {btnLoader || isSubmitting ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.actionBtnText}>Sign Up</Text>
                    )}
                  </TouchableOpacity>
                </View>

                <TouchableOpacity 
                  style={styles.toggleContainer} 
                  onPress={() => navigation.navigate('SignIn')}
                >
                  <Text style={styles.toggleText}>
                    Already have an account? <Text style={styles.toggleBtnText}>Sign In</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: '20%',
  },
  topSection: {
    alignItems: 'center',
  },
  logoWrapper: {
    marginBottom: 16,
  },
  logoContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  formSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  btnContainer: {
    marginTop: 24,
  },
  actionBtn: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    color: '#666',
  },
  toggleBtnText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    marginTop: 4,
  },
  actionBtnDisabled: {
    opacity: 0.7,
  },
});

export default SignUpScreen; 