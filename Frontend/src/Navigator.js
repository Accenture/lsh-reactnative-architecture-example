import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import { Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import LoginForm from './screens/LoginForm';
import HomeScreen from './screens/HomeScreen';
import Search from './screens/Search';
import CameraScreen from './screens/CameraScreen';
import SideMenu from './screens/SideMenu';
import SettingsScreen from './screens/SettingsScreen';

const { width, height } = Dimensions.get('screen');
const HomeNavigator = createBottomTabNavigator(
  {
    home: { screen: HomeScreen },
    search: { screen: Search },
    'camera-alt': { screen: CameraScreen },
    settings: { screen: SettingsScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        return <Icon name={routeName} />;
      },
    }),
    tabBarOptions: {
      showLabel: false,
      drawUnderTabBar: false,
    },
  },
);
const SideMenuNavigator = createDrawerNavigator(
  {
    Home: { screen: HomeNavigator },
    Settings: { screen: SettingsScreen },
    Contact: { screen: Search },
  },
  {
    drawerWidth: Math.min(height, width) * 0.8,
    contentComponent: SideMenu,
  },
);
const Navigator = createStackNavigator(
  {
    Login: { screen: LoginForm },
    Home: { screen: SideMenuNavigator },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      header: null,
    },
  },
);
export default Navigator;
