import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { BLACK, WHITE } from './colors';
import { useTheme } from '@react-navigation/native';

const MyText = ({ style, children, ...props }) => {
  const theme = useTheme();

  return (
    <Text
      allowFontScaling={false}
      style={[styles?.default(theme), style]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: theme => ({
    fontSize: 16,
    fontWeight: 400,
    color: theme?.colors?.text,
  }),
});

export default MyText;
