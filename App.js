import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BLACK } from './src/components/common/colors';
import AnimeProvider from './src/context/animeContext';
import RootStack from './src/routes';
import { useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');

  const themeValue = useMemo(() => {
    const _toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
    };

    const theme = isDarkMode ? DarkTheme : DefaultTheme;

    console.log('[DEBUG] >> ', { theme });
    return {
      ...theme,
      shimmerColors: isDarkMode
        ? ['#121212', '#272729', '#121212']
        : ['#ebebeb', '#c5c5c5', '#ebebeb'],
      toggleTheme: _toggleTheme,
    };
  }, [isDarkMode]);

  return (
    <NavigationContainer>
      <ThemeProvider value={themeValue}>
        <AnimeProvider>
          <RootStack />
        </AnimeProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
