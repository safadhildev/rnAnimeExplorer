import AsyncStorage from '@react-native-async-storage/async-storage';
import { throttle } from 'lodash';
import React, { createContext, useMemo, useState } from 'react';
import { fetchAnimeById, fetchAnimeList } from '../api/apiAnime';
import { STATE_UPDATER_TYPE } from '../components/constants/stateConstants';
import { getStoreItem, onStoreItem, updateListStore } from '../utils';
import { BUTTON_TYPE, STORE_KEY } from '../components/constants';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const DEFAULT_STATE = {
  ANIME_LIST: {
    isLoading: true,
    data: { pagination: null, list: [] },
    error: null,
  },
  RECOMMENDED_LIST: {
    isLoading: true,
    data: { pagination: null, list: [] },
    error: null,
  },
  FAVOURITE_IDS: {
    isLoading: false,
    data: [],
    error: null,
  },
};

export const AnimeContext = createContext(null);

const AnimeProvider = ({ children }) => {
  const [animeList, setAnimeList] = useState(DEFAULT_STATE.ANIME_LIST);
  const [recommendations, setRecommendations] = useState(
    DEFAULT_STATE.RECOMMENDED_LIST,
  );
  const [favouriteAnimeList, setFavouriteAnimeList] = useState(
    DEFAULT_STATE.FAVOURITE_IDS,
  );
  const [intialLoading, setInitialLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');

  const _updateState = (type, callback, value) => {
    if (callback && typeof callback === 'function') {
      switch (type) {
        case STATE_UPDATER_TYPE.START:
          return callback(prev => ({ ...prev, isLoading: true }));
        case STATE_UPDATER_TYPE.UPDATE:
          return callback(prev => ({ ...prev, data: value }));
        case STATE_UPDATER_TYPE.ERROR:
          return callback(prev => ({ ...prev, error: value }));
        case STATE_UPDATER_TYPE.END:
          return callback(prev => ({ ...prev, isLoading: false }));
      }
    }
  };

  const _getAnimeList = async () => {
    try {
      _updateState(STATE_UPDATER_TYPE.START, setAnimeList);
      const response = await fetchAnimeList();
      if (response?.status === 200) {
        const results = await response.json();
        _updateState(STATE_UPDATER_TYPE.UPDATE, setAnimeList, {
          list: results?.data,
          pagination: results?.pagination,
        });
      }
    } catch (error) {
      console.error('[DEBUG] >> getAnimeList >> ', { error });
      _updateState(STATE_UPDATER_TYPE.ERROR, setAnimeList, error);
    } finally {
      _updateState(STATE_UPDATER_TYPE.END, setAnimeList);
    }
  };

  const _getAnimeById = async id => {
    try {
      const response = await fetchAnimeById(id);
      if (response?.status === 200) {
        const results = await response.json();
        return { data: results?.data, error: null };
      }
    } catch (error) {
      console.error('[DEBUG] >> getAnimeList >> ', { error });
      return { data: null, error };
    }
  };

  const _getAnimeRecommendations = async () => {
    try {
      _updateState(STATE_UPDATER_TYPE.START, setRecommendations);
      const response = await fetchAnimeList();
      if (response?.status === 200) {
        const results = await response.json();
        _updateState(STATE_UPDATER_TYPE.UPDATE, setRecommendations, {
          list: results?.data,
          pagination: results?.pagination,
        });
      }
    } catch (error) {
      console.error('[DEBUG] >> getAnimeList >> ', { error });
      _updateState(STATE_UPDATER_TYPE.ERROR, setRecommendations, error);
    } finally {
      _updateState(STATE_UPDATER_TYPE.END, setRecommendations);
    }
  };

  const _getStoredFavouriteAnimeList = async () => {
    try {
      _updateState(STATE_UPDATER_TYPE.START, setFavouriteAnimeList);
      const storedStr = await AsyncStorage.getItem(STORE_KEY.FAVOURITE_ANIME);
      if (storedStr !== null) {
        _updateState(
          STATE_UPDATER_TYPE.UPDATE,
          setFavouriteAnimeList,
          JSON.parse(storedStr),
        );
      }
    } catch (error) {
      console.error('[DEBUG] >> _getStoredFavouriteAnimeList >> ', { error });
      _updateState(STATE_UPDATER_TYPE.ERROR, setFavouriteAnimeList, error);
    } finally {
      _updateState(STATE_UPDATER_TYPE.END, setFavouriteAnimeList);
      setInitialLoading(false);
    }
  };

  const _updateStoredFavouriteAnimeList = throttle(async data => {
    try {
      await updateListStore(STORE_KEY.FAVOURITE_ANIME, data);
    } catch (error) {
      console.error('[DEBUG] >> updateFavouriteAnimeIds >> ', { error });
    } finally {
      await _getStoredFavouriteAnimeList();
    }
  }, 500);

  const _getIsAnimeFavourited = id => {
    return favouriteAnimeList?.data.some(favAnime => favAnime?.mal_id === id);
  };

  const _initApp = async () => {
    try {
      await _getStoredFavouriteAnimeList();
      const isDarkMode = await getStoreItem(STORE_KEY.IS_DARK_MODE);
      setIsDarkMode(isDarkMode);
    } catch (error) {
      console.error('[DEBUG] >> _init >> ', error);
    }
  };

  const theme = useMemo(() => {
    const _toggleTheme = throttle(() => {
      setIsDarkMode(!isDarkMode);
      onStoreItem('isDarkMode', !isDarkMode);
    }, 500);
    const theme = isDarkMode ? DarkTheme : DefaultTheme;
    return {
      ...theme,
      colors: {
        ...theme?.colors,
        shadow: isDarkMode ? '#555555' : '#000000',
      },
      shimmerColors: isDarkMode
        ? ['#121212', '#272729', '#121212']
        : ['#ebebeb', '#c5c5c5', '#ebebeb'],
      buttons: {
        [BUTTON_TYPE.POSITIVE]: {
          background: '#00897B',
          border: '#00796B',
          text: '#E0F2F1',
        },
        [BUTTON_TYPE.NEGATIVE]: {
          background: '#C62828',
          border: '#F44336',
          text: '#FFCDD2',
        },
        [BUTTON_TYPE.DISABLED]: {
          background: '#BDBDBD',
          border: '#D8D8D8',
          text: '#616161',
        },
      },
      toggleTheme: _toggleTheme,
    };
  }, [isDarkMode]);

  return (
    <AnimeContext.Provider
      value={{
        getAnimeList: _getAnimeList,
        getRecommendations: _getAnimeRecommendations,
        getStoredFavouriteAnimeList: _getStoredFavouriteAnimeList,
        getAnimeById: _getAnimeById,
        getIsAnimeFavourited: _getIsAnimeFavourited,
        onFavouriteAnime: _updateStoredFavouriteAnimeList,
        onInitApp: _initApp,
        animeList,
        recommendations,
        favouriteAnimeList,
        intialLoading,
        isDarkMode,
        theme,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};

export default AnimeProvider;
