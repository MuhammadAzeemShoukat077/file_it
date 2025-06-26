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

type ForgotPasswordScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;
};

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.formHeadText}>Forgot Password</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          keyboardType="email-address"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={() => navigation.navigate('OTPVerification')}
        >
          <Text style={styles.actionBtnText}>Send Reset Link</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.toggleContainer} 
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.toggleText}>
          Remember your password? <Text style={styles.toggleBtnText}>Sign In</Text>
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
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: '#000',
  },
  btnContainer: {
    marginTop: 20,
  },
  actionBtn: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  toggleContainer: {
    marginTop: 20,
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