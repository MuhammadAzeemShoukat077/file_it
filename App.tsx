/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/reducers/store';
import Routes from './src/routes';

export const navigationRef = createNavigationContainerRef();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <Routes />
        </SafeAreaView>
      </Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
