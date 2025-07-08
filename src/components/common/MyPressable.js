import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

const MyPressable = ({ children, disabled, onPress, style }) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [style, styles.default(pressed)]}
    >
      {({ pressed }) => children({ pressed })}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  default: pressed => ({ transform: [{ scale: pressed ? 0.99 : 1 }] }),
});

export default MyPressable;
