interface IdResultType {
  additionalAddressInformation: Record<string, unknown>;
  additionalNameInformation: Record<string, unknown>;
  additionalOptionalAddressInformation: Record<string, unknown>;
  address: Record<string, unknown>;
  age: number;
  classInfo: {
    country: number;
    countryName: string;
    empty: boolean;
    isoAlpha2CountryCode: string;
    isoAlpha3CountryCode: string;
    isoNumericCountryCode: string;
    region: number;
    type: number;
  };
  dataMatchResult: {
    stateForWholeDocument: number;
    states: number[];
  };
  dateOfBirth: {
    day: number;
    month: number;
    year: number;
  };
  dateOfExpiry: {
    day: number;
    month: number;
    year: number;
  };
  dateOfExpiryPermanent: boolean;
  dateOfIssue: {
    day: number;
    month: number;
    year: number;
  };
  documentAdditionalNumber: {
    arabic: string;
    cyrillic: string;
    description: string;
    latin: string;
  };
  documentDataMatch: number;
  documentNumber: {
    arabic: string;
    cyrillic: string;
    description: string;
    latin: string;
  };
  documentOptionalAdditionalNumber: Record<string, unknown>;
  driverLicenseDetailedInfo: {
    conditions: Record<string, unknown>[];
    endorsements: Record<string, unknown>[];
    restrictions: Record<string, unknown>[];
    vehicleClass: Record<string, unknown>[];
    vehicleClassesInfo: Record<string, unknown>[];
  };
  employer: Record<string, unknown>;
  expired: boolean;
  faceImage: undefined;
  fathersName: Record<string, unknown>;
  firstName: {
    arabic: string;
    cyrillic: string;
    description: string;
    latin: string;
  };
  fullName: Record<string, unknown>;
  issuingAuthority: Record<string, unknown>;
  lastName: {
    arabic: string;
    cyrillic: string;
    description: string;
    latin: string;
  };
  localizedName: Record<string, unknown>;
  maritalStatus: Record<string, unknown>;
  mothersName: Record<string, unknown>;
  mrzResult: {
    age: number;
    alienNumber: string;
    applicationReceiptNumber: string;
    dateOfBirth: Date;
    dateOfExpiry: Date;
    documentCode: string;
    documentNumber: string;
    documentType: number;
    gender: string;
    immigrantCaseNumber: string;
    issuer: string;
    mrzParsed: boolean;
    mrzText: string;
    mrzVerified: boolean;
    nationality: string;
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
  nationality: {
    arabic: string;
    cyrillic: string;
    description: string;
    latin: string;
  };
  personalIdNumber: {
    arabic: string;
    cyrillic: string;
    description: string;
    latin: string;
  };
  placeOfBirth: Record<string, unknown>;
  processingStatus: number;
  profession: Record<string, unknown>;
  race: Record<string, unknown>;
  recognitionMode: number;
  religion: Record<string, unknown>;
  residentialStatus: Record<string, unknown>;
  resultState: number;
  scanningFirstSideDone: boolean;
  sex: {
    arabic: string;
    cyrillic: string;
    description: string;
    latin: string;
  };
  signatureImage: undefined;
}

export default IdResultType;
