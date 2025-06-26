// Define icon types we're using
export type IconFamily = 'MaterialIcons';

// Define all icons used in the app
export const ICONS = {
  // Camera Screen
  CLOSE: {
    name: 'close',
  },
  CAPTURE: {
    name: 'camera',
  },
  RETAKE: {
    name: 'refresh',
  },
  UPLOAD: {
    name: 'cloud-upload',
  },
  // Home Screen
  SCAN: {
    name: 'document-scanner',
  },
  GALLERY: {
    name: 'photo-library',
  },
  FILES: {
    name: 'folder',
  },
  CAMERA_OUTLINE: {
    name: 'camera-alt',
  },
  GALLERY_OUTLINE: {
    name: 'photo-library',
  },
  PERSON: {
    name: 'person',
  },
  AVATAR: {
    name: 'account-circle',
  },
  SCAN_OUTLINE: {
    name: 'document-scanner',
  },
  // Profile
  LOGOUT: {
    name: 'logout',
  },
  // Detail Screen
  SHARE: {
    name: 'share',
  },
  EDIT: {
    name: 'edit',
  },
  DELETE: {
    name: 'delete',
  },
  DOWNLOAD: {
    name: 'download',
  },
} as const; 