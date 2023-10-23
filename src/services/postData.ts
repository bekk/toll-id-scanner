import {BackHandler, Linking, Platform} from 'react-native';
import {ScanResultType} from '@typedefs/ScanResultType';

export const postData = async (data: ScanResultType): Promise<void> => {
  try {
    console.log(data);
    const BROWSERS_TO_TRY = ['googlechrome://', 'firefox://', 'safari://'];

    await fetch(`http://${process.env.IP_ADDRESS}:8082/data/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => console.log(response));
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    } else if (Platform.OS === 'ios') {
      const browserFound = BROWSERS_TO_TRY.some(async browserURL => {
        if (await Linking.canOpenURL(browserURL)) {
          Linking.openURL(browserURL);
          return true;
        }
        return false;
      });

      if (!browserFound) {
        console.log('Please go back to the original window');
      }
    }
  } catch (error) {
    console.error('Posting failed:', error);
  }
};
