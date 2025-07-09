import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

const MyCard = ({ children, onPress, disabled, containerStyle }) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.default(pressed), containerStyle]}
    >
      {({ pressed }) => children({ pressed })}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  default: () => ({}),
});

export default MyCard;
