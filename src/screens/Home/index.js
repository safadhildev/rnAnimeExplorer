/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { FlatList, ScrollView, useWindowDimensions, View } from 'react-native';
import MyButton from '../../components/common/MyButton';
import MyHeader, { HEADER_TYPE } from '../../components/common/MyHeader';
import { useNavigation, useTheme } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ANIME_DETAILS_SCREEN } from '../../components/common/routeConstants';
import Shimmer from '../../components/common/Shimmer';
import RecommendationItem from '../../components/RecommendationItem';
import { AnimeContext } from '../../context/animeContext';
import styles from './styles';
import AnimeListItem from '../../components/AnimeListItem';

const HomeScreen = () => {
  const { width: fullWidth } = useWindowDimensions();
  const navigation = useNavigation();
  const { toggleTheme, ...theme } = useTheme();

  const carouselRef = useRef(null);
  const {
    getTopAnimeList,
    getRecommendations,
    recommendations,
    topAnimeList,
    favouriteAnimeList,
    getIsAnimeFavourited,
  } = useContext(AnimeContext);

  useEffect(() => {
    getRecommendations();
    getTopAnimeList();
  }, []);

  const _handleAnimeOnPress = id => {
    navigation.navigate(ANIME_DETAILS_SCREEN, { animeId: id });
  };

  const _renderRecommendations = useCallback(
    ({ item, index }) => {
      const isFavourited = getIsAnimeFavourited(item?.mal_id);
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
    [favouriteAnimeList, recommendations],
  );

  const _renderAnimeList = useCallback(
    ({ item, index }) => {
      const isFavourited = getIsAnimeFavourited(item?.mal_id);
      return (
        <AnimeListItem
          data={item}
          isFavourited={isFavourited}
          index={index}
          isLoading={topAnimeList?.isLoading}
          onPress={() => {
            _handleAnimeOnPress(item?.mal_id);
          }}
        />
      );
    },
    [favouriteAnimeList, topAnimeList],
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme?.colors?.background }}
    >
      <ScrollView
        nestedScrollEnabled
        style={styles.container(theme?.colors?.background)}
        stickyHeaderIndices={[1, 3]}
      >
        <View style={styles.topSection}>
          <MyButton
            onPress={toggleTheme}
            icon={theme?.dark ? 'weather-night' : 'white-balance-sunny'}
            iconSize={24}
            iconColor={theme?.colors?.text}
            hideBorder
            hideBackground
          />
        </View>
        {!recommendations?.isLoading &&
        recommendations?.data?.list?.length === 0 ? null : (
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

        {!topAnimeList?.isLoading &&
        topAnimeList?.data?.list?.length === 0 ? null : (
          <MyHeader
            sticky
            isLoading={topAnimeList?.isLoading}
            text="Top Anime"
            type={HEADER_TYPE.SECTION}
            containerStyle={{
              marginBottom: 10,
              paddingHorizontal: 10,
            }}
          />
        )}
        <FlatList
          data={topAnimeList?.isLoading ? [1, 2, 3] : topAnimeList?.data?.list}
          renderItem={_renderAnimeList}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
