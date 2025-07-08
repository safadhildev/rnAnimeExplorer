import React, { createContext, useContext, useState } from 'react';
import { fetchAnimeList } from '../api/apiAnime';
import { STATE_UPDATER_TYPE } from '../components/constants/stateConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateListStore } from '../utils';

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
  const [favouriteAnimeIds, setFavouriteAnimeIds] = useState(
    DEFAULT_STATE.FAVOURITE_IDS,
  );
  const [intialLoading, setInitialLoading] = useState(true);

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

  const _getFavouriteAnimeIds = async () => {
    try {
      _updateState(STATE_UPDATER_TYPE.START, setFavouriteAnimeIds);
      const storedStr = await AsyncStorage.getItem('favouriteAnimeIds');
      if (storedStr !== null) {
        _updateState(
          STATE_UPDATER_TYPE.UPDATE,
          setFavouriteAnimeIds,
          JSON.parse(storedStr),
        );
      }
    } catch (error) {
      console.error('[DEBUG] >> _getFavouriteAnimeIds >> ', { error });
      _updateState(STATE_UPDATER_TYPE.ERROR, setFavouriteAnimeIds, error);
    } finally {
      _updateState(STATE_UPDATER_TYPE.END, setFavouriteAnimeIds);
      setInitialLoading(false);
    }
  };

  const _updateFavouriteAnimeIds = async id => {
    try {
      await updateListStore('favouriteAnimeIds', id);
    } catch (error) {
      console.error('[DEBUG] >> updateFavouriteAnimeIds >> ', { error });
    } finally {
      await _getFavouriteAnimeIds();
    }
  };

  return (
    <AnimeContext.Provider
      value={{
        getAnimeList: _getAnimeList,
        getRecommendations: _getAnimeRecommendations,
        getFavouriteAnimeIds: _getFavouriteAnimeIds,
        onFavouriteAnimeById: _updateFavouriteAnimeIds,
        animeList,
        recommendations,
        favouriteAnimeIds,
        intialLoading,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};

export default AnimeProvider;
