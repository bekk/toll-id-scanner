import {
  BlinkID,
  RecognizerCollection,
  BlinkIdOverlaySettings,
} from 'blinkid-react-native';
import {ANDROID_LICENSE_KEY, IOS_LICENSE_KEY} from '@env';
import * as BlinkIDReactNative from 'blinkid-react-native';
import {Platform} from 'react-native';

const licenseKey = Platform.select({
  ios: IOS_LICENSE_KEY,
  android: ANDROID_LICENSE_KEY,
});

export async function scanId() {
  console.log(licenseKey);
  try {
    const blinkIdMultiSideRecognizer =
      new BlinkIDReactNative.BlinkIdMultiSideRecognizer();
    blinkIdMultiSideRecognizer.returnFullDocumentImage = true;
    blinkIdMultiSideRecognizer.returnFaceImage = true;

    const scanningResults = await BlinkIDReactNative.BlinkID.scanWithCamera(
      new BlinkIDReactNative.BlinkIdOverlaySettings(),
      new BlinkIDReactNative.RecognizerCollection([blinkIdMultiSideRecognizer]),
      licenseKey,
    );

    if (scanningResults && scanningResults.length > 0) {
      // Handle your results here
      console.log(scanningResults);
    }
  } catch (error) {
    console.error('Scanning failed', error);
  }
}
