import Icon from '@react-native-vector-icons/material-design-icons';
import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { AnimeContext } from '../../context/animeContext';
import MyButton from '../common/MyButton';
import MyText from '../common/MyText';
import Shimmer from '../common/Shimmer';
import { ORANGE, RED, WHITE } from '../common/colors';
import MyCard from '../common/MyCard';

const AnimeListItem = ({
  data,
  index,
  isFavourited,
  isLoading = true,
  onPress,
  disabled,
}) => {
  const theme = useTheme();
  const { onFavouriteAnime } = useContext(AnimeContext);

  const _handleToggleFavourite = async () => await onFavouriteAnime(data);

  if (isLoading) {
    return (
      <View
        style={styles.itemContainer(
          index === 0,
          index === data?.length - 1,
          theme,
        )}
      >
        <Shimmer style={styles.image} />
        <View style={styles.infoWrapper}>
          <View style={{ flex: 1 }}>
            <Shimmer style={{ height: 20 }} />
            <Shimmer style={{ width: '50%', height: 20, marginTop: 2 }} />
            <Shimmer style={{ marginTop: 10 }} />
            <Shimmer style={{ marginTop: 2 }} />
            <Shimmer style={{ width: '60%', marginTop: 2 }} />
          </View>
          <Shimmer style={{ width: '100%', height: 20 }} />
        </View>
      </View>
    );
  }

  return (
    <MyCard
      key={`${index}_${data?.mal_id}`}
      onPress={onPress}
      disabled={disabled}
      containerStyle={styles.itemContainer(
        index === 0,
        index === data?.length - 1,
        theme,
      )}
    >
      {({ pressed }) => (
        <>
          <Image
            key={`${index}_${data?.mal_id}`}
            source={{
              uri: data?.images?.webp?.large_image_url,
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.infoWrapper}>
            <View style={{ flex: 1 }}>
              <MyText
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{ fontWeight: 'bold' }}
              >
                {data?.title}
              </MyText>
              <MyText
                numberOfLines={5}
                ellipsizeMode="tail"
                style={styles.infoDescription}
              >
                {data?.synopsis}
              </MyText>
            </View>
            <View style={styles.infoActionWrapper}>
              <View style={styles.infoScoreWrapper}>
                <MyText style={{ color: theme?.colors?.text, fontSize: 14 }}>
                  {data?.score || 'No Rating'}
                </MyText>
                <Icon name="star" size={20} color={ORANGE} />
              </View>
              <MyButton
                onPress={_handleToggleFavourite}
                icon={isFavourited ? 'heart' : 'heart-outline'}
                iconSize={20}
                iconColor={RED}
                containerStyle={{ borderWidth: 0 }}
                hideBackground
              />
            </View>
          </View>
        </>
      )}
    </MyCard>
  );
};

const styles = StyleSheet.create({
  itemContainer: (isFirst, isLast, theme) => ({
    height: 150,
    backgroundColor: theme?.colors?.card,
    borderColor: theme?.colors?.border,
    borderWidth: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: isFirst ? 0 : 5,
    marginBottom: isLast ? 0 : 5,
    borderRadius: 10,
    padding: 5,
    overflow: 'hidden',
  }),
  image: {
    width: 120,
    height: '100%',
    borderRadius: 5,
    resizeMode: 'cover',
  },
  infoWrapper: { paddingHorizontal: 5, flex: 1 },
  infoDescription: {
    fontSize: 10,
    opacity: 0.4,
    marginVertical: 5,
    lineHeight: 14,
  },
  infoActionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoScoreWrapper: {
    flexDirection: 'row',
  },
  animeItemCardInfoWrapper: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
  },
  animeItemCardFavourite: {
    minWidth: 30,
    backgroundColor: WHITE,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 10,
    padding: 5,
  },
});

export default AnimeListItem;
