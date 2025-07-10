/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation, useTheme } from '@react-navigation/native';
import { debounce, throttle } from 'lodash';
import React, { useContext, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchAnimeList } from '../../api/apiAnime';
import AnimeListItem from '../../components/AnimeListItem';
import MyButton from '../../components/common/MyButton';
import MyChip from '../../components/common/MyChip';
import MyHeader, { HEADER_TYPE } from '../../components/common/MyHeader';
import MyText from '../../components/common/MyText';
import { GREY_DARK, SILVER, WHITE } from '../../components/common/colors';
import { ANIME_DETAILS_SCREEN } from '../../components/common/routeConstants';
import {
  BUTTON_ICON_POSITION,
  BUTTON_TYPE,
  statusList,
} from '../../components/constants';
import tags from '../../components/constants/tags';
import { AnimeContext } from '../../context/animeContext';

const FilterModal = ({ visible, onClose = () => {}, onSubmit = () => {} }) => {
  const theme = useTheme();

  const [statusOptions, setStatusOptions] = useState(
    statusList?.map(status => ({ id: status, name: status, selected: false })),
  );

  const [genreOptions, setGenreOptions] = useState(
    tags?.map(tag => ({ id: tag?.mal_id, name: tag?.name, selected: false })),
  );

  const _onPressApply = () => {
    const selectedStatus = statusOptions?.find(tag => tag?.selected);

    const selectedGenreOptions = genreOptions?.filter(i => i?.selected);
    const selectedGenreOptionIdsMap = selectedGenreOptions
      ?.map(j => j.id)
      ?.join(',');

    onSubmit({
      status: selectedStatus?.name || '',
      genres: selectedGenreOptionIdsMap || '',
    });
    onClose();
  };

  const _onResetFilter = () => {
    setStatusOptions(
      statusOptions?.map(item => ({
        id: item?.id,
        name: item?.name,
        selected: false,
      })),
    );
    setGenreOptions(prev =>
      prev?.map(tag => ({ id: tag?.mal_id, name: tag?.name, selected: false })),
    );
  };

  const _onSelectItem = (item, arr, callback, multi = true) => {
    const updatedList = arr.map(status => {
      if (status.name === item.name) {
        return { ...status, selected: !status.selected };
      }
      return multi ? status : { ...status, selected: false };
    });
    updatedList.sort((a, b) =>
      b.selected === a.selected ? 0 : b.selected ? 1 : -1,
    );

    // Update state using callback
    callback(updatedList);
  };

  return (
    <Modal
      visible={visible}
      backdropColor="transparent"
      animationType="slide"
      style={{ flex: 1, alignItems: 'flex-end' }}
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalContentContainer(theme)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <MyHeader
            text="Filter"
            type={HEADER_TYPE.HEADING}
            containerStyle={{
              alignSelf: 'flex-end',
              paddingHorizontal: 16,
              paddingBottom: 3,
            }}
            style={{ fontSize: 20 }}
          />
          <MyButton
            icon="close"
            hideBorder
            hideBackground
            iconSize={30}
            onPress={onClose}
            containerStyle={{
              alignSelf: 'flex-start',
              marginTop: 16,
              marginHorizontal: 16,
            }}
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            paddingVertical: 16,
          }}
        >
          <MyHeader
            text="Status"
            type={HEADER_TYPE.SECTION}
            containerStyle={{
              paddingVertical: 5,
              paddingHorizontal: 16,
            }}
            style={{ fontSize: 16 }}
          />
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 5,
              paddingHorizontal: 16,
            }}
          >
            {/* {tags?.map(tag => {
              return <MyChip text={tag?.name} />;
            })} */}
            {statusOptions?.map(tag => {
              return (
                <MyChip
                  text={tag?.name}
                  icon={tag?.selected ? 'check' : null}
                  iconSize={12}
                  iconPosition={BUTTON_ICON_POSITION.RIGHT}
                  iconColor={WHITE}
                  color={tag?.selected ? theme?.colors?.primary : null}
                  textStyle={{
                    color: tag?.selected ? WHITE : theme?.colors?.primary,
                  }}
                  onPress={() => {
                    _onSelectItem(tag, statusOptions, setStatusOptions, false);
                  }}
                />
              );
            })}
          </View>

          {/* GENRE */}

          <MyHeader
            text="Genre"
            type={HEADER_TYPE.SECTION}
            containerStyle={{
              marginTop: 20,
              paddingVertical: 5,
              paddingHorizontal: 16,
            }}
            style={{ fontSize: 16 }}
          />
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 5,
                maxWidth: 1000,
                paddingVertical: 3,
                paddingHorizontal: 16,
              }}
            >
              {/* {tags?.map(tag => {
              return <MyChip text={tag?.name} />;
            })} */}
              {genreOptions?.map(tag => {
                return (
                  <MyChip
                    text={tag?.name}
                    icon={tag?.selected ? 'check' : null}
                    iconSize={12}
                    iconPosition={BUTTON_ICON_POSITION.RIGHT}
                    iconColor={WHITE}
                    color={tag?.selected ? theme?.colors?.primary : null}
                    textStyle={{
                      color: tag?.selected ? WHITE : theme?.colors?.primary,
                    }}
                    onPress={() => {
                      _onSelectItem(tag, genreOptions, setGenreOptions);
                    }}
                  />
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
        <View style={{ flexDirection: 'row', marginHorizontal: 16, gap: 5 }}>
          <MyButton
            text="Reset"
            containerStyle={{
              flex: 1,
              height: 40,
              marginBottom: 16,
              borderWidth: 0,
            }}
            textStyle={{
              color: theme?.buttons?.[BUTTON_TYPE.NEGATIVE]?.border,
            }}
            onPress={_onResetFilter}
          />
          <MyButton
            text="Apply"
            type={BUTTON_TYPE.POSITIVE}
            containerStyle={{
              flex: 3,
              height: 40,
              marginBottom: 16,
            }}
            onPress={_onPressApply}
          />
        </View>
      </View>
    </Modal>
  );
};

const ExploreScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const flatlistRef = useRef(null);

  const { getIsAnimeFavourited, animeList, isDarkMode } =
    useContext(AnimeContext);

  const [searchResults, setSearchResults] = useState(animeList?.data?.list);
  const [searchPagination, setSearchPagination] = useState({
    current_page: 1,
    has_next_page: true,
    count: 25,
    per_page: 25,
    total: 30,
  });
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQueries, setSearchQueries] = useState({
    page: 0,
    limit: 25,
  });
  const [searchKeyword, setSearchKeyword] = useState('');

  const [showFilter, setShowFilter] = useState(false);
  const [filterQueries, setFilterQueries] = useState({
    status: '',
    genres: '',
  });

  const [isLoadMore, setIsLoadMore] = useState(false);

  const _toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const _handleSearchAnime = async params => {
    try {
      const response = await fetchAnimeList({
        ...params,
        page: params?.page,
        limit: params?.limit,
        q: params?.q || searchKeyword,
      });
      if (response?.status === 200) {
        const results = await response.json();
        setSearchResults(results?.data);
        setSearchPagination(searchPagination);
        setSearchQueries({ ...params });
      }
    } catch (error) {
      console.error('[DEBUG] >> _handleSearchAnime >> ', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const _handleSearchAnimeDebounce = debounce(_handleSearchAnime, 500);

  const _handleLoadMore = async () => {
    console.log('[DEBUG] >> _handleLoadMore >> ', {
      searchQueries,
    });
    try {
      setIsLoadMore(true);

      const updatedParams = {
        ...searchQueries,
        page: searchQueries?.page + 1,
        limit: searchQueries?.limit,
        q: searchKeyword,
      };

      const response = await fetchAnimeList(updatedParams);
      console.log('[DEBUG] >> _handleLoadMore >> ', { updatedParams });
      if (response?.status === 200) {
        const results = await response.json();
        setSearchResults([...searchResults, ...results?.data]);
        setSearchQueries(updatedParams);
      }
    } catch (error) {
      console.error('[DEBUG] >> _handleSearchAnime >> ', error);
    } finally {
      setIsLoadMore(false);
    }
  };

  const _handleTextChange = text => {
    // setSearchQueries({ ...searchQueries, q: text });
    setSearchKeyword(text, searchQueries);
  };

  const _handleSubmitFilter = params => {
    setSearchLoading(true);
    flatlistRef?.current?.scrollToOffset({ offset: 0, animated: true });
    setFilterQueries(params);
    _handleSearchAnime({
      ...params,
      page: 1,
      limit: 25,
    });
  };

  const _handleAnimeOnPress = id => {
    navigation.navigate(ANIME_DETAILS_SCREEN, { animeId: id });
  };

  const _getIsFilterQueriesExist = () => {
    console.log('[DEBUG] >> getIsFilterQueriesExist >>', {
      filterQueries,
      e: filterQueries?.genres?.length > 0 || filterQueries?.status?.length > 0,
    });

    return (
      filterQueries?.genres?.length > 0 || filterQueries?.status?.length > 0
    );
  };

  const _renderAnimeList = ({ item, index }) => {
    if (index === 0) {
      return null;
    }

    const isFavourited = getIsAnimeFavourited(item?.mal_id);
    return (
      <AnimeListItem
        data={item}
        isFavourited={isFavourited}
        index={index}
        isLoading={searchLoading}
        disabled={searchLoading}
        onPress={() => {
          _handleAnimeOnPress(item?.mal_id);
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        ref={flatlistRef}
        alwaysBounceVertical={false}
        scrollEnabled={!searchLoading}
        refreshing={searchLoading}
        onRefresh={async () => {
          await _handleSearchAnime({ q: '', page: 1, limit: 25 });
        }}
        data={
          searchLoading ? [1, 2, 3, 4, 5, 6, 7] : [0]?.concat(searchResults)
        }
        renderItem={_renderAnimeList}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        onEndReached={throttle(_handleLoadMore, 1000)}
        onEndReachedThreshold={0.2}
        // stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <View style={{ backgroundColor: theme?.colors?.background }}>
            <MyHeader
              sticky
              isLoading={false}
              text="Explore"
              type={HEADER_TYPE.SECTION}
              containerStyle={{
                paddingHorizontal: 10,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                padding: 5,
              }}
            >
              <View style={styles.searchInputWrapper(theme)}>
                <TextInput
                  allowFontScaling={false}
                  multiline={false}
                  value={searchKeyword}
                  onChangeText={_handleTextChange}
                  onEndEditing={_handleSearchAnimeDebounce}
                  style={styles.searchInput(theme)}
                  clearButtonMode="always"
                  placeholder="Search"
                  placeholderTextColor={isDarkMode ? GREY_DARK : SILVER}
                />
                <MyButton
                  onPress={_handleSearchAnimeDebounce}
                  icon="magnify"
                  iconSize={24}
                  iconColor={WHITE}
                  hideBorder
                  hideBackground
                  containerStyle={styles.searchIconContainer(theme)}
                />
              </View>

              <MyButton
                onPress={_toggleFilter}
                icon={
                  _getIsFilterQueriesExist() ? 'filter-check' : 'filter-outline'
                }
                iconSize={28}
                iconColor={theme?.colors?.text}
                hideBorder
                hideBackground
                containerStyle={{ width: 50 }}
              />
            </View>
          </View>
        }
        ListFooterComponent={
          isLoadMore ? (
            <ActivityIndicator size="small" style={{ marginVertical: 10 }} />
          ) : (
            <MyButton
              text="Load More"
              containerStyle={styles.loadMoreButton(theme)}
              textStyle={styles.loadMoreButtonText(theme)}
              onPress={_handleLoadMore}
            />
          )
        }
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
      <FilterModal
        visible={showFilter}
        onClose={_toggleFilter}
        onSubmit={_handleSubmitFilter}
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
  modalContentContainer: theme => ({
    position: 'absolute',
    backgroundColor: theme?.colors.card,
    minHeight: '55%',
    bottom: 10,
    left: 10,
    right: 10,
    borderRadius: 20,
  }),
  searchInputWrapper: theme => ({
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme?.colors?.card,
    borderColor: theme?.colors?.primary,
    borderRadius: 10,
    borderWidth: 1,
  }),
  searchInput: theme => ({
    color: theme?.colors?.primary,
    flex: 1,
    paddingLeft: 10,
  }),
  searchIconContainer: theme => ({
    width: 50,
    backgroundColor: theme?.colors?.primary,
    margin: 2,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  }),
  loadMoreButton: theme => ({
    marginTop: 10,
    width: '30%',
    alignSelf: 'center',
    backgroundColor: theme.colors.card,
    borderColor: theme?.colors?.border,
    paddingVertical: 5,
  }),
  loadMoreButtonText: theme => ({ fontSize: 10, color: theme.colors.text }),
});

export default ExploreScreen;
