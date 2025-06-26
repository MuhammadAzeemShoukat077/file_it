import { StyleSheet, Dimensions } from 'react-native';
import THEME from '../config/theme';

// Get the height of the screen
const screenHeight = Dimensions.get('window').height;
// const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  logo: {
    width: 150, // Adjust percentage as needed
    height: 150,
    backgroundColor: THEME.COLORS.GRAY_DARK,
    alignSelf: 'center',
    borderRadius: 100,
  },
  scrollViewContent: { flexGrow: 1 },
  inputLabel: {
    fontSize: 16,
    color: THEME.COLORS.BLACK,
    fontWeight: '500',
    marginBottom: 5,
    marginLeft: 10,
  },
  spinner: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    zIndex: 1,
    width: '100%',
    height: screenHeight,
    backgroundColor: '#fff',
    opacity: 0.7,
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderColor: THEME.COLORS.GRAY_DARK,
    color: THEME.COLORS.PRIMARY,
  },
  actionBtn: {
    backgroundColor: THEME.COLORS.PRIMARY,
    padding: 10,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
  },
  actionBtnLight: {
    backgroundColor: THEME.COLORS.GRAY_LIGHT,
    padding: 10,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
  },
  actionBtnText: {
    color: THEME.COLORS.YELLOW,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  actionBtnLightText: {
    color: THEME.COLORS.WHITE,
  },
  rowContainerSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainerCenterALign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  strongText: {
    fontWeight: 'bold',
  },
  centerAlignSelf: {
    alignSelf: 'center',
  },
  snackBarError: {
    marginBottom: '5%',
    backgroundColor: THEME.COLORS.ERROR,
    borderRadius: 5,
  },

  snackBarSuccess: {
    marginBottom: '5%',
    backgroundColor: THEME.COLORS.SUCCESS,
    borderRadius: 5,
  },

  snackBarWarning: {
    marginBottom: '5%',
    backgroundColor: THEME.COLORS.WARNING,
    borderRadius: 5,
  },

  MessageSnackBarTexts: {
    marginTop: 10,
  },

  container: {
    paddingHorizontal: 25,
    height: '100%',
    backgroundColor: THEME.COLORS.WHITE,
  },

  wrapper: {
    height: '100%',
    justifyContent: 'center',
  },

  fullWidthContainer: {
    height: '100%',
    backgroundColor: THEME.COLORS.WHITE,
  },

  containerContent: {
    paddingBottom: 50,
  },

  paddingHorizontal: {
    paddingHorizontal: 25,
  },

  buttonIcon: {
    marginTop: 2,
    fontSize: 15,
    color: THEME.COLORS.WHITE,
  },
  primaryButtonText: {
    color: THEME.COLORS.WHITE,
    fontSize: 20,
  },
  outlinedButtonText: {
    color: THEME.COLORS.PRIMARY,
    fontSize: 20,
  },
  bottomSheet: {
    backgroundColor: THEME.COLORS.WHITE,
    padding: 16,
    height: '100%',
    alignContent: 'center',
  },
  professionalBtn: {
    backgroundColor: THEME.COLORS.PRIMARY_BUTTON,
  },
  customerBtn: {
    borderColor: THEME.COLORS.PRIMARY_BUTTON,
  },

  dropDown: {
    placeholderStyle: {
      fontSize: 14,
      fontWeight: '400',
      color: 'gray',
    },
    itemText: {
      color: THEME.COLORS.GRAY_DARK,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: THEME.COLORS.PRIMARY,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    dropdown: {
      height: 50,
      borderColor: THEME.COLORS.GRAY_DARK,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 8,
      marginTop: 5,
      marginBottom: 3,
    },
  },
  modal: {
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(52, 52, 52, 0.5)',
    },
    modalView: {
      backgroundColor: THEME.COLORS.WHITE,
      padding: 30,
      borderRadius: 10,
      maxWidth: '90%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      gap: 20,
    },
    closeContainer: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    modalClose: {
      fontSize: 25,
      color: THEME.COLORS.GRAY,
    },
  },
  notificationBadge: {
    backgroundColor: '#FF8A00',
    zIndex: 1,
    height: 10,
    width: 10,
    position: 'absolute',
    borderRadius: 5,
    right: 1,
    top: 1,
  },
  flag: {
    marginRight: 10,
    marginTop: 3,
    fontSize: 20,
  },
});
