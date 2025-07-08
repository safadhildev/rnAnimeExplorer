import { useTheme } from '@react-navigation/native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerLG = createShimmerPlaceholder(LinearGradient);

const Shimmer = ({ style }) => {
  const theme = useTheme();
  return <ShimmerLG shimmerColors={theme?.shimmerColors} style={style} />;
};

export default Shimmer;
