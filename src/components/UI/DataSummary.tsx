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
      <DataField title="Fornavn:" data={scanningResults.lastName} />
      <DataField title="Etternavn:" data={scanningResults.firstName} />
      <DataField
        title="Dokumentnummer:"
        data={scanningResults.documentNumber}
      />
      <DataField title="Fødselsdag:" data={scanningResults.dateOfBirth} />
      <DataField title="Kjønn" data={scanningResults.gender} />

      {isPassport && (
        <View>
          <DataField
            title="Nasjonalitet:"
            data={scanningResults.nationality || 'N/A'}
            centered
          />
          <DataField
            title="Dokumenttype:"
            data={scanningResults.documentType || 'N/A'}
          />
          <DataField
            title="Utsteder:"
            data={scanningResults.issuer || 'N/A'}
            centered
          />
        </View>
      )}
    </View>
  );
};

export default DataSummary;
