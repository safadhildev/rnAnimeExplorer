import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyText from './MyText';
import Shimmer from './Shimmer';

export const HEADER_TYPE = {
  HEADING: 'HEADING',
  SECTION: 'SECITON',
};

const MyHeader = ({ containerStyle, type, text, isLoading = false }) => {
  const theme = useTheme();

  if (isLoading) {
    return (
      <View style={[styles.container(type), containerStyle]}>
        <Shimmer style={styles.shimmer(type)} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container(type, theme?.colors?.background),
        containerStyle,
      ]}
    >
      <MyText style={styles.text(type, theme?.colors?.text)}>{text}</MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  shimmer: headerType => ({
    height:
      headerType === HEADER_TYPE.HEADING ? 32 : HEADER_TYPE.SECTION ? 28 : 14,
  }),
  container: (headerType, backgroundColor) => ({
    backgroundColor,
    paddingVertical:
      headerType === HEADER_TYPE.HEADING ? 10 : HEADER_TYPE.SECTION ? 6 : 2,
    paddingHorizontal:
      headerType === HEADER_TYPE.HEADING ? 10 : HEADER_TYPE.SECTION ? 6 : 2,
  }),
  text: (headerType, color) => ({
    color,
    fontSize:
      headerType === HEADER_TYPE.HEADING ? 28 : HEADER_TYPE.SECTION ? 20 : 18,
    lineHeight:
      headerType === HEADER_TYPE.HEADING ? 32 : HEADER_TYPE.SECTION ? 28 : 14,
    fontWeight:
      headerType === HEADER_TYPE.HEADING
        ? 900
        : HEADER_TYPE.SECTION
        ? 800
        : 600,
  }),
});

export default MyHeader;
