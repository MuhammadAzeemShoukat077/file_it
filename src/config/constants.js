export const DrawerNavigationData = [
  {
    title: 'My Files',
    iconName: 'insert-drive-file',
    navigationPath: 'DeviceListing',
  },
  {
    title: 'Profile',
    iconName: 'person',
    navigationPath: 'UpdateProfile',
  },
  // {
  //   title: 'Terms & Condition',
  //   iconName: 'manage-accounts',
  //   navigationPath: 'TermsAndCondition',
  // },
];

export const SystemConnectionSteps = [
  {
    title: 'Step 1',
    steps:
      'Go to your settings app and turn off your phone’s cellular data. This step allows your phone to scan for available WiFi networks.',
    imagePath: require('../assets/images/step1.png'),
  },
  {
    title: 'Step 2',
    steps:
      'Next, select your Network and Internet window and search and select a network starting with EW10 under available WiFi networks.',
    imagePath: require('../assets/images/step2.png'),
  },
  {
    title: 'Step 3',
    steps:
      'Return to the Electrafy app and click on the link below. The link will take you to a new browser window to begin the steps to connect your home WiFi network to Electrafy',
    linkPath: 'http://10.10.100.254',
  },
  {
    title: 'Step 4',
    steps: [
      'In the browser window you will be asked to sign into Electrafy’s system.',
      'If not already present, use the following credentials to log into the system:',
      'Username: admin',
      'Password: admin',
    ],
    imagePath: require('../assets/images/step4.png'),
  },
  {
    title: 'Step 5',
    steps: [
      'Once you are logged onto the system’s network, you will be verifying the settings are correct.',
      'Click on System Settings to go to the settings screen.  Once there, confirm that the WiFi Mode is as follows:',
      'WiFi Mode: AP+STA',
    ],
    imagePath: require('../assets/images/step5.png'),
  },
  {
    title: 'Step 6',
    steps: [
      'Still in the browser window, you will now be connecting your home WiFi to Electrafy’s system. You can do this by scanning for available networks.',
      'If you cannot scan for your WiFi information, enter the information manually using the following steps:',
      'In the STA SSID field, enter your home WiFi’s name. In the example below, the home WiFI is listed as Bell610.',
      'Next, enter your WiFi password in the field labelled STA Key.',
      'Once all the information is entered, scroll down and tap on the Submit button at the bottom of the window.',
    ],
    imagePath: require('../assets/images/step6.png'),
  },
  {
    title: 'Step 7',
    steps: [
      'You now need to refresh the system to lock in the changes.',
      'You do this by selecting the Others tab in the main menu.',
      'Scroll to the bottom and click Restart.',
    ],
    imagePath: require('../assets/images/step7.png'),
  },
  {
    title: 'Step 8',
    steps: [
      'Exit the browser and return to your phone settings to reconnect your phone to your cellular data.',
      'Congratulations, your phone is now connected to Electrafy’s system. ',
      'You can now use the app to connect to your system at anytime, anywhere. ',
    ],
  },
];

export const BatteryStatusEnum = {
  batteryCharging: 'CHARGING', // GREEN STAR
  batteryDischarging: 'DISCHARGING', // YELLOW STAR
  batteryNotWorking: 'NOT_WORKING', // RED STAR
};

export const UPSStatusEnum = {
  upsWorking: 'ON', // UPS GREEN
  upsOff: 'OFF', // UPS RED
};
