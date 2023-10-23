import React, {useContext} from 'react';
import {Text, View, Image} from 'react-native';
import {theme} from '@styles/themes';

export const ThemeContext = React.createContext(theme);

const Header = () => {
  const {textVariants} = useContext(ThemeContext);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
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
      <View>
        <Text
          style={{
            marginTop: 30,
          }}
          {...textVariants?.header}>
          TOLLETATEN
        </Text>
        <Text {...textVariants?.tertiaryHeader}>ID-Scanner</Text>
      </View>
    </View>
  );
};

export default Header;
