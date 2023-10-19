/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useContext} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {theme} from './src/styles/themes';
import ScannerPage from './src/screens/ScannerPage';

export const ThemeContext = React.createContext(theme);

const App = () => {
  return (
    <ThemeContext.Provider value={theme}>
      <MainComponent />
    </ThemeContext.Provider>
  );
};

const MainComponent = () => {
  const themeFromContext = useContext(ThemeContext);

  return (
    <View
      style={{
        backgroundColor: themeFromContext.colors.background,
      }}>
      <SafeAreaView>
        <ThemedComponent />
      </SafeAreaView>
    </View>
  );
};

const ThemedComponent = () => {
  const themeFromContext = useContext(ThemeContext);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}>
      <Text
        style={{
          margin: themeFromContext.spacing.s,
          textAlign: 'center',
          fontSize: themeFromContext.textVariants.header.fontSize,
          fontWeight: themeFromContext.textVariants.header.fontWeight,
          color: themeFromContext.textVariants.header.color,
        }}>
        Tolletaten Mobilapp
      </Text>

      <ScannerPage />
    </View>
  );
};

export default App;
