import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View, Linking} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {ThemeContext} from '../../App';
import {getFormId} from '@utils/getFormId';
import {scan} from '@utils/BlinkIdScanner';

import {postData} from '@services/postData';
import DataSummary from '@components/UI/DataSummary';
import {ScanResultType} from '@typedefs/scanResultType';
import {formatScanningResults} from '@utils/formatScanningResults';

const ScannerPage = () => {
  const {buttonVariants, textVariants, centeredContainer, colors} =
    useContext(ThemeContext);

  const [scanningResults, setScanningResults] = useState<ScanResultType | null>(
    null,
  );
  const [formId, setFormId] = useState('');
  const handleScan = useCallback(async () => {
    const scanResult = await scan();
    scanResult && setScanningResults({formId: formId, data: scanResult[0]});
  }, [formId]);
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

  useEffect(() => {
    !formId && setScanningResults(null);
    if (formId && !scanningResults) {
      handleScan();
    }
  }, [formId, handleScan, scanningResults]);

  return (
    <View style={{backgroundColor: colors.background}}>
      {!scanningResults ? (
        formId ? (
          <>
            <Text {...textVariants?.secondaryHeader}>FormId: </Text>
            <Text {...textVariants?.secondaryHeader}>{formId}</Text>
            <View style={centeredContainer}>
              <Button {...buttonVariants?.primaryButton} onPress={handleScan}>
                Skann id
              </Button>
            </View>
          </>
        ) : (
          <Text {...textVariants?.body} style={{marginHorizontal: 30}}>
            Finner ikke skjema-id. Åpne appen med riktig skjema-id ved å trykke
            på "Skann id"-knappen i skjemaet.
          </Text>
        )
      ) : (
        <View>
          <DataSummary
            scanningResults={formatScanningResults(scanningResults)}
          />
          <View style={centeredContainer}>
            <Button
              {...buttonVariants?.primaryButton}
              buttonColor={colors.success}
              onPress={() =>
                postData(scanningResults).then(() => setFormId(''))
              }>
              Bekreft
            </Button>
            <Button
              {...buttonVariants?.primaryButton}
              buttonColor={colors.failure}
              onPress={handleScan}>
              Scan Again
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default ScannerPage;
