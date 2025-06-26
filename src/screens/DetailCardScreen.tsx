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
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

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

  const handleDelete = () => {
    Alert.alert(
      'Delete Document',
      'Are you sure you want to delete this document?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // TODO: Delete from Google Cloud Storage
              // TODO: Delete from local storage
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete document');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity style={styles.moreButton} onPress={handleShare}>
          <Icon name="share-outline" size={24} color="#000" />
        </TouchableOpacity>
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
            {!isImageFullScreen && (
              <View style={styles.imageOverlay}>
                <TouchableOpacity onPress={handleShare}>
                  <Icon name="share-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete}>
                  <Icon name="trash-outline" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
          
          {/* Details Section */}
          {!isImageFullScreen && (
            <View style={styles.detailsContainer}>
              <Text style={styles.date}>{date}</Text>
              <View style={styles.addressContainer}>
                <Icon name="location-outline" size={16} color="#007AFF" />
                <Text style={styles.address}>{address}</Text>
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="cloud-download-outline" size={24} color="#007AFF" />
                  <Text style={styles.actionButtonText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="create-outline" size={24} color="#007AFF" />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={handleDelete}
                >
                  <Icon name="trash-outline" size={24} color="#FF3B30" />
                  <Text style={[styles.actionButtonText, styles.deleteText]}>Delete</Text>
                </TouchableOpacity>
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

      {/* Bottom Navigation */}
      {!isImageFullScreen && (
        <View style={styles.bottomNavContainer}>
          <TouchableOpacity style={styles.navItem}>
            <Icon name="download-outline" size={22} color="#000" />
            <Text style={styles.navText}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Icon name="share-outline" size={22} color="#000" />
            <Text style={styles.navText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Icon name="create-outline" size={22} color="#000" />
            <Text style={styles.navText}>Edit</Text>
          </TouchableOpacity>
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
  moreButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
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
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  actionButton: {
    alignItems: 'center',
    padding: 12,
  },
  actionButtonText: {
    color: '#007AFF',
    fontSize: 12,
    marginTop: 4,
  },
  deleteButton: {
    borderRadius: 8,
  },
  deleteText: {
    color: '#FF3B30',
  },
  descriptionContainer: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navText: {
    color: '#000',
    fontSize: 12,
    marginTop: 4,
  },
  fullScreenImage: {
    width: width,
    height: '100%',
    backgroundColor: '#000',
  },
  imageOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    gap: 16,
  },
});

export default DetailCardScreen; 