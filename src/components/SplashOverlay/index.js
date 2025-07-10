/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Fold } from 'react-native-animated-spinkit';
import { AnimeContext } from '../../context/animeContext';
import { BLACK, WHITE } from '../common/colors';

const SplashOverlay = () => {
  const { onInitApp } = useContext(AnimeContext);

  useEffect(() => {
    onInitApp();
    StatusBar.setHidden(true);
  }, []);

  return (
    <View style={styles.container}>
      <Fold color={BLACK} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
});

export default SplashOverlay;
