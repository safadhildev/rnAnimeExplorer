import Icon from '@react-native-vector-icons/material-design-icons';
import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { AnimeContext } from '../../context/animeContext';
import { ORANGE, RED } from '../common/colors';
import MyPressable from '../common/MyPressable';
import MyText from '../common/MyText';

const RecommendationItem = ({ data, index, isFavourited }) => {
  const theme = useTheme();
  const { onFavouriteAnimeById } = useContext(AnimeContext);

  return (
    <MyPressable
      onPress={() => {
        console.log('[DEBUG] >> onPressRecommendation >> ', { data });
      }}
      style={styles.container(theme)}
    >
      {({ pressed }) => (
        <>
          <ImageBackground
            key={`${index}_${data?.mal_id}`}
            source={{
              uri: data?.images?.webp?.large_image_url,
            }}
            style={{ flex: 1 }}
            resizeMode="cover"
          >
            <View style={styles.infoWrapper(theme)}>
              <View style={styles.infoScoreWrapper}>
                <MyText style={{ color: theme?.colors?.text, fontSize: 10 }}>
                  {data?.score}
                </MyText>
                <Icon name="star" size={12} color={ORANGE} />
              </View>
              <View style={styles.infoTopWrapper(theme)}>
                <MyText
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ color: theme?.colors?.text, fontWeight: 'bold' }}
                >
                  {data?.title}
                </MyText>
                <MyText
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{
                    color: theme?.colors?.text,
                    fontSize: 12,
                    opacity: 0.4,
                    width: '80%',
                  }}
                >
                  {data?.synopsis}
                </MyText>
              </View>
              <View style={styles.infoBottomWrapper}>
                <MyPressable
                  onPress={() => {
                    onFavouriteAnimeById(data?.mal_id);
                  }}
                >
                  {({ pressed }) => (
                    <Icon
                      name={isFavourited ? 'heart' : 'heart-outline'}
                      size={20}
                      color={RED}
                    />
                  )}
                </MyPressable>
              </View>
            </View>
          </ImageBackground>
        </>
      )}
    </MyPressable>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    marginHorizontal: 5,
    width: '90%',
    height: 300,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: theme?.colors?.card,
  }),
  infoWrapper: theme => ({
    position: 'absolute',
    zIndex: 1,
    bottom: 5,
    left: 5,
    right: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: theme?.colors?.card,
    borderWidth: 1,
    borderColor: theme?.colors?.border,
    height: 80,
  }),
  infoTopWrapper: theme => ({
    flex: 1,
  }),
  infoBottomWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    zIndex: 2,
    bottom: 5,
    right: 5,
  },
  infoScoreWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  shimmer: {
    width: '90%',
    height: 300,
    marginHorizontal: 5,
  },
});

export default RecommendationItem;
