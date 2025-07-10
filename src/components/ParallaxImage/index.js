import React from 'react';
import SensorAnimatedView from '../SensorAnimatedView';

const ParallaxImage = ({ layers }) => {
  return (
    <>
      {layers.reverse().map((layer, index) => (
        <SensorAnimatedView key={`layer_${index}`} order={index + 1}>
          {layer}
        </SensorAnimatedView>
      ))}
    </>
  );
};

export default ParallaxImage;
