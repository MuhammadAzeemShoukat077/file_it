import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform, Image } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Icon from 'react-native-vector-icons/Ionicons';

type CameraScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Camera'>;
};

const CameraScreen: React.FC<CameraScreenProps> = ({ navigation }) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [photoPath, setPhotoPath] = useState<string | null>(null);
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');

  const checkPermissions = useCallback(async () => {
    if (!hasPermission) {
      const granted = await requestPermission();
      if (!granted) {
        navigation.goBack();
      }
    }
  }, [hasPermission, requestPermission, navigation]);

  useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);

  const handleCapture = async () => {
    try {
      if (device && camera.current) {
        const photo = await camera.current.takePhoto({
          flash: 'off',
          enableShutterSound: false
        });
        
        if (photo?.path) {
          console.log('Photo captured:', photo.path);
          setPhotoPath(`file://${photo.path}`);
        }
      }
    } catch (error) {
      console.error('Failed to take photo:', error);
    }
  };

  const handleRetake = () => {
    setPhotoPath(null);
  };

  const handleUpload = () => {
    if (photoPath) {
      navigation.navigate('Home', { capturedImage: photoPath });
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No camera permission</Text>
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No camera device found</Text>
      </View>
    );
  }

  if (photoPath) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photoPath }} style={StyleSheet.absoluteFill} />
        <View style={styles.previewControls}>
          <TouchableOpacity 
            style={styles.previewButton}
            onPress={handleRetake}
          >
            <Icon name="refresh-outline" size={24} color="#fff" />
            <Text style={styles.previewButtonText}>Retake</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.previewButton, styles.uploadButton]}
            onPress={handleUpload}
          >
            <Icon name="cloud-upload-outline" size={24} color="#fff" />
            <Text style={styles.previewButtonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        onInitialized={() => setIsCameraReady(true)}
      />
      
      {/* Camera Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.bottomControls}>
          <TouchableOpacity 
            style={styles.captureButton}
            onPress={handleCapture}
            disabled={!isCameraReady}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 16,
  },
  controlsContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  backButton: {
    margin: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#fff',
  },
  previewControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  previewButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    gap: 8,
  },
  uploadButton: {
    backgroundColor: '#007AFF',
  },
  previewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CameraScreen; 