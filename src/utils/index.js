import AsyncStorage from '@react-native-async-storage/async-storage';
import tags from '../components/constants/tags';

export const getStoreItem = async storeKey => {
  if (!storeKey) {
    return;
  }

  try {
    const stored = await AsyncStorage.getItem(storeKey);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('[DEBUG] >> onStoreItem >> ', { storeKey, value, error });
  }

  return null;
};
export const onStoreItem = async (storeKey, value) => {
  if (!storeKey) {
    return;
  }

  try {
    await AsyncStorage.setItem(storeKey, JSON.stringify(value));
  } catch (error) {
    console.error('[DEBUG] >> onStoreItem >> ', { storeKey, value, error });
  }
};
export const updateListStore = async (storeKey, data) => {
  if (!storeKey) {
    return;
  }

  try {
    let arr = [];
    const storedStr = await AsyncStorage.getItem(storeKey);

    if (storedStr !== null) {
      arr = JSON.parse(storedStr);
    }

    if (arr?.some(storedAnime => storedAnime?.mal_id === data?.mal_id)) {
      console.log('[DEBUG] >> updateListStore >> REMOVE');
      arr = arr?.filter(storedAnime => storedAnime?.mal_id !== data?.mal_id);
    } else {
      console.log('[DEBUG] >> updateListStore >> PUSH');
      arr.push(data);
    }
    await onStoreItem(storeKey, arr);

    return arr;
  } catch (error) {
    console.error('[DEBUG] >> onFavouriteAnime >> ', { error });
  }
};

export const getTagColors = tag => {
  const found = tags.find(
    item =>
      item?.mal_id === tag.mal_id ||
      item?.name?.toLowerCase() === tag?.name?.toLowerCase(),
  );

  if (found) {
    return {
      color: found?.color,
      accent: found?.accent,
    };
  }

  return {
    color: '#B0BEC5',
    accent: '#455A64',
  };
};
