import { StatusBar, StyleSheet } from 'react-native';
import { BLACK, GREY_DARK, WHITE } from '../../components/common/colors';

const styles = StyleSheet.create({
  topSection: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  topSectionLeft: {
    flex: 1,
  },
  container: backgroundColor => ({
    flex: 1,
    backgroundColor,
  }),
  recommendationsShimmer: {
    alignSelf: 'center',
    width: '95%',
    height: 300,
    borderRadius: 15,
    overflow: 'hidden',
  },
});

export default styles;
