import {scanId} from './BlinkIdScanner';

export const handleScan = async () => {
  try {
    const scanResult = await scanId();
    console.log('Scan Result:', scanResult);
  } catch (error) {
    console.error('Scanning failed', error);
  }
};
