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

const ThemeContext = React.createContext(theme);

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
    <View style={{backgroundColor: themeFromContext.colors.primary}}>
      <SafeAreaView>
        <ThemedComponent />
      </SafeAreaView>
    </View>
  );
};

const ThemedComponent = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}>
      <Text>Tolletaten Mobilapp</Text>
      <ScannerPage />
    </View>
  );
};

export default App;
