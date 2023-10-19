import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Button, Linking} from 'react-native';
import {ThemeContext} from '../../App';
import {scan} from '../utils/BlinkIdScanner';
import ScanResultType from '../../types/scanResultType';
import {postData} from '../services/postData';
import {getFormId} from '../utils/getFormId';

const ScannerPage = () => {
  const themeFromContext = useContext(ThemeContext);

  const [scanningResults, setScanningResults] = useState<
    ScanResultType[] | null
  >(null);

  const handleScan = async () => {
    const scanResult = await scan();
    setScanningResults(scanResult);
  };

  const isPassport =
    scanningResults &&
    scanningResults[0].mrzResult.sanitizedDocumentCode[0] === 'P'
      ? true
      : false;

  const [formId, setFormId] = useState('1234');

  const testData = {
    data: {
      name: 'John Doe',
      email: 'JohnDoe@mail.com',
      phone: '48191919',
      address: '123 Main St',
      country: 'Norway',
    },
    formId,
  };

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

  return (
    <View style={{backgroundColor: themeFromContext.colors.background}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          style={themeFromContext.buttonStyles.primaryButton}
          onPress={handleScan}>
          <Text
            style={{
              color: themeFromContext.buttonStyles.primaryButton.textColor,
            }}>
            Scan ID
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={themeFromContext.buttonStyles.primaryButton}
          onPress={() => postData(testData)}>
          <Text
            style={{
              color: themeFromContext.buttonStyles.primaryButton.textColor,
            }}>
            Post Data
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
            style={{
              margin: themeFromContext.spacing.s,
              alignItems: 'center',
            }}>
            <Text style={themeFromContext.textVariants.body}>Last Name:</Text>
            <Text style={themeFromContext.textVariants.body}>
              {scanningResults[0].lastName.description}
            </Text>
          </View>

          <View
            style={{
              margin: themeFromContext.spacing.s,
              alignItems: 'center',
            }}>
            <Text style={themeFromContext.textVariants.body}>First Name:</Text>
            <Text style={themeFromContext.textVariants.body}>
              {scanningResults[0].firstName.description}
            </Text>
          </View>
          <View
            style={{margin: themeFromContext.spacing.s, alignItems: 'center'}}>
            <Text style={themeFromContext.textVariants.body}>
              Document Number:
            </Text>
            <Text style={themeFromContext.textVariants.body}>
              {scanningResults[0].documentNumber.description}
            </Text>
          </View>

          <View
            style={{margin: themeFromContext.spacing.s, alignItems: 'center'}}>
            <Text style={themeFromContext.textVariants.body}>
              Date of Birth:
            </Text>
            <Text style={themeFromContext.textVariants.body}>
              {`${scanningResults[0].dateOfBirth.day}/${scanningResults[0].dateOfBirth.month}/${scanningResults[0].dateOfBirth.year}`}
            </Text>
          </View>

          <View
            style={{margin: themeFromContext.spacing.s, alignItems: 'center'}}>
            <Text style={themeFromContext.textVariants.body}>Gender:</Text>
            <Text style={themeFromContext.textVariants.body}>
              {scanningResults[0].sex.description}
            </Text>
          </View>
          {isPassport && (
            <View>
              <View
                style={{
                  margin: themeFromContext.spacing.s,
                  alignItems: 'center',
                }}>
                <Text style={themeFromContext.textVariants.body}>
                  Nationality:
                </Text>
                <Text style={themeFromContext.textVariants.body}>
                  {scanningResults[0].nationality.description}
                </Text>
              </View>
              <View
                style={{
                  margin: themeFromContext.spacing.s,
                  alignItems: 'center',
                }}>
                <Text style={themeFromContext.textVariants.body}>
                  Document Type:
                </Text>
                <Text style={themeFromContext.textVariants.body}>
                  {scanningResults[0].mrzResult.sanitizedDocumentCode[0]}
                </Text>
              </View>

              <View
                style={{
                  margin: themeFromContext.spacing.s,
                  alignItems: 'center',
                }}>
                <Text style={themeFromContext.textVariants.body}>Issuer:</Text>
                <Text style={themeFromContext.textVariants.body}>
                  {scanningResults[0].mrzResult.issuer}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ScannerPage;
