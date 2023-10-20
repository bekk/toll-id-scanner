import React, {useContext, FC} from 'react';
import {Text, View} from 'react-native';
import {ThemeContext} from '../../../App';
import {ScanResultType} from '../../../types/scanResultType';

interface DataProps {
  scanningResults: ScanResultType;
}

const DataSummary: FC<DataProps> = ({scanningResults}) => {
  const {spacing, textVariants, dataSummaryStyles} = useContext(ThemeContext);
  const isPassport =
    scanningResults &&
    scanningResults.data.mrzResult.sanitizedDocumentCode[0] === 'P'
      ? true
      : false;

  return (
    <View
      style={{
        margin: spacing.xl,
      }}>
      <View {...dataSummaryStyles?.infoContainer}>
        <Text style={textVariants?.secondaryHeader}>Scanning Results:</Text>
      </View>
      <View {...dataSummaryStyles?.infoContainer}>
        <Text style={textVariants?.body}>Last Name:</Text>
        <Text style={textVariants?.body}>
          {scanningResults.data.lastName.description}
        </Text>
      </View>

      <View {...dataSummaryStyles?.infoContainer}>
        <Text style={textVariants?.body}>First Name:</Text>
        <Text style={textVariants?.body}>
          {scanningResults.data.firstName.description}
        </Text>
      </View>
      <View {...dataSummaryStyles?.infoContainer}>
        <Text style={textVariants?.body}>Document Number:</Text>
        <Text style={textVariants?.body}>
          {scanningResults.data.documentNumber.description}
        </Text>
      </View>

      <View {...dataSummaryStyles?.infoContainer}>
        <Text style={textVariants?.body}>Date of Birth:</Text>
        <Text style={textVariants?.body}>
          {`${scanningResults.data.dateOfBirth.day}/${scanningResults.data.dateOfBirth.month}/${scanningResults.data.dateOfBirth.year}`}
        </Text>
      </View>

      <View {...dataSummaryStyles?.infoContainer}>
        <Text style={textVariants?.body}>Gender:</Text>
        <Text style={textVariants?.body}>
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
            <Text style={textVariants?.body}>Nationality:</Text>
            <Text style={textVariants?.body}>
              {scanningResults.data.nationality.description}
            </Text>
          </View>
          <View
            style={{
              margin: spacing.s,
              alignItems: 'center',
            }}>
            <Text style={textVariants?.body}>Document Type:</Text>
            <Text style={textVariants?.body}>
              {scanningResults.data.mrzResult.sanitizedDocumentCode[0]}
            </Text>
          </View>

          <View
            style={{
              margin: spacing.s,
              alignItems: 'center',
            }}>
            <Text style={textVariants?.body}>Issuer:</Text>
            <Text style={textVariants?.body}>
              {scanningResults.data.mrzResult.issuer}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default DataSummary;
