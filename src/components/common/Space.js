import React from 'react';
import { StyleSheet, View } from 'react-native';

const Space = ({ size = 0, horizontal = false, grow }) => {
  return <View style={styles.default(size, horizontal, grow)} />;
};

const styles = StyleSheet.create({
  default: (size, horizontal, grow) => ({
    width: horizontal ? size : 0,
    height: horizontal ? 0 : size,
    flexGrow: grow ? 1 : 0,
  }),
});

export default Space;
