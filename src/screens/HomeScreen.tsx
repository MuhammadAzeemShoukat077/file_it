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
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Icon from '../components/Icon';
import { ICONS } from '../constants/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserData } from '../reducers/slices/UserSlice';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isScanModalVisible, setScanModalVisible] = useState(false);
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const [selectedTab] = useState('files'); // Files tab is selected by default

  const handleLogout = async () => {
    try {
      // Clear the auth token
      await AsyncStorage.clear();
      // Clear the user data from Redux
      dispatch(setUserData(null));
      // Navigate to SignIn screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Documents</Text>
          <View>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => setProfileModalVisible(!isProfileModalVisible)}
            >
              <Icon 
                name={ICONS.AVATAR.name}
                size={32} 
                color="#007AFF" 
              />
            </TouchableOpacity>
            {isProfileModalVisible && (
              <View style={styles.profileDropdown}>
                <TouchableOpacity 
                  style={styles.profileDropdownItem}
                  onPress={() => {
                    setProfileModalVisible(false);
                    // Navigate to profile screen
                    // navigation.navigate('Profile');
                  }}
                >
                  <Icon 
                    name={ICONS.PERSON.name}
                    size={20} 
                    color="#007AFF" 
                  />
                  <Text style={styles.profileDropdownText}>Profile</Text>
                </TouchableOpacity>
                <View style={styles.dropdownDivider} />
                <TouchableOpacity 
                  style={styles.profileDropdownItem}
                  onPress={() => {
                    setProfileModalVisible(false);
                    // Handle logout
                    Alert.alert(
                      'Logout',
                      'Are you sure you want to logout?',
                      [
                        {
                          text: 'Cancel',
                          style: 'cancel'
                        },
                        {
                          text: 'Logout',
                          style: 'destructive',
                          onPress: handleLogout
                        }
                      ]
                    );
                  }}
                >
                  <Icon 
                    name={ICONS.LOGOUT.name}
                    size={20} 
                    color="#FF3B30" 
                  />
                  <Text style={[styles.profileDropdownText, { color: '#FF3B30' }]}>Logout</Text>
                </TouchableOpacity>
              </View>
            )}
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
            {selectedTab === 'files' && <View style={styles.selectedIndicator} />}
            <Icon 
              name={ICONS.FILES.name}
              size={24} 
              color="#fff" 
            />
            <Text style={[styles.navText, selectedTab === 'files' && styles.navTextSelected]}>Files</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navItem, styles.scanNavItem]}
            onPress={() => setScanModalVisible(true)}
          >
            <View style={styles.scanIconContainer}>
              <Icon 
                name={ICONS.CAMERA_OUTLINE.name}
                size={32} 
                color="#fff" 
              />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            {selectedTab === 'gallery' && <View style={styles.selectedIndicator} />}
            <Icon 
              name={ICONS.GALLERY.name}
              size={24} 
              color="#fff" 
            />
            <Text style={styles.navText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scan Modal */}
      <Modal
        visible={isScanModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setScanModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle]}>Select Option</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setScanModalVisible(false)}
              >
                <Icon name="close" size={24} color="#007AFF" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={styles.modalOption}
              onPress={() => {
                setScanModalVisible(false);
                navigation.navigate('Camera');
              }}
            >
              <Icon name={ICONS.CAMERA_OUTLINE.name} size={24} color="#007AFF" />
              <Text style={styles.modalOptionText}>Take Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.modalOption}
              onPress={() => {
                setScanModalVisible(false);
                // TODO: Implement gallery picker
              }}
            >
              <Icon name={ICONS.GALLERY_OUTLINE.name} size={24} color="#007AFF" />
              <Text style={styles.modalOptionText}>Choose from Gallery</Text>
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
    color: '#007AFF',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
    position: 'relative',
    minWidth: 70,
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
  navTextSelected: {
    fontWeight: '600',
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    marginBottom: 12,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 12,
  },
  profileDropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  profileDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  profileDropdownText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#007AFF',
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 4,
  },
  selectedIndicator: {
    position: 'absolute',
    bottom: -16,
    left: '15%',
    right: '15%',
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 1.5,
  },
});

export default HomeScreen; 