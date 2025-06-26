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

type ResetPasswordScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ResetPassword'>;
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters'),
    // .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
    // .required('Please confirm your password'),
});

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ navigation }) => {
  const handleReset = (values: any) => {
    console.log('Resetting password with values:', values);
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.formHeadText}>Reset Password</Text>

      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        onSubmit={handleReset}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <>
            <InputField
              type="password"
              name="password"
              label="New Password"
              placeholder="Enter new password"
              formik={formikProps}
            />
            <InputField
              type="password"
              name="confirmPassword"
              label="Confirm New Password"
              placeholder="Confirm new password"
              formik={formikProps}
            />

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => formikProps.handleSubmit()}
              >
                <Text style={styles.actionBtnText}>Reset Password</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
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
    backgroundColor: '#000',
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
});

export default ResetPasswordScreen;
