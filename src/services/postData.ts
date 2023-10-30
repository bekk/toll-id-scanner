import {BackHandler, Linking, Platform} from 'react-native';
import {ScanResultType} from '@typedefs/ScanResultType';
import {formatScanningResults} from '@utils/formatScanningResults';

export const postData = async (data: ScanResultType): Promise<void> => {
  try {
    const BROWSERS_TO_TRY = ['googlechrome://', 'firefox://', 'safari://'];
    await fetch(`http://${process.env.IP_ADDRESS}:8082/data/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formatScanningResults(data)),
    }).then(response => console.log('Post response:', response.status));
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    } else if (Platform.OS === 'ios') {
      try {
        const browserFound = BROWSERS_TO_TRY.some(async browserURL => {
          const canOpen = await Linking.canOpenURL(browserURL);
          if (canOpen) {
            Linking.openURL(browserURL);
          }
        });
      } catch (error) {
        console.log('Please go back to the original window');
      }
    }
  } catch (error) {
    console.error('Posting failed:', error);
  }
};
