import {BackHandler, Linking, Platform} from 'react-native';
import ScanResultType from '../../types/scanResultType';

export const postData = async (data: ScanResultType): Promise<void> => {
  try {
    console.log(data);
    await fetch(`http://${process.env.IP_ADDRESS}:8082/data/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => console.log(response));
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    } else {
      Linking.openURL('googlechrome://');
    }
  } catch (error) {
    console.error('Posting failed:', error);
  }
};
