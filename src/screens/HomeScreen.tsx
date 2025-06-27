import React, { useState, useEffect, useCallback } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Icon from '../components/Icon';
import { ICONS } from '../constants/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../reducers/slices/UserSlice';
import { setMediaData, setLoading } from '../reducers/slices/MediaSlice';
import { RootState } from '../types/store';
import { axiosInstance } from '../config/axiosInterceptor';
import LogoutModal from '../components/LogoutModal';
import { showSuccessMessage, showErrorMessage } from '../helpers/helper';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const mediaState = useSelector((state: RootState) => state.media);
  const mediaData = mediaState?.mediaData || [];
  const loading = mediaState?.loading || false;
  
  console.log('[HOME] Media State:', mediaState);
  console.log('[HOME] Current mediaData:', mediaData);
  
  const [isScanModalVisible, setScanModalVisible] = useState(false);
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [selectedTab] = useState('files');

  const fetchMediaFiles = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      console.log('[FETCH] Requesting media files...');
      const response = await axiosInstance.get('/api/media/?page=1&pageSize=20');
      console.log('[FETCH] Full Response:', JSON.stringify(response.data, null, 2));
      
      if (response.data?.status && response.data?.data?.data) {
        const mediaFiles = response.data.data.data;
        console.log('[FETCH] Setting media data:', mediaFiles);
        dispatch(setMediaData(mediaFiles));
      } else {
        console.log('[FETCH] No data found, setting empty array');
        dispatch(setMediaData([]));
      }
    } catch (err: any) {
      console.error('[FETCH] Exception:', err.message);
      dispatch(setMediaData([]));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMediaFiles();
  }, [fetchMediaFiles]);

  // Refresh media list when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('[HOME] Screen focused, refreshing media list');
      fetchMediaFiles();
    });

    return unsubscribe;
  }, [navigation, fetchMediaFiles]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      dispatch(setUserData(null));
      showSuccessMessage({ status: true, message: 'Logged out successfully' });
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    } catch (err) {
      console.error('Logout Error:', err);
      showErrorMessage({ message: 'Failed to logout. Please try again.' });
    }
  };

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
                    setLogoutModalVisible(true);
                  }}
                >
                  <Icon 
                    name={ICONS.LOGOUT.name}
                    size={20} 
                    color="#FF3B30" 
                  />
                  <Text style={[styles.profileDropdownText, styles.logoutText]}>Logout</Text>
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
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : mediaData && mediaData.length > 0 ? (
            mediaData.map((item) => {
              console.log('[HOME] Rendering media item:', {
                id: item.id,
                publicUrl: item.publicUrl,
                originalName: item.originalName
              });
              
              return item?.id ? (
                <TouchableOpacity
                  key={item.id}
                  style={styles.galleryItem}
                  onPress={() => navigation.navigate('DetailCard', {
                    id: item.id,
                    title: item.originalName || 'Untitled',
                    date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'No date',
                    image: { uri: item.publicUrl }
                  })}
                >
                  <Image
                    source={{ uri: item.publicUrl }}
                    style={styles.galleryImage}
                    resizeMode="cover"
                    defaultSource={require('../assets/background.jpg')}
                  />
                  <View style={styles.imageOverlay}>
                    <Text style={styles.imageTitle} numberOfLines={1}>
                      {item.originalName || 'Untitled'}
                    </Text>
                    <Text style={styles.imageDate}>
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'No date'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null;
            })
          ) : (
            <Text style={styles.noDataText}>No media files found</Text>
          )}
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

      {/* Logout Modal */}
      <LogoutModal 
        visible={isLogoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onLogout={handleLogout}
      />
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
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  noDataText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#FF3B30',
  },
});

export default HomeScreen; 