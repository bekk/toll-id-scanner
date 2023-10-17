import React from 'react';
import {View, Text, Button} from 'react-native';
import {scanId} from '../utils/BlinkIdScanner';
const ScannerPage = () => {
  const handleScan = async () => {
    try {
      const scanResult = await scanId();
      console.log('Scan Result:', scanResult);
    } catch (error) {
      console.error('Scanning failed', error);
    }
  };

  return (
    <View>
      <Text>Scanner Page</Text>
      <Button title="Scan ID" onPress={handleScan} />
    </View>
  );
};

export default ScannerPage;
