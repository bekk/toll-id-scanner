import {ANDROID_LICENSE_KEY, IOS_LICENSE_KEY} from '@env';
import * as BlinkIDReactNative from 'blinkid-react-native';
import {Alert, Platform} from 'react-native';
import {Button} from 'react-native-paper';

const licenseKey = Platform.select({
  ios: IOS_LICENSE_KEY,
  android: ANDROID_LICENSE_KEY,
});

export async function scan() {
  try {
    const idRecognizer = new BlinkIDReactNative.BlinkIdSingleSideRecognizer();

    const scanningResults = await BlinkIDReactNative.BlinkID.scanWithCamera(
      new BlinkIDReactNative.DocumentOverlaySettings(),
      new BlinkIDReactNative.RecognizerCollection([idRecognizer]),
      licenseKey,
    );

    const isValidPassport = scanningResults[0].mrzResult.mrzVerified
      ? true
      : false;
    const isValidID = scanningResults[0].vizResult.empty ? false : true;

    const isValid = isValidPassport || isValidID ? true : false;

    if (isValid) {
      return scanningResults;
    } else {
      const retry = await new Promise(resolve => {
        Alert.alert('No data found', 'Please try again', [
          {
            text: 'Try again',
            onPress: () => {
              resolve(true);
            },
            style: 'cancel',
          },
          {
            text: 'Cancel',
            onPress: () => {
              resolve(false);
            },
          },
        ]);
      });

      if (retry) {
        return scan();
      }
    }
  } catch (error) {
    console.error('Scanning failed', error);
    return null;
  }
}
