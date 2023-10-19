import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {Button} from 'react-native-paper';
import {scanId, scanPassport} from '../utils/BlinkIdScanner';
import {ThemeContext} from '../../App';
import {getFormId} from '../utils/getFormId';
import {postData} from '../services/postData';

type ScanningResult = {
  mrzResult: {
    documentNumber: string;
    dateOfBirth: {
      day: number;
      month: number;
      year: number;
    };
    gender: string;
    nationality: string;
  };
};

const initialDummyData = {
  mrzResult: {
    documentNumber: '123456',
    dateOfBirth: {
      day: 1,
      month: 1,
      year: 2000,
    },
    gender: 'M',
    nationality: 'USA',
  },
};

const ScannerPage = () => {
  const [formId, setFormId] = useState('');

  useEffect(() => {
    const unsubscribe = Linking.addEventListener('url', getFormId(setFormId));

    Linking.getInitialURL()
      .then(url => {
        if (url) {
          getFormId(setFormId)({url});
        }
      })
      .catch(err => console.error('An error occurred', err));

    return () => {
      unsubscribe.remove();
    };
  }, []);

  const {buttonVariants, textVariants, spacing} = useContext(ThemeContext);

  const [scanningResults, setScanningResults] = useState<
    ScanningResult[] | null
  >([initialDummyData]);

  const handleScanId = async () => {
    const scanResult = await scanId();
    setScanningResults(scanResult);
  };
  const handleScanPassport = async () => {
    const scanResult = await scanPassport();
    setScanningResults(scanResult);
  };

  return (
    <View style={{backgroundColor: 'black'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <Button {...buttonVariants.primaryButton} onPress={handleScanId}>
          Scan ID
        </Button>
        <Button {...buttonVariants.primaryButton} onPress={handleScanPassport}>
          Scan Passport
        </Button>
      </View>
      <View>
        <Text
          style={{
            ...textVariants.secondaryHeader,
            textAlign: 'center',
          }}>
          Form ID:
        </Text>
        <Text
          style={{
            ...textVariants.secondaryHeader,
            textAlign: 'center',
          }}>
          {formId}
        </Text>
      </View>
      {scanningResults && (
        <View
          style={{
            margin: spacing.xl,
          }}>
          <View style={{margin: spacing.s, alignItems: 'center'}}>
            <Text style={textVariants.secondaryHeader}>Scanning Results:</Text>
          </View>
          <View style={{margin: spacing.s, alignItems: 'center'}}>
            <Text style={textVariants.body}>Document Number:</Text>
            <Text style={textVariants.body}>
              {scanningResults[0].mrzResult.documentNumber}
            </Text>
          </View>
          <View style={{margin: spacing.s, alignItems: 'center'}}>
            <Text style={textVariants.body}>Date of Birth:</Text>
            <Text style={textVariants.body}>
              {`${scanningResults[0].mrzResult.dateOfBirth.day}/${scanningResults[0].mrzResult.dateOfBirth.month}/${scanningResults[0].mrzResult.dateOfBirth.year}`}
            </Text>
          </View>
          <View style={{margin: spacing.s, alignItems: 'center'}}>
            <Text style={textVariants.body}>Gender:</Text>
            <Text style={textVariants.body}>
              {scanningResults[0].mrzResult.gender}
            </Text>
          </View>
          <View style={{margin: spacing.s, alignItems: 'center'}}>
            <Text style={textVariants.body}>Nationality:</Text>
            <Text style={textVariants.body}>
              {scanningResults[0].mrzResult.nationality}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <Button
              {...buttonVariants.primaryButton}
              onPress={() => postData(scanningResults)}>
              Confirm
            </Button>
            <Button {...buttonVariants.primaryButton} onPress={handleScanId}>
              Scan Again
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default ScannerPage;
