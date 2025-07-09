import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import AnimeProvider from './src/context/animeContext';
import RootStack from './src/routes';
import { onStoreItem } from './src/utils';
import { throttle } from 'lodash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BUTTON_TYPE } from './src/components/constants';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');

  const themeValue = useMemo(() => {
    const _toggleTheme = throttle(() => {
      setIsDarkMode(!isDarkMode);
      onStoreItem('isDarkMode', !isDarkMode);
    }, 500);

    const theme = isDarkMode ? DarkTheme : DefaultTheme;

    console.log('[DEBUG] >> myTheme >>', { DefaultTheme });
    return {
      ...theme,
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
    <NavigationContainer>
      <ThemeProvider value={themeValue}>
        <AnimeProvider>
          <GestureHandlerRootView>
            <RootStack />
          </GestureHandlerRootView>
        </AnimeProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
