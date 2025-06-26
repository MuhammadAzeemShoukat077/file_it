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

type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
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
            <Text style={styles.welcomeText}>Sign Up to get Register!</Text>
          </View>

          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
            onSubmit={handleFormSubmit}
            validationSchema={validationSchema}
          >
            {formikProps => (
              <View style={styles.formSection}>
                <InputField type="text" name="name" label="Name" placeholder="Enter Name" formik={formikProps}/>
                <InputField type="email" name="email" label="Email" placeholder="Email address" formik={formikProps}/>
                <InputField type="password" name="password" label="Password" placeholder="Password" formik={formikProps}/>

                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => formikProps.handleSubmit()}
                  >
                    <Text style={styles.actionBtnText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.toggleContainer}
                  onPress={() => navigation.navigate('SignIn')}
                >
                  <Text style={styles.toggleText}>
                    Already have an account?{' '}
                    <Text style={styles.toggleBtnText}>Sign In</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
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
});

export default SignUpScreen;
