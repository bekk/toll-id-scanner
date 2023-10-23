import React, {useContext, FC} from 'react';
import {Text, View} from 'react-native';
import {ThemeContext} from '../../../App';
import {ScanResultType} from '@typedefs/scanResultType';
import DataField from './DataField';

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
        <Text {...textVariants?.secondaryHeader}>Scanning Results:</Text>
      </View>
      <DataField
        title="Last Name:"
        data={scanningResults.data.lastName.description}
      />
      <DataField
        title="First Name:"
        data={scanningResults.data.firstName.description}
      />
      <DataField
        title="Document Number:"
        data={scanningResults.data.documentNumber.description}
      />
      <DataField
        title="Date of Birth:"
        data={`${scanningResults.data.dateOfBirth.day}/${scanningResults.data.dateOfBirth.month}/${scanningResults.data.dateOfBirth.year}`}
      />
      <DataField title="Gender" data={scanningResults.data.sex.description} />
      {isPassport && (
        <View>
          <DataField
            title="Nationality:"
            data={scanningResults.data.nationality.description}
            centered
          />
          <DataField
            title="Document Type:"
            data={scanningResults.data.mrzResult.sanitizedDocumentCode[0]}
          />
          <DataField
            title="Issuer:"
            data={scanningResults.data.mrzResult.issuer}
            centered
          />
        </View>
      )}
    </View>
  );
};

export default DataSummary;
