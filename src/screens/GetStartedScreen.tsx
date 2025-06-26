import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type GetStartedScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'GetStarted'>;
};

const GetStartedScreen: React.FC<GetStartedScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <Text style={styles.title}>File It</Text>
          <Text style={styles.description}>
            Organize, track, and manage your documents with ease. The smart way to
            keep everything in order.
          </Text>
          <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text style={styles.actionBtnText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 32,
    lineHeight: 26,
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
});

export default GetStartedScreen; 