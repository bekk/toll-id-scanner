import React, {useContext} from 'react';
<<<<<<< HEAD
import {View, Image} from 'react-native';
import {Text} from 'react-native-paper';
=======
import {Text, View, Image} from 'react-native';
>>>>>>> origin/main
import {theme} from '@styles/themes';

export const ThemeContext = React.createContext(theme);

const Header = () => {
  const {textVariants} = useContext(ThemeContext);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
<<<<<<< HEAD
        marginTop: 5,
=======
        marginTop: 15,
>>>>>>> origin/main
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
<<<<<<< HEAD
      <View style={{marginTop: 30}}>
        <Text {...textVariants?.header}>TOLLETATEN</Text>
=======
      <View>
        <Text
          style={{
            marginTop: 30,
          }}
          {...textVariants?.header}>
          TOLLETATEN
        </Text>
>>>>>>> origin/main
        <Text {...textVariants?.tertiaryHeader}>ID-Scanner</Text>
      </View>
    </View>
  );
};

export default Header;
