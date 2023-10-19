import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Linking} from 'react-native';
import {Button} from 'react-native-paper';
import {ThemeContext} from '../../App';
import {getFormId} from '../utils/getFormId';
import {scan} from '../utils/BlinkIdScanner';
import ScanResultType from '../../types/scanResultType';
import {postData} from '../services/postData';

const ScannerPage = () => {
  const {buttonVariants, textVariants, spacing} = useContext(ThemeContext);

  const [scanningResults, setScanningResults] = useState<ScanResultType | null>(
    null,
  );
  const [formId, setFormId] = useState('');

  const handleScan = async () => {
    const scanResult = await scan();
    setScanningResults({formId: formId, data: scanResult[0]});
  };

  const isPassport =
    scanningResults &&
    scanningResults.data.mrzResult.sanitizedDocumentCode[0] === 'P'
      ? true
      : false;

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
  console.log(scanningResults);
  return (
    <View style={{backgroundColor: 'black'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <Button {...buttonVariants.primaryButton} onPress={handleScan}>
          Scan ID
        </Button>
      </View>
      <Text style={{...textVariants.secondaryHeader, textAlign: 'center'}}>
        FormId:{' '}
      </Text>
      <Text style={{...textVariants.secondaryHeader, textAlign: 'center'}}>
        {formId}
      </Text>

      {scanningResults && (
        <View
          style={{
            margin: spacing.xl,
          }}>
          <View style={{margin: spacing.s, alignItems: 'center'}}>
            <Text style={textVariants.secondaryHeader}>Scanning Results:</Text>
          </View>
          <View
            style={{
              margin: spacing.s,
              alignItems: 'center',
            }}>
            <Text style={textVariants.body}>Last Name:</Text>
            <Text style={textVariants.body}>
              {scanningResults.data.lastName.description}
            </Text>
          </View>

          <View
            style={{
              margin: spacing.s,
              alignItems: 'center',
            }}>
            <Text style={textVariants.body}>First Name:</Text>
            <Text style={textVariants.body}>
              {scanningResults.data.firstName.description}
            </Text>
          </View>
          <View style={{margin: spacing.s, alignItems: 'center'}}>
            <Text style={textVariants.body}>Document Number:</Text>
            <Text style={textVariants.body}>
              {scanningResults.data.documentNumber.description}
            </Text>
          </View>

          <View style={{margin: spacing.s, alignItems: 'center'}}>
            <Text style={textVariants.body}>Date of Birth:</Text>
            <Text style={textVariants.body}>
              {`${scanningResults.data.dateOfBirth.day}/${scanningResults.data.dateOfBirth.month}/${scanningResults.data.dateOfBirth.year}`}
            </Text>
          </View>

          <View style={{margin: spacing.s, alignItems: 'center'}}>
            <Text style={textVariants.body}>Gender:</Text>
            <Text style={textVariants.body}>
              {scanningResults.data.sex.description}
            </Text>
          </View>
          {isPassport && (
            <View>
              <View
                style={{
                  margin: spacing.s,
                  alignItems: 'center',
                }}>
                <Text style={textVariants.body}>Nationality:</Text>
                <Text style={textVariants.body}>
                  {scanningResults.data.nationality.description}
                </Text>
              </View>
              <View
                style={{
                  margin: spacing.s,
                  alignItems: 'center',
                }}>
                <Text style={textVariants.body}>Document Type:</Text>
                <Text style={textVariants.body}>
                  {scanningResults.data.mrzResult.sanitizedDocumentCode[0]}
                </Text>
              </View>

              <View
                style={{
                  margin: spacing.s,
                  alignItems: 'center',
                }}>
                <Text style={textVariants.body}>Issuer:</Text>
                <Text style={textVariants.body}>
                  {scanningResults.data.mrzResult.issuer}
                </Text>
              </View>
            </View>
          )}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <Button
              {...buttonVariants.primaryButton}
              onPress={() =>
                postData(scanningResults).then(() => setScanningResults(null))
              }>
              Confirm
            </Button>
            <Button {...buttonVariants.primaryButton} onPress={handleScan}>
              Scan Again
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default ScannerPage;
