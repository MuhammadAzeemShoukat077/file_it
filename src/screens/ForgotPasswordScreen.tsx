import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import InputField from '../components/InputField';
import { Formik } from 'formik';
import * as Yup from 'yup';

type ForgotPasswordScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email'),
});

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const handleSubmit = (values: any) => {
    console.log('Email Submitted:', values.email);
    navigation.navigate('OTPVerification');
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.formHeadText}>Forgot Password</Text>

      <Formik
        initialValues={{ email: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <>
            <InputField
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email address"
              formik={formikProps}
            />

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => formikProps.handleSubmit()}
              >
                <Text style={styles.actionBtnText}>Send Reset Link</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>

      <TouchableOpacity
        style={styles.toggleContainer}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.toggleText}>
          Remember your password?{' '}
          <Text style={styles.toggleBtnText}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  formHeadText: {
    fontSize: 35,
    fontWeight: '600',
    paddingVertical: 50,
    color: '#000',
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
    color: '#333',
  },
  toggleBtnText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;
