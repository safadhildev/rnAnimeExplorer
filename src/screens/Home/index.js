/* eslint-disable react-hooks/exhaustive-deps */
import Icon from '@react-native-vector-icons/material-design-icons';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  View,
} from 'react-native';
import AnimeListItem from '../../components/AnimeListItem';
import { BLACK, WHITE } from '../../components/common/colors';
import MyHeader, { HEADER_TYPE } from '../../components/common/MyHeader';
import MyButton from '../../components/common/MyButton';

import { useNavigation, useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import RecommendationItem from '../../components/RecommendationItem';
import { AnimeContext } from '../../context/animeContext';
import styles from './styles';
import Shimmer from '../../components/common/Shimmer';
import { ANIME_DETAILS_SCREEN } from '../../components/common/routeConstants';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const { width: fullWidth } = useWindowDimensions();
  const navigation = useNavigation();
  const { toggleTheme, ...theme } = useTheme();

  const carouselRef = useRef(null);
  const {
    getAnimeList,
    getRecommendations,
    recommendations,
    animeList,
    favouriteAnimeIds,
  } = useContext(AnimeContext);

  useEffect(() => {
    getRecommendations();
    getAnimeList();
  }, []);

  const _handleAnimeOnPress = id => {
    navigation.navigate(ANIME_DETAILS_SCREEN, { animeId: id });
  };

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
    [favouriteAnimeIds, recommendations],
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
          onPress={() => {
            _handleAnimeOnPress(item?.mal_id);
          }}
        />
      );
    },
    [favouriteAnimeIds, animeList],
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme?.colors?.background }}
    >
      <ScrollView
        nestedScrollEnabled
        style={styles.container(theme?.colors?.background)}
        // style={{ flex: 1 }}
        stickyHeaderIndices={[1, 3]}
      >
        <View style={styles.topSection}>
          <MyButton
            onPress={toggleTheme}
            icon={theme?.dark ? 'weather-night' : 'white-balance-sunny'}
            iconSize={24}
            iconColor={theme?.colors?.text}
            hideBorder
            hidBackground
          />
        </View>
        {(recommendations?.isLoading ||
          recommendations?.data?.list?.length > 0) && (
          <MyHeader
            sticky
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
              ref={carouselRef}
              autoPlay
              autoPlayInterval={3000} // 3s
              overscrollEnabled={false}
              onScrollEnd={index => {
                if (
                  carouselRef?.current &&
                  index === recommendations?.data?.list?.length - 1
                ) {
                  // reached last item
                  console.log('[DEBUG] >> ', {
                    carouselRef: carouselRef?.current,
                  });
                  carouselRef?.current?.scrollTo({
                    index: 0,
                    animated: true,
                  });
                }
              }}
              data={recommendations?.data?.list}
              loop={false}
              width={fullWidth}
              height={300}
              windowSize={fullWidth}
              pagingEnabled={true}
              snapEnabled={true}
              mode={'horizontal-stack'}
              modeConfig={{
                snapDirection: 'left',
                stackInterval: 30,
              }}
              customConfig={() => ({ type: 'positive', viewCount: 10 })}
              renderItem={_renderRecommendations}
              style={{ marginBottom: 20 }}
            />
          )
        )}

        <MyHeader
          sticky
          isLoading={animeList?.isLoading}
          text="Anime List"
          type={HEADER_TYPE.SECTION}
          containerStyle={{
            marginBottom: 10,
            paddingHorizontal: 10,
          }}
        />
        <FlatList
          data={animeList?.isLoading ? [1, 2, 3] : animeList?.data?.list}
          renderItem={_renderAnimeList}
          contentContainerStyle={{
            paddingBottom: 100,
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
    </SafeAreaView>
  );
};

export default HomeScreen;
