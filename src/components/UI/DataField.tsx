import React, {FC, useContext} from 'react';
import {View, Text} from 'react-native';
import {ThemeContext} from './Header';

interface DataFieldProps {
  title: string;
  data: string;
  centered?: boolean;
}

const DataField: FC<DataFieldProps> = ({title, data, centered}) => {
  const {textVariants, dataSummaryStyles, spacing} = useContext(ThemeContext);
  return (
    <View
      {...dataSummaryStyles?.infoContainer}
      style={
        centered && {
          margin: spacing.s,
          alignItems: 'center',
        }
      }>
      <Text {...textVariants?.body}>{title}</Text>
      <Text {...textVariants?.body}>{data}</Text>
    </View>
  );
};

export default DataField;
