import { useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import {
  ANIME_DETAILS_SCREEN,
  HOME_SCREEN,
  TAB_NAVIGATOR,
} from '../components/common/routeConstants';
import SplashOverlay from '../components/SplashOverlay';
import { AnimeContext } from '../context/animeContext';
import AnimeDetails from '../screens/AnimeDetails';
import TabNavigator from './TabNav';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const theme = useTheme();
  const { intialLoading } = useContext(AnimeContext);

  if (intialLoading) {
    return <SplashOverlay />;
  }

  return (
    <Stack.Navigator
      initialRouteName={TAB_NAVIGATOR}
      screenOptions={{
        headerShown: false,
        // navigationBarHidden: true,
        statusBarAnimation: 'none',
      }}
    >
      <Stack.Screen
        name={TAB_NAVIGATOR}
        component={TabNavigator}
        initialParams={{ currentTab: HOME_SCREEN }}
        options={{
          title: 'Overview',
          statusBarStyle: theme?.dark ? 'light' : 'dark',
        }}
      />
      <Stack.Screen
        options={{ statusBarHidden: true, statusBarAnimation: 'none' }}
        name={ANIME_DETAILS_SCREEN}
        component={AnimeDetails}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
