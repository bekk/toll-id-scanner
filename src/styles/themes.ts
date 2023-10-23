import {ViewStyle, TextProps} from 'react-native';
import {ButtonProps} from 'react-native-paper';

type Colors = {
  background: string;
  primary: string;
  secondary: string;
  danger: string;
  failure: string;
  success: string;
};

type DataSummaryStyles = {
  container: ViewStyle;
  infoContainer: ViewStyle;
};

type TextVariants = {
  header: TextProps;
  secondaryHeader: TextProps;
  tertiaryHeader: TextProps;
  body: TextProps;
};

type ButtonVariants = {
  primaryButton: Partial<ButtonProps>;
  secondaryButton: Partial<ButtonProps>;
};

interface Theme {
  colors: Colors;
  spacing: Record<string, number>;
  centeredContainer?: Partial<ViewStyle>;
  textVariants?: TextVariants;
  buttonVariants?: ButtonVariants;
  dataSummaryStyles?: DataSummaryStyles;
}

const palette = {
  tollmorkebla: '#12404F',
  tollturkis: '#007682',
  tollgul: '#FFCC05',
  tolloransje: '#F25A22',
  emblemrod: '#EF3E42',
  emblemgul: '#FFD200',
  havbla: '#0097D6',
  magentadyp: '#DA1C5C',
  marinebla: '#0054A6',
  purpur: '#942977',
  lightgrey: '#f5f5f6',
  success: '#5cb85c', // Not official, but need success color
};

const spacing = {
  s: 8,
  m: 16,
  l: 24,
  xl: 40,
};

const textVariants: TextVariants = {
  header: {
    style: {
      fontFamily: 'Roboto',
      fontSize: 32,
      fontWeight: 'bold',
      color: palette.tollmorkebla,
    },
  },
  secondaryHeader: {
    style: {
      fontFamily: 'Roboto',
      fontSize: 24,
      fontWeight: 'normal',
      textAlign: 'center',
      color: palette.tollmorkebla,
    },
  },
  tertiaryHeader: {
    style: {
      fontFamily: 'Roboto',
      fontSize: 20,
      fontWeight: 'normal',
      color: palette.tollmorkebla,
    },
  },
  body: {
    style: {
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: '300',
      color: palette.tollmorkebla,
    },
  },
};

const buttonVariants: ButtonVariants = {
  primaryButton: {
    buttonColor: palette.tollmorkebla,
    textColor: 'white',
    style: {width: 150},
  },
  secondaryButton: {
    buttonColor: 'white',
    textColor: palette.tollturkis,
  },
};
const centeredContainer: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
};

export const theme: Theme = {
  colors: {
    background: palette.lightgrey,
    primary: palette.tollmorkebla,
    secondary: palette.tollturkis,
    danger: palette.tollgul,
    failure: palette.tolloransje,
    success: palette.success,
  },
  spacing,
  centeredContainer,
  textVariants,
  buttonVariants,
  dataSummaryStyles: {
    container: {
      margin: spacing.xl,
      ...centeredContainer,
    },
    infoContainer: {
      margin: spacing.s,
      ...centeredContainer,
    },
  },
};
