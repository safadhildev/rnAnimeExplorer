import AsyncStorage from '@react-native-async-storage/async-storage';

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
    await AsyncStorage.setItem(storeKey, JSON.stringify(arr));

    return arr;
  } catch (error) {
    console.error('[DEBUG] >> onFavouriteAnime >> ', { error });
  }
};
