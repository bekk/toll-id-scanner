import {ANDROID_LICENSE_KEY, IOS_LICENSE_KEY} from '@env';
import * as BlinkIDReactNative from 'blinkid-react-native';
import {Platform} from 'react-native';

const licenseKey = Platform.select({
  ios: IOS_LICENSE_KEY,
  android: ANDROID_LICENSE_KEY,
});

export async function scanId() {
  try {
    const idRecognizer = new BlinkIDReactNative.BlinkIdMultiSideRecognizer();

    const scanningResults = await BlinkIDReactNative.BlinkID.scanWithCamera(
      new BlinkIDReactNative.BlinkIdOverlaySettings(),
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

export async function scanPassport() {
  try {
    const passportRecognizer = new BlinkIDReactNative.PassportRecognizer();

    const scanningResults = await BlinkIDReactNative.BlinkID.scanWithCamera(
      new BlinkIDReactNative.BlinkIdOverlaySettings(),
      new BlinkIDReactNative.RecognizerCollection([passportRecognizer]),
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
