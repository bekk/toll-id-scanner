import {ANDROID_LICENSE_KEY, IOS_LICENSE_KEY} from '@env';
import * as BlinkIDReactNative from 'blinkid-react-native';
import {Platform} from 'react-native';

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

    const isValid =
      scanningResults[0].resultState ===
      BlinkIDReactNative.RecognizerResultState.valid
        ? scanningResults
        : null;

    return isValid;
  } catch (error) {
    console.error('Scanning failed', error);
    return null;
  }
}
