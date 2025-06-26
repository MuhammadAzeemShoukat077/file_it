import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
  Platform,
  Dimensions,
  Image,
  Share,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import Icon from '../components/Icon';
import { ICONS } from '../constants/icons';

const { width } = Dimensions.get('window');

type DetailCardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DetailCard'>;
  route: RouteProp<RootStackParamList, 'DetailCard'>;
};

const DetailCardScreen: React.FC<DetailCardScreenProps> = ({ navigation, route }) => {
  const { title, date, address, image } = route.params;
  const [isImageFullScreen, setImageFullScreen] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this document: ${title}`,
        url: image, // Use cloud URL when available
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share document');
    }
  };

  const handleDownload = () => {
    Alert.alert('Success', 'Document downloaded successfully');
    // Here you would implement actual download functionality
  };

  const handleEdit = () => {
    Alert.alert(
      'Edit Mode',
      'You can now edit the document details',
      [
        {
          text: 'Done',
          onPress: () => {}
        }
      ]
    );
  };

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

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Image Section */}
          <TouchableOpacity 
            style={[
              styles.imageContainer,
              isImageFullScreen && styles.fullScreenImage
            ]}
            onPress={() => setImageFullScreen(!isImageFullScreen)}
          >
            <Image 
              source={image}
              style={styles.image}
              resizeMode={isImageFullScreen ? "contain" : "cover"}
            />
          </TouchableOpacity>
          
          {/* Details Section */}
          {!isImageFullScreen && (
            <View style={styles.detailsContainer}>
              <Text style={styles.date}>{date}</Text>
              <View style={styles.addressContainer}>
                <Icon name="location-on" size={16} color="#007AFF" />
                <Text style={styles.address}>{address}</Text>
              </View>

              <View style={styles.descriptionContainer}>
                <Text style={styles.sectionTitle}>Document Info</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Size:</Text>
                  <Text style={styles.infoValue}>2.4 MB</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Type:</Text>
                  <Text style={styles.infoValue}>Image/JPEG</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Uploaded:</Text>
                  <Text style={styles.infoValue}>{date}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation - Simplified */}
      {!isImageFullScreen && (
        <View style={styles.bottomNavContainer}>
          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem} onPress={handleDownload}>
              <Icon name={ICONS.DOWNLOAD.name} size={24} color="#fff" />
              <Text style={styles.navText}>Save</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.navItem, styles.editNavItem]} onPress={handleEdit}>
              <View style={styles.editIconContainer}>
                <Icon name={ICONS.EDIT.name} size={32} color="#fff" />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.navItem} onPress={handleShare}>
              <Icon name={ICONS.SHARE.name} size={24} color="#fff" />
              <Text style={styles.navText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    width: width,
    height: width * 0.7,
  },
  fullScreenImage: {
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
  },
  address: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  descriptionContainer: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  bottomNavContainer: {
    backgroundColor: '#0066CC',
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editNavItem: {
    marginTop: -30,
  },
  editIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});

export default DetailCardScreen; 