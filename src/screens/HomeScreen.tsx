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
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [isScanModalVisible, setScanModalVisible] = useState(false);

  // Sample data with image URLs (replace with your actual data)
  const galleryItems = [
    {
      id: 1,
      title: 'Home Depot',
      date: '25-03-2023',
      address: '540 Monroe des Plaines, Tennessee',
      image: require('../assets/background.jpg'), 
    },
    {
      id: 2,
      title: 'Home Depot',
      date: '25-03-2023',
      address: '540 Monroe des Plaines, Tennessee',
      image: require('../assets/background.jpg'), 
    },
    {
      id: 3,
      title: 'Home Depot',
      date: '25-03-2023',
      address: '540 Monroe des Plaines, Tennessee',
      image: require('../assets/background.jpg'), 
    },
    {
      id: 4,
      title: 'Home Depot',
      date: '25-03-2023',
      address: '540 Monroe des Plaines, Tennessee',
      image: require('../assets/background.jpg'), 
    },
    {
      id: 5,
      title: 'Home Depot',
      date: '25-03-2023',
      address: '540 Monroe des Plaines, Tennessee',
      image: require('../assets/background.jpg'), 
    },
    {
      id: 6,
      title: 'Home Depot',
      date: '25-03-2023',
      address: '540 Monroe des Plaines, Tennessee',
      image: require('../assets/background.jpg'), 
    },
    {
      id: 7,
      title: 'Home Depot',
      date: '25-03-2023',
      address: '540 Monroe des Plaines, Tennessee',
      image: require('../assets/background.jpg'), 
    },
    {
      id: 8,
      title: 'Home Depot',
      date: '25-03-2023',
      address: '540 Monroe des Plaines, Tennessee',
      image: require('../assets/background.jpg'), 
    },
    {
      id: 9,
      title: 'Home Depot',
      date: '25-03-2023',
      address: '540 Monroe des Plaines, Tennessee',
      image: require('../assets/background.jpg'), 
    },{
      id: 10,
      title: 'Home Depot',
      date: '25-03-2023',
      address: '540 Monroe des Plaines, Tennessee',
      image: require('../assets/background.jpg'), 
    },
  ];

  // Function to handle scanning/taking picture
  const handleScan = () => {
    setScanModalVisible(false);
    navigation.navigate('Camera');
  };

  // Function to handle uploading from gallery
  const handleUploadFromGallery = () => {
    // TODO: Implement gallery picker
    setScanModalVisible(false);
  };

  // Function to handle upload to Google Cloud Storage
  // const handleUploadToCloud = async (imageUri: string) => {
  //   // TODO: Implement Google Cloud Storage upload
  //   try {
  //     // 1. Get signed URL from your backend
  //     // 2. Upload image to Google Cloud Storage
  //     // 3. Save metadata to your database
  //     // 4. Update local state
  //   } catch (error) {
  //     console.error('Upload failed:', error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Documents</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={() => setScanModalVisible(true)}
            >
              <Icon name="scan-outline" size={22} color="#fff" />
              <Text style={styles.scanText}>Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton}>
              <Icon name="person" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.galleryGrid}>
          {galleryItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.galleryItem}
              onPress={() => navigation.navigate('DetailCard', {
                id: item.id,
                title: item.title,
                date: item.date,
                address: item.address,
                image: item.image,
                // cloudUrl: item.cloudUrl // Add cloud storage URL
              })}
            >
              <Image
                source={item.image}
                style={styles.galleryImage}
                resizeMode="cover"
              />
              <View style={styles.imageOverlay}>
                <Text style={styles.imageTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.imageDate}>{item.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Icon name="images-outline" size={24} color="#fff" />
            <Text style={styles.navText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navItem, styles.scanNavItem]}
            onPress={() => setScanModalVisible(true)}
          >
            <View style={styles.scanIconContainer}>
              <Icon name="scan" size={32} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Icon name="folder-outline" size={24} color="#fff" />
            <Text style={styles.navText}>Files</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scan Modal */}
      <Modal
        visible={isScanModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setScanModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Document</Text>
            
            <TouchableOpacity style={styles.modalButton} onPress={handleScan}>
              <Icon name="camera-outline" size={24} color="#007AFF" />
              <Text style={styles.modalButtonText}>Take Picture</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={handleUploadFromGallery}>
              <Icon name="images-outline" size={24} color="#007AFF" />
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={() => setScanModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const { width } = Dimensions.get('window');
const itemSize = (width - 48) / 2; // 2 items per row with 16px padding on each side and 16px gap

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerContainer: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 44 : 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  scanText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  galleryItem: {
    width: itemSize,
    height: itemSize,
    borderRadius: 12,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
  },
  imageTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  imageDate: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
  bottomNavContainer: {
    backgroundColor: '#333',
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
  scanNavItem: {
    marginTop: -30,
  },
  scanIconContainer: {
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    marginBottom: 12,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 12,
  },
  modalCancelButton: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default HomeScreen; 