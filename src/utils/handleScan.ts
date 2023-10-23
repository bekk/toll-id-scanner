import {scan} from './BlinkIdScanner';

export const handleScan = async () => {
  try {
    const scanResult = await scan();
    console.log('Scan Result:', scanResult);
  } catch (error) {
    console.error('Scanning failed', error);
  }
};
