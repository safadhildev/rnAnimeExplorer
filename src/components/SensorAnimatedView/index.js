import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
} from 'react-native-reanimated';

const IMAGE_OFFSET = 50;

const SensorAnimatedView = ({ children, order }) => {
  const sensor = useAnimatedSensor(SensorType.ROTATION);
  // const gyroSensor = useAnimatedSensor(SensorType.GYROSCOPE, { interval: 100 });

  const animatedStyle = useAnimatedStyle(() => {
    const { pitch, roll } = sensor.sensor.value;

    return {
      transform: [
        { translateX: -roll * 30 * order },
        { translateY: -pitch * 30 * order },
      ],
    };
  });

  // const gyroAnimatedStyle = useAnimatedStyle(() => {
  //   const { x, y, z } = gyroSensor.sensor.value;

  //   return {
  //     zIndex: z,
  //     transform: [
  //       { translateX: (-x * 10) / order },
  //       { translateY: (-y * 10) / order },
  //     ],
  //   };
  // });

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: -IMAGE_OFFSET,
          bottom: -IMAGE_OFFSET,
          left: -IMAGE_OFFSET,
          right: -IMAGE_OFFSET,
        },
        animatedStyle,
        // gyroAnimatedStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default SensorAnimatedView;
