import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute, useTheme } from '@react-navigation/native';
import { Pressable, View } from 'react-native';
import MyButton from '../components/common/MyButton';
import {
  EXPLORE_SCREEN,
  FAVOURTIE_SCREEN,
  HOME_SCREEN,
} from '../components/common/routeConstants';
import ExploreScreen from '../screens/Explore';
import HomeScreen from '../screens/Home';
import { useState } from 'react';
import Icon from '@react-native-vector-icons/octicons';
import FavouriteScreen from '../screens/Favourite';
// import Icon from '@react-native-vector-icons/material-design-icons';

const Tab = createBottomTabNavigator();

const TabIconButton = ({ focused, iconName, onPress }) => {
  const theme = useTheme();

  const _getColor = () => {
    if (theme?.dark) {
      return focused ? '#FFFFFF' : '#BBBBBB';
    }

    return focused ? '#000000' : '#A1A1A1';
  };

  console.log('[DEBUG] >> icon >> ', { focused, iconName, onPress });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        transform: [{ scale: focused ? 1.3 : pressed ? 0.95 : 1 }],
      })}
    >
      {({ pressed }) => <Icon name={iconName} color={_getColor()} size={20} />}
    </Pressable>
  );
};

const TabBar = ({ state, descriptors, navigation }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(HOME_SCREEN);

  const _getIsActive = tabName => {
    return activeTab === tabName;
  };

  const _handleSwitchTab = tabName => {
    setActiveTab(tabName);
    navigation.navigate(tabName);
  };

  return (
    <View
      style={{
        backgroundColor: theme?.colors?.card,
        position: 'absolute',
        bottom: 30,
        minHeight: 50,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        gap: 50,
      }}
    >
      <TabIconButton
        iconName={_getIsActive(HOME_SCREEN) ? 'home-fill' : 'home'}
        focused={_getIsActive(HOME_SCREEN)}
        onPress={() => _handleSwitchTab(HOME_SCREEN)}
      />
      <TabIconButton
        iconName="search"
        focused={_getIsActive(EXPLORE_SCREEN)}
        onPress={() => _handleSwitchTab(EXPLORE_SCREEN)}
      />
      <TabIconButton
        iconName={_getIsActive(FAVOURTIE_SCREEN) ? 'heart-fill' : 'heart'}
        focused={_getIsActive(FAVOURTIE_SCREEN)}
        onPress={() => _handleSwitchTab(FAVOURTIE_SCREEN)}
      />
    </View>
  );
};
const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      safeAreaInsets={{ top: 0, bottom: 0 }}
      initialRouteName={HOME_SCREEN}
      screenOptions={{
        animation: 'shift',
        headerShown: false,
      }}
    >
      <Tab.Screen name={HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={EXPLORE_SCREEN} component={ExploreScreen} />
      <Tab.Screen name={FAVOURTIE_SCREEN} component={FavouriteScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
