import React, { use, useContext, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { AnimeContext } from '../../context/animeContext';

const SplashOverlay = () => {
  const { getFavouriteAnimeIds } = useContext(AnimeContext);

  useEffect(() => {
    setTimeout(() => {
      getFavouriteAnimeIds();
    }, 3000);
  }, []);

  return <ActivityIndicator size="large" />;
};

export default SplashOverlay;
