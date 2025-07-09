/* eslint-disable react/no-unstable-nested-components */
import Icon from '@react-native-vector-icons/octicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  EXPLORE_SCREEN,
  FAVOURTIE_SCREEN,
  HOME_SCREEN,
} from '../components/common/routeConstants';
import ExploreScreen from '../screens/Explore';
import FavouriteScreen from '../screens/Favourite';
import HomeScreen from '../screens/Home';
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

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tabIcon,
        {
          transform: [{ scale: focused ? 1.3 : pressed ? 0.95 : 1 }],
        },
      ]}
    >
      {({ pressed }) => <Icon name={iconName} color={_getColor()} size={20} />}
    </Pressable>
  );
};

const TabBar = ({ updateActiveTab, activeTabName, navigation }) => {
  const theme = useTheme();

  const _handleSwitchTab = tabName => {
    updateActiveTab(tabName);
    navigation.navigate(tabName);
  };

  const _getIsActive = tabName => {
    return activeTabName === tabName;
  };
  return (
    <View style={styles.tabBarContainer(theme)}>
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
  const [activeTab, setActiveTab] = useState(HOME_SCREEN);

  return (
    <Tab.Navigator
      tabBar={props => (
        <TabBar
          activeTabName={activeTab}
          updateActiveTab={setActiveTab}
          {...props}
        />
      )}
      safeAreaInsets={{ top: 0, bottom: 0 }}
      initialRouteName={HOME_SCREEN}
      backBehavior="initialRoute"
      screenOptions={{
        animation: 'shift',
        headerShown: false,
      }}
      screenListeners={event => {
        setActiveTab(event?.route?.name);
      }}
    >
      <Tab.Screen name={HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={EXPLORE_SCREEN} component={ExploreScreen} />
      <Tab.Screen name={FAVOURTIE_SCREEN} component={FavouriteScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: theme => ({
    backgroundColor: theme?.colors?.card,
    position: 'absolute',
    bottom: 30,
    width: '50%',
    minHeight: 50,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    alignSelf: 'center',
    shadowColor: theme?.colors?.card,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    gap: 20,
    overflow: 'hidden',
  }),
  tabIcon: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabNavigator;
