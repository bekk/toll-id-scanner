import {ScanResultType} from '@typedefs/ScanResultType';

export type FormattedScanningResults = {
  lastName: string;
  firstName: string;
  documentNumber: string;
  dateOfBirth: string;
  gender: string;
  nationality: string | null;
  documentType: string | null;
  issuer: string | null;
};

export const formatScanningResults = (
  scanningResults: ScanResultType,
): FormattedScanningResults => {
  const isPassport =
    scanningResults &&
    scanningResults.data.mrzResult.sanitizedDocumentCode[0] === 'P';

  const formattedData = {
    lastName: scanningResults.data.lastName.description,
    firstName: scanningResults.data.firstName.description,
    documentNumber: scanningResults.data.documentNumber.description,
    dateOfBirth: `${scanningResults.data.dateOfBirth.day}/${scanningResults.data.dateOfBirth.month}/${scanningResults.data.dateOfBirth.year}`,
    gender: scanningResults.data.sex.description,
    nationality: isPassport
      ? scanningResults.data.nationality.description
      : null,
    documentType: isPassport
      ? scanningResults.data.mrzResult.sanitizedDocumentCode[0]
      : null,
    issuer: isPassport ? scanningResults.data.mrzResult.issuer : null,
  };

  return formattedData;
};
