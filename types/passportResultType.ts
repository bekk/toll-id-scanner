interface PassportResultType {
  mrzResult: {
    documentNumber: string;
    dateOfBirth: {
      day: number;
      month: number;
      year: number;
    };
    gender: string;
    nationality: string;
    age: number;
    alienNumber: string;
    applicationReceiptNumber: string;
    dateOfExpiry: {
      day: number;
      month: number;
      year: number;
    };
    documentCode: string;
    documentType: number;
    immigrantCaseNumber: string;
    issuer: string;
    mrzParsed: boolean;
    mrzText: string;
    mrzVerified: boolean;
    opt1: string;
    opt2: string;
    primaryId: string;
    sanitizedDocumentCode: string;
    sanitizedDocumentNumber: string;
    sanitizedIssuer: string;
    sanitizedNationality: string;
    sanitizedOpt1: string;
    sanitizedOpt2: string;
    secondaryId: string;
  };
  faceImage: string | null;
  fullDocumentImage: string | null;
  resultState: number;
}

export default PassportResultType;
