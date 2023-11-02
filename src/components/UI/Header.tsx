import React, {useContext} from 'react';
import {View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {theme} from '@styles/themes';

export const ThemeContext = React.createContext(theme);

const Header = () => {
  const {textVariants} = useContext(ThemeContext);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 30,
        marginHorizontal: 20,
      }}>
      <Image
        source={require('@assets/TolletatEmblem.png')}
        style={{
          marginRight: 10,
          width: 60,
          height: 60,
          objectFit: 'contain',
        }}
        width={50}
      />
      <View style={{marginTop: 30}}>
        <Text {...textVariants?.header}>TOLLETATEN</Text>
        <Text {...textVariants?.tertiaryHeader}>ID-Skanner</Text>
      </View>
    </View>
  );
};

export default Header;
