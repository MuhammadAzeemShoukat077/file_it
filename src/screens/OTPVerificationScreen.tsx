import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type OTPVerificationScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OTPVerification'>;
};

const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.formHeadText}>Verify OTP</Text>
      
      <Text style={styles.description}>
        Please enter the verification code sent to your email address.
      </Text>

      <View style={styles.otpContainer}>
        <TextInput
          style={styles.otpInput}
          maxLength={1}
          keyboardType="number-pad"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.otpInput}
          maxLength={1}
          keyboardType="number-pad"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.otpInput}
          maxLength={1}
          keyboardType="number-pad"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.otpInput}
          maxLength={1}
          keyboardType="number-pad"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={() => navigation.navigate('ResetPassword')}
        >
          <Text style={styles.actionBtnText}>Verify OTP</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.resendContainer}>
        <Text style={styles.toggleText}>
          Didn't receive code? <Text style={styles.toggleBtnText}>Resend</Text>
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
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    fontSize: 24,
    textAlign: 'center',
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
  resendContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 16,
    color: '#333',
  },
  toggleBtnText: {
    color: '#000',
    fontWeight: '600',
  },
});

export default OTPVerificationScreen;
