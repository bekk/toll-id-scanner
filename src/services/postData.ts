import {BackHandler, Linking, Platform} from 'react-native';
import {TestData} from '../../types/testData';

export const postData = async (testData: TestData): Promise<void> => {
  try {
    await fetch(`http://${process.env.IP_ADDRESS}:8082/data/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
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
