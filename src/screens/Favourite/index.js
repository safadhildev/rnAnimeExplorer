/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import AnimeListItem from '../../components/AnimeListItem';
import MyHeader, { HEADER_TYPE } from '../../components/common/MyHeader';
import { ANIME_DETAILS_SCREEN } from '../../components/common/routeConstants';
import { AnimeContext } from '../../context/animeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyText from '../../components/common/MyText';

const FavouriteScreen = () => {
  const navigation = useNavigation();
  const { getIsAnimeFavourited, favouriteAnimeList } = useContext(AnimeContext);

  const _handleAnimeOnPress = id => {
    navigation.navigate(ANIME_DETAILS_SCREEN, { animeId: id });
  };

  const _renderAnimeList = useCallback(
    ({ item, index }) => {
      const isFavourited = getIsAnimeFavourited(item?.mal_id);
      return (
        <AnimeListItem
          data={item}
          isFavourited={isFavourited}
          index={index}
          isLoading={false}
          onPress={() => {
            _handleAnimeOnPress(item?.mal_id);
          }}
        />
      );
    },
    [favouriteAnimeList],
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MyHeader
        sticky
        isLoading={false}
        text="Favourites"
        type={HEADER_TYPE.SECTION}
        containerStyle={{
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
      />
      <FlatList
        data={favouriteAnimeList?.data}
        renderItem={_renderAnimeList}
        contentContainerStyle={{
          flex: 1,
          paddingBottom: 100,
        }}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <MyHeader
              text="No Favourite Anime Found"
              type={HEADER_TYPE.SECTION}
              style={{ textAlign: 'center' }}
            />
            <MyText style={{ textAlign: 'center' }}>
              Favourite any anime on Home | Details | Explore pages and come
              back here! :D
            </MyText>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
});

export default FavouriteScreen;
