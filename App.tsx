/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useContext} from 'react';
import {SafeAreaView, View} from 'react-native';
import {theme} from './src/styles/themes';
import ScannerPage from './src/screens/ScannerPage';
import Header from './src/components/UI/Header';

export const ThemeContext = React.createContext(theme);

const App = () => {
  return (
    <ThemeContext.Provider value={theme}>
      <MainComponent />
    </ThemeContext.Provider>
  );
};

const MainComponent = () => {
  const {colors} = useContext(ThemeContext);

  return (
    <View
      style={{
        backgroundColor: colors.background,
        height: '100%',
      }}>
      <SafeAreaView>
        <ThemedComponent />
      </SafeAreaView>
    </View>
  );
};

const ThemedComponent = () => (
  <View>
    <Header />
    <ScannerPage />
  </View>
);

export default App;
