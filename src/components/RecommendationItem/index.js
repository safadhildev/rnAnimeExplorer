import Icon from '@react-native-vector-icons/material-design-icons';
import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { AnimeContext } from '../../context/animeContext';
import { ORANGE, RED } from '../common/colors';
import MyButton from '../common/MyButton';
import MyText from '../common/MyText';
import MyCard from '../common/MyCard';

const RecommendationItem = ({ data, index, isFavourited, onPress }) => {
  const theme = useTheme();
  const { onFavouriteAnime } = useContext(AnimeContext);

  const _handleToggleFavourite = async () => await onFavouriteAnime(data);

  return (
    <MyCard onPress={onPress} containerStyle={styles.container(theme)}>
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
                <MyButton
                  onPress={_handleToggleFavourite}
                  icon={isFavourited ? 'heart' : 'heart-outline'}
                  iconSize={20}
                  iconColor={RED}
                  containerStyle={{ borderWidth: 0 }}
                />
              </View>
            </View>
          </ImageBackground>
        </>
      )}
    </MyCard>
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
    paddingHorizontal: 10,
    paddingVertical: 5,
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
    right: 10,
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
