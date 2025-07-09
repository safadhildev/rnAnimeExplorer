import Icon from '@react-native-vector-icons/material-design-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyText from './MyText';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';

const MyChip = ({
  color,
  accent,
  text,
  textStyle,
  icon,
  iconColor,
  iconSize,
  iconStyle,
}) => {
  const theme = useTheme();
  return (
    <View style={styles.container(color, accent || theme?.colors?.primary)}>
      {icon && (
        <Icon
          name={icon}
          size={iconSize}
          color={iconColor ? iconColor : accent || theme?.colors?.primary}
          style={[styles.icon, iconStyle]}
        />
      )}
      <MyText
        style={[styles.text(accent || theme?.colors?.primary), textStyle]}
      >
        {text}
      </MyText>
    </View>
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
  container: (backgroundColor, borderColor) => ({
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
  }),
  text: color => ({ color, fontSize: 12 }),
  icon: { marginLeft: -5 },
});

export default MyChip;
