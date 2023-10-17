import {TextStyle, ViewStyle} from 'react-native';

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

interface Theme {
  colors: Record<string, string>;
  spacing: Record<string, number>;
  textVariants: Record<string, TextStyle>;
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
    body: {
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: '300',
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
