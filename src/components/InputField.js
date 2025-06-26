import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import generalStyle from '../styles/index';
import THEME from '../config/theme';

const InputField = ({ type, placeholder, formik, label, name }) => {
  const value = formik.values[name];
  const error = formik.touched[name] && formik.errors[name];

  const keyboardType =
    type === 'email'
      ? 'email-address'
      : type === 'number'
      ? 'numeric'
      : 'default';
  const secureTextEntry = type === 'password';

  return (
    <View style={styles.container}>
      {label && <Text style={generalStyle.inputLabel}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={type === 'email' ? 'none' : 'sentences'}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: THEME.COLORS.GRAY_DARK,
    fontFamily: 'Poppins-Medium',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: THEME.COLORS.GRAY_DARK,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'Poppins-Regular',
  },
});

export default InputField;
