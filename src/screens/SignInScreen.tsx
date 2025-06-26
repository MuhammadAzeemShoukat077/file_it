import React from 'react';
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
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';

type SignInScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
};

// Optional validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email'),
  password: Yup.string().min(6, 'Password must be at least 6 characters'),
});

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const handleFormSubmit = (values: any) => {
    console.log('Form Submitted:', values);
    navigation.navigate('Home');
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

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={handleFormSubmit}
            validationSchema={validationSchema}
            validateOnMount={false}
          >
            {formikProps => (
              <View style={styles.formSection}>
                <InputField
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Email address"
                  formik={formikProps}
                />

                <InputField
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Password"
                  formik={formikProps}
                />

                <TouchableOpacity
                  style={styles.forgotPasswordContainer}
                  onPress={() => navigation.navigate('ForgotPassword')}
                >
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => {
                      formikProps.handleSubmit();
                      navigation.navigate('Home');
                    }}
                  >
                    <Text style={styles.actionBtnText}>Sign In</Text>
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
    padding: 24,
  },
  topSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoWrapper: {
    marginBottom: 24,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
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
    paddingBottom: 24,
  },
  btnContainer: {
    marginTop: 24,
  },
  actionBtn: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
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
    color: '#000',
    fontWeight: '600',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 12,
  },
  forgotPasswordText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SignInScreen; 