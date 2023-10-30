import React, {useContext, FC} from 'react';
import {Text, View} from 'react-native';
import {ThemeContext} from '../../../App';
import DataField from './DataField';
import {FormattedScanningResults} from '@utils/formatScanningResults';

interface DataProps {
  scanningResults: FormattedScanningResults;
}

const DataSummary: FC<DataProps> = ({scanningResults}) => {
  const {spacing, textVariants, dataSummaryStyles} = useContext(ThemeContext);

  // With the updated FormattedScanningResults, this check might need to be updated based on your logic
  const isPassport = scanningResults.documentType === 'P';

  return (
    <View style={{margin: spacing.xl}}>
      <View {...dataSummaryStyles?.infoContainer}>
        <Text {...textVariants?.secondaryHeader}>Scanning Results:</Text>
      </View>
      <DataField title="Last Name:" data={scanningResults.lastName} />
      <DataField title="First Name:" data={scanningResults.firstName} />
      <DataField
        title="Document Number:"
        data={scanningResults.documentNumber}
      />
      <DataField title="Date of Birth:" data={scanningResults.dateOfBirth} />
      <DataField title="Gender" data={scanningResults.gender} />

      {isPassport && (
        <View>
          <DataField
            title="Nationality:"
            data={scanningResults.nationality || 'N/A'}
            centered
          />
          <DataField
            title="Document Type:"
            data={scanningResults.documentType || 'N/A'}
          />
          <DataField
            title="Issuer:"
            data={scanningResults.issuer || 'N/A'}
            centered
          />
        </View>
      )}
    </View>
  );
};

export default DataSummary;
