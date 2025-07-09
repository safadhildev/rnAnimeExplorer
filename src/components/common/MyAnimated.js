import { Animated } from 'react-native';
import MyButton from './MyButton';

const MyAnimated = {
  MyButton: Animated.createAnimatedComponent(MyButton),
};

export default MyAnimated;
