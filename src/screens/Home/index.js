/* eslint-disable react-hooks/exhaustive-deps */
import Icon from '@react-native-vector-icons/material-design-icons';
import React, { useCallback, useContext, useEffect } from 'react';
import { FlatList, ScrollView, useWindowDimensions, View } from 'react-native';
import AnimeListItem from '../../components/AnimeListItem';
import { BLACK, WHITE } from '../../components/common/colors';
import MyHeader, { HEADER_TYPE } from '../../components/common/MyHeader';
import MyPressable from '../../components/common/MyPressable';

import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import RecommendationItem from '../../components/RecommendationItem';
import { AnimeContext } from '../../context/animeContext';
import styles from './styles';
import Shimmer from '../../components/common/Shimmer';

const HomeScreen = () => {
  const { width: fullWidth } = useWindowDimensions();
  const { toggleTheme, ...theme } = useTheme();
  const {
    getAnimeList,
    getRecommendations,
    recommendations,
    animeList,
    favouriteAnimeIds,
  } = useContext(AnimeContext);

  useEffect(() => {
    console.log('[DEBUG] >> ', { theme });
    getRecommendations();
    getAnimeList();
  }, []);

  const _handleAnimeOnPress = id => {};

  const _renderRecommendations = useCallback(
    ({ item, index }) => {
      const isFavourited = favouriteAnimeIds?.data?.includes(item?.mal_id);
      return (
        <RecommendationItem
          data={item}
          index={index}
          isFavourited={isFavourited}
          onPress={() => {
            _handleAnimeOnPress(item?.mal_id);
          }}
        />
      );
    },
    [favouriteAnimeIds],
  );

  const _renderAnimeList = useCallback(
    ({ item, index }) => {
      const isFavourited = favouriteAnimeIds?.data?.includes(item?.mal_id);
      return (
        <AnimeListItem
          data={item}
          isFavourited={isFavourited}
          index={index}
          isLoading={animeList?.isLoading}
        />
      );
    },
    [favouriteAnimeIds, animeList],
  );

  console.log('[DEBUG] >> ', { loading: animeList?.isLoading });

  return (
    <ScrollView
      nestedScrollEnabled
      style={styles.container(theme?.colors?.background)}
      // style={{ flex: 1 }}
      stickyHeaderIndices={[3]}
    >
      <View style={styles.topSection}>
        <MyPressable onPress={toggleTheme}>
          {({ pressed }) => (
            <Icon
              name={theme?.dark ? 'weather-night' : 'white-balance-sunny'}
              size={24}
              color={theme?.dark ? WHITE : BLACK}
            />
          )}
        </MyPressable>
      </View>
      {(recommendations?.isLoading ||
        recommendations?.data?.list?.length > 0) && (
        <MyHeader
          text="Recommendations"
          type={HEADER_TYPE.SECTION}
          isLoading={recommendations?.isLoading}
        />
      )}
      {recommendations?.isLoading ? (
        <Shimmer style={styles.recommendationsShimmer} />
      ) : (
        recommendations?.data?.list && (
          <Carousel
            autoPlayInterval={2000}
            data={recommendations?.data?.list}
            height={300}
            loop={false}
            pagingEnabled={false}
            snapEnabled={true}
            width={fullWidth}
            mode={'horizontal-stack'}
            modeConfig={{
              snapDirection: 'left',
              stackInterval: 18,
            }}
            customConfig={() => ({ type: 'positive', viewCount: 10 })}
            renderItem={_renderRecommendations}
            style={{ marginBottom: 20 }}
          />
        )
      )}

      <MyHeader
        isLoading={animeList?.isLoading}
        text="Anime List"
        type={HEADER_TYPE.SECTION}
        containerStyle={{
          marginBottom: 10,
          paddingHorizontal: 10,
          backgroundColor: theme?.colors?.background,
        }}
      />
      <FlatList
        data={animeList?.isLoading ? [1, 2, 3] : animeList?.data?.list}
        renderItem={_renderAnimeList}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        onEndReachedThreshold={0.2}
        onEndReached={() => {
          console.log('[DEBUG] >> onEndReached');
        }}
        // onEndReached={() =>
        //   hasNextPage && !isFetchingNextPage && fetchNextPage()
        // }
        // ListFooterComponent={
        //   isFetchingNextPage ? (
        //     <ActivityIndicator
        //       color="blue"
        //       size="small"
        //       style={{ marginBottom: 5 }}
        //     />
        //   ) : null
        // }
      />
    </ScrollView>
  );
};

export default HomeScreen;
