import React from 'react';
import { StyleSheet, View } from 'react-native';

const Space = ({ size = 0, horizontal = false }) => {
  return <View style={styles.default(size, horizontal)} />;
};

const styles = StyleSheet.create({
  default: (size, horizontal) => ({
    width: horizontal ? size : 0,
    height: horizontal ? 0 : size,
  }),
});

export default Space;
