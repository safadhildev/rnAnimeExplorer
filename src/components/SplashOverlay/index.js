/* eslint-disable react-hooks/exhaustive-deps */
import React, { use, useContext, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { AnimeContext } from '../../context/animeContext';

const SplashOverlay = () => {
  const { onInitApp } = useContext(AnimeContext);

  useEffect(() => {
    setTimeout(() => {
      onInitApp();
    }, 1000);
  }, []);

  return <ActivityIndicator size="large" />;
};

export default SplashOverlay;
