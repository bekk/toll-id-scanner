import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Touchable,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {scanId, scanPassport} from '../utils/BlinkIdScanner';
import {ThemeContext} from '../../App';
import {getFormId} from '../utils/getFormId';

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

  const themeFromContext = useContext(ThemeContext);

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
  console.log(scanningResults);

  return (
    <View style={{backgroundColor: themeFromContext.colors.background}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          style={themeFromContext.buttonStyles.primaryButton}
          onPress={handleScanId}>
          <Text
            style={{
              color: themeFromContext.buttonStyles.primaryButton.textColor,
            }}>
            Scan ID
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={themeFromContext.buttonStyles.primaryButton}
          onPress={handleScanPassport}>
          <Text
            style={{
              color: themeFromContext.buttonStyles.primaryButton.textColor,
            }}>
            Scan Passport
          </Text>
        </TouchableOpacity>
      </View>
      {scanningResults && (
        <View
          style={{
            margin: themeFromContext.spacing.xl,
          }}>
          <View
            style={{margin: themeFromContext.spacing.s, alignItems: 'center'}}>
            <Text style={themeFromContext.textVariants.secondaryHeader}>
              Scanning Results:
            </Text>
          </View>

          <View
            style={{margin: themeFromContext.spacing.s, alignItems: 'center'}}>
            <Text style={themeFromContext.textVariants.body}>
              Document Number:
            </Text>
            <Text style={themeFromContext.textVariants.body}>
              {scanningResults[0].mrzResult.documentNumber}
            </Text>
          </View>

          <View
            style={{margin: themeFromContext.spacing.s, alignItems: 'center'}}>
            <Text style={themeFromContext.textVariants.body}>
              Date of Birth:
            </Text>
            <Text style={themeFromContext.textVariants.body}>
              {`${scanningResults[0].mrzResult.dateOfBirth.day}/${scanningResults[0].mrzResult.dateOfBirth.month}/${scanningResults[0].mrzResult.dateOfBirth.year}`}
            </Text>
          </View>

          <View
            style={{margin: themeFromContext.spacing.s, alignItems: 'center'}}>
            <Text style={themeFromContext.textVariants.body}>Gender:</Text>
            <Text style={themeFromContext.textVariants.body}>
              {scanningResults[0].mrzResult.gender}
            </Text>
          </View>

          <View
            style={{margin: themeFromContext.spacing.s, alignItems: 'center'}}>
            <Text style={themeFromContext.textVariants.body}>Nationality:</Text>
            <Text style={themeFromContext.textVariants.body}>
              {scanningResults[0].mrzResult.nationality}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default ScannerPage;
