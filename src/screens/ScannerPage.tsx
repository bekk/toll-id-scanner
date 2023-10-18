import React from 'react';
import {View, Text, Button} from 'react-native';
import {scanId, scanPassport} from '../utils/BlinkIdScanner';

const ScannerPage = () => {
  const handleScanId = async () => {
    const scanResult = await scanId();
  };
  const handleScanPassport = async () => {
    const scanResult = await scanPassport();
  };

  return (
    <View>
      <Text>Scanner Page</Text>
      <Button title="Scan ID" onPress={handleScanId} />
      <Button title="Scan Passport" onPress={handleScanPassport} />
    </View>
  );
};

export default ScannerPage;
