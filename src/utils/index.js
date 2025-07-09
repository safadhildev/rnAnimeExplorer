import AsyncStorage from '@react-native-async-storage/async-storage';
import tags from '../components/constants/tags';

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
export const updateListStore = async (storeKey, id) => {
  if (!storeKey) {
    return;
  }

  try {
    let arr = [];
    const storedStr = await AsyncStorage.getItem(storeKey);

    if (storedStr !== null) {
      arr = JSON.parse(storedStr);
    }

    if (arr?.includes(id)) {
      arr = arr?.filter(storedId => storedId !== id);
    } else {
      arr.push(id);
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
