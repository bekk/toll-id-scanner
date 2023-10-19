import React, {useContext, useState} from 'react';
import {View, Text, Button, Touchable, TouchableOpacity} from 'react-native';
import {scanId, scanPassport} from '../utils/BlinkIdScanner';
import {ThemeContext} from '../../App';
import IdResultType from '../../types/idResultType';
import PassportResultType from '../../types/passportResultType';

const ScannerPage = () => {
  const themeFromContext = useContext(ThemeContext);

  const initialDummyDataPassport = {
    faceImage: null,
    fullDocumentImage: null,
    mrzResult: {
      age: 30,
      alienNumber: 'A1234567',
      applicationReceiptNumber: '1234567890',
      dateOfBirth: {
        day: 1,
        month: 2,
        year: 2023,
      },
      dateOfExpiry: {
        day: 1,
        month: 2,
        year: 2029,
      },
      documentCode: 'ID',
      documentNumber: 'X98765432',
      documentType: 1,
      gender: 'M',
      immigrantCaseNumber: '9876543210',
      issuer: 'USA',
      mrzParsed: true,
      mrzText:
        'IDUSAADAMS<<JOHN<ALLEN<<<<<<<<<<<<<<<<<<<<<\nX98765432792051981231281231X1234567890',
      mrzVerified: true,
      nationality: 'USA',
      opt1: '82051981231281231X',
      opt2: 'X1234567890',
      primaryId: 'JOHN ALLEN',
      sanitizedDocumentCode: 'ID',
      sanitizedDocumentNumber: 'X98765432',
      sanitizedIssuer: 'USA',
      sanitizedNationality: 'USA',
      sanitizedOpt1: '82051981231281231X',
      sanitizedOpt2: 'X1234567890',
      secondaryId: 'ADAMS',
    },
    resultState: 2,
  };
  const [scanningResults, setScanningResults] = useState<
    PassportResultType[] | null
  >([initialDummyDataPassport]);

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
