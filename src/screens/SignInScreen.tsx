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

type SignInScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
};

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup
    .string()
    .required('Password is required'),
});

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const btnLoader = useSelector((state: any) => state.Theme.btnLoader);
  const [apiError, setApiError] = useState('');

  const handleFormSubmit = async (values: FormValues) => {
    try {
      setApiError('');
      dispatch(setBtnLoader(true));

      console.log('Sending login request with:', {
        email: values.email,
        password: '***' // password masked for security
      });

      const response = await axiosInstance.post<ApiResponse<{
        token: {
          type: string;
          name: string | null;
          token: string;
          abilities: string[];
          lastUsedAt: string | null;
          expiresAt: string | null;
        };
        user: {
          id: number;
          fullName: string;
          email: string;
          type: number;
          isActive: boolean;
          createdAt: string;
          updatedAt: string;
        };
      }>>('/api/login', {
        email: values.email,
        password: values.password,
      });

      console.log('Login response:', {
        status: response.data?.status,
        message: response.data?.message,
        hasData: !!response.data?.data,
        responseData: response.data
      });

      if (response.data?.status && response.data?.data) {
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
          routes: [{ name: 'Home' }],
        });
      } else {
        // Handle failed login more gracefully
        const errorMsg = response.data?.message || 'Invalid email or password';
        console.log('Login failed:', errorMsg);
        setApiError(errorMsg);
      }
    } catch (error: any) {
      console.error('Detailed login error:', {
        name: error.name,
        message: error.message,
        response: {
          data: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers
        },
        request: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL
        }
      });
      
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
            <Text style={styles.welcomeText}>Welcome Back!</Text>
          </View>

          <Formik<FormValues>
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, isSubmitting, ...formikProps }) => (
              <View style={styles.formSection}>
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
                      <Text style={styles.actionBtnText}>Sign In</Text>
                    )}
                  </TouchableOpacity>
                </View>

                <TouchableOpacity 
                  style={styles.toggleContainer} 
                  onPress={() => navigation.navigate('SignUp')}
                >
                  <Text style={styles.toggleText}>
                    Don't have an account? <Text style={styles.toggleBtnText}>Sign Up</Text>
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
  },
  topSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  logoWrapper: {
    marginBottom: 24,
    marginTop: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  formSection: {
    paddingHorizontal: 22,
    paddingBottom: 24,
  },
  btnContainer: {
    marginTop: 24,
  },
  actionBtn: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
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
    fontSize: 18,
    fontWeight: '600',
  },
  toggleContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 16,
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

export default SignInScreen;
