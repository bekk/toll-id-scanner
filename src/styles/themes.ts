import {TextStyle} from 'react-native';

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
};

interface ButtonStyles {
  backgroundColor: string;
  textColor: string;
  padding: number;
  borderRadius: number;
}
interface Theme {
  colors: Record<string, string>;
  spacing: Record<string, number>;
  textVariants: Record<string, TextStyle>;
  buttonStyles: Record<string, ButtonStyles>;
}

export const theme: Theme = {
  colors: {
    background: palette.lightgrey,
    primary: palette.tollmorkebla,
    secondary: palette.tollturkis,
    danger: palette.tollgul,
    failure: palette.tolloransje,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontFamily: 'Roboto',
      fontSize: 36,
      fontWeight: 'bold',
    },
    secondaryHeader: {
      fontFamily: 'Roboto',
      fontSize: 24,
      fontWeight: 'normal',
    },
    body: {
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: '300',
    },
  },
  buttonStyles: {
    primaryButton: {
      backgroundColor: palette.tollmorkebla, // Use your defined color from the palette
      textColor: 'white',
      padding: 12, // Adjust padding as needed
      borderRadius: 8, // Adjust border radius as needed
    },
    secondaryButton: {
      backgroundColor: 'white',
      textColor: palette.tollturkis, // Use your defined color from the palette
      padding: 12, // Adjust padding as needed
      borderRadius: 8, // Adjust border radius as needed
    },
  },
};
/*
export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.black,
    foreground: palette.white,
  },
};
 */
