import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HOME_SCREEN } from '../components/common/routeConstants';
import HomeScreen from '../screens/Home';
import { useContext, useEffect } from 'react';
import { AnimeContext } from '../context/animeContext';
import SplashOverlay from '../components/SplashOverlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const theme = useTheme();
  const { intialLoading } = useContext(AnimeContext);

  useEffect(() => {
    StatusBar.setBarStyle(theme?.dark ? 'light-content' : 'dark-content');
  }, [theme]);

  if (intialLoading) {
    return <SplashOverlay />;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme?.colors?.background }}
    >
      <Stack.Navigator
        initialRouteName={HOME_SCREEN}
        screenOptions={{
          // statusBarHidden: true,
          headerShown: false,
          navigationBarHidden: true,
        }}
      >
        <Stack.Screen
          name={HOME_SCREEN}
          component={HomeScreen}
          options={{ title: 'Overview' }}
        />
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default RootStack;
