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

function getNationality(obj: ScanResultType) {
  if (obj.data.nationality && obj.data.nationality.description) {
    return obj.data.nationality.description;
  }
  if (obj.data.mrzResult && obj.data.mrzResult.nationality) {
    return obj.data.mrzResult.nationality;
  }
  return null;
}

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
    nationality: getNationality(scanningResults),
    documentType: isPassport
      ? scanningResults.data.mrzResult.sanitizedDocumentCode[0]
      : null,
    issuer: isPassport ? scanningResults.data.mrzResult.issuer : null,
  };

  return formattedData;
};
