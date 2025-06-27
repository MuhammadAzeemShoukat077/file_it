import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import Icon from '../components/Icon';

type DetailCardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DetailCard'>;
  route: RouteProp<RootStackParamList, 'DetailCard'>;
};

const DetailCardScreen: React.FC<DetailCardScreenProps> = ({ navigation, route }) => {
  const { title, image } = route.params;
  const [isImageFullScreen, setImageFullScreen] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header - Simplified */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.backButton} />
      </View>

      {/* Image Section */}
      <TouchableOpacity 
        style={[
          styles.imageContainer,
          isImageFullScreen && styles.fullScreenImage
        ]}
        onPress={() => setImageFullScreen(!isImageFullScreen)}
        activeOpacity={0.9}
      >
        <Image 
          source={image}
          style={styles.image}
          resizeMode={isImageFullScreen ? "contain" : "cover"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 48 : 24,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullScreenImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default DetailCardScreen; 