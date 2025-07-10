import Icon from '@react-native-vector-icons/material-design-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import {
  BUTTON_ICON_POSITION,
  BUTTON_TYPE,
  BUTTON_TYPE_LIST,
} from '../constants';
import MyText from './MyText';

const MyButton = ({
  icon,
  iconPosition = BUTTON_ICON_POSITION.RIGHT,
  iconSize = 18,
  iconColor,
  circle,
  float,
  hideBorder = false,
  type = null,
  disabled = false,
  onPress = () => {},
  containerStyle,
  text,
  textStyle,
  hideBackground = false,
  vertical = false,
}) => {
  const theme = useTheme();

  const _renderIcon = () => (
    <Icon
      name={icon}
      size={iconSize}
      color={iconColor || buttonStyles?.text}
      style={{
        marginRight:
          text && iconPosition === BUTTON_ICON_POSITION?.LEFT ? 10 : 0,
        marginLeft:
          text && iconPosition === BUTTON_ICON_POSITION?.RIGHT ? 10 : 0,
      }}
    />
  );

  const buttonStyles = BUTTON_TYPE_LIST?.includes(type)
    ? theme?.buttons?.[type]
    : { background: hideBackground ? 'transparent' : theme?.colors?.card };

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.default(
          pressed,
          circle,
          float,
          hideBorder,
          vertical,
          disabled ? theme?.buttons?.[BUTTON_TYPE.DISABLED] : buttonStyles,
        ),
        containerStyle,
      ]}
    >
      {({ pressed }) => (
        <>
          {icon && iconPosition === BUTTON_ICON_POSITION?.LEFT && _renderIcon()}
          {text && (
            <MyText style={[styles.text(buttonStyles), textStyle]}>
              {text}
            </MyText>
          )}
          {icon &&
            iconPosition === BUTTON_ICON_POSITION?.RIGHT &&
            _renderIcon()}
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  default: (pressed, circle, float, hideBorder, vertical, themeStyle) => {
    return {
      backgroundColor: themeStyle?.background,
      transform: [{ scale: pressed ? 0.9 : 1 }],
      borderRadius: circle ? 50 : 10,
      borderWidth: hideBorder ? 0 : 1,
      borderColor: themeStyle?.border,
      elevation: float ? 4 : 0,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: vertical ? 'column' : 'row',
    };
  },
  text: themeStyle => ({
    color: themeStyle?.text,
    textTransform: 'uppercase',
    textAlign: 'center',
    alignItems: 'center',
  }),
});

export default MyButton;
