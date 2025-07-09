import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyText from './MyText';
import Shimmer from './Shimmer';

export const HEADER_TYPE = {
  HEADING: 'HEADING',
  SECTION: 'SECITON',
};

const MyHeader = ({
  containerStyle,
  style,
  type = HEADER_TYPE.HEADING,
  text,
  isLoading = false,
  sticky = false,
}) => {
  const theme = useTheme();

  if (isLoading) {
    return (
      <View style={[styles.container(type), containerStyle]}>
        <Shimmer style={styles.shimmer(type)} />
      </View>
    );
  }

  console.log('[DEBUG] >> theme?.colors?.text >> ', theme?.colors?.text);
  return (
    <View style={[styles.container(type, theme, sticky), containerStyle]}>
      <MyText style={[styles.text(type), style]}>{text}</MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  shimmer: headerType => ({
    height:
      headerType === HEADER_TYPE.HEADING ? 32 : HEADER_TYPE.SECTION ? 28 : 14,
  }),
  container: (headerType, theme, sticky) => ({
    flexDirection: 'row',
    backgroundColor: sticky ? theme?.colors?.background : 'transparent',
    paddingVertical:
      headerType === HEADER_TYPE.HEADING ? 10 : HEADER_TYPE.SECTION ? 6 : 2,
    paddingHorizontal:
      headerType === HEADER_TYPE.HEADING ? 10 : HEADER_TYPE.SECTION ? 6 : 2,
  }),
  text: headerType => ({
    fontSize:
      headerType === HEADER_TYPE.HEADING ? 24 : HEADER_TYPE.SECTION ? 18 : 14,
    lineHeight:
      headerType === HEADER_TYPE.HEADING ? 28 : HEADER_TYPE.SECTION ? 22 : 18,
    fontWeight:
      headerType === HEADER_TYPE.HEADING
        ? 900
        : HEADER_TYPE.SECTION
        ? 800
        : 600,
  }),
});

export default MyHeader;
