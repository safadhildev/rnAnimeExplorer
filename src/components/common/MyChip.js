import Icon from '@react-native-vector-icons/material-design-icons';
import { useTheme } from '@react-navigation/native';
import { isFunction } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import MyText from './MyText';
import { BUTTON_ICON_POSITION } from '../constants';

const MyChip = ({
  color,
  accent,
  text,
  textStyle,
  icon,
  iconColor,
  iconSize,
  iconStyle,
  onPress,
  iconPosition = BUTTON_ICON_POSITION.LEFT,
}) => {
  const theme = useTheme();

  const _renderIcon = () => {
    return (
      <Icon
        name={icon}
        size={iconSize}
        color={iconColor ? iconColor : accent || theme?.colors?.primary}
        style={[
          styles.icon(iconPosition === BUTTON_ICON_POSITION.LEFT),
          iconStyle,
        ]}
      />
    );
  };

  return (
    <Pressable
      disabled={!isFunction(onPress)}
      onPress={onPress}
      style={({ pressed }) =>
        styles.container(pressed, color, accent || theme?.colors?.primary)
      }
    >
      {({ pressed }) => (
        <>
          {icon && iconPosition === BUTTON_ICON_POSITION.LEFT && _renderIcon()}
          <MyText
            style={[styles.text(accent || theme?.colors?.primary), textStyle]}
          >
            {text}
          </MyText>
          {icon && iconPosition === BUTTON_ICON_POSITION.RIGHT && _renderIcon()}
        </>
      )}
    </Pressable>
  );
};

MyChip.propTypes = {
  text: PropTypes.str,
  textStyle: PropTypes.obj,
  icon: PropTypes.str,
  iconColor: PropTypes.str,
  iconSize: PropTypes.number,
  iconStyle: PropTypes.obj,
};

MyChip.propTypes = {
  text: null,
  textStyle: {},
  icon: null,
  iconColor: null,
  iconSize: 16,
  iconStyle: {},
};

const styles = StyleSheet.create({
  container: (pressed, backgroundColor, borderColor) => ({
    backgroundColor,
    borderWidth: 1,
    borderColor,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    borderRadius: 8,
    marginTop: -2,
    flexDirection: 'row',
    paddingHorizontal: 10,
    transform: [{ scale: pressed ? 0.9 : 1 }],
  }),
  text: color => ({ color, fontSize: 12 }),
  icon: isLeft => ({ marginLeft: isLeft ? -5 : 0 }),
});

export default MyChip;
