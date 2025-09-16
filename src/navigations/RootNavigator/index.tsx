import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';

import Home from '../../Screens/Home/Home';
import Login from '../../Screens/Login/Login';
import User from '../../Screens/User/User';
import BottomTabs from '../../Components/bottomNavigation';
import OnboardScreen from '../../Screens/Onboard/onboardScreen';
import Register from '../../Screens/Register/Register';
import WelcomeScreen from '../../Screens/WelcomeScreen/WelcomeScreen';
import CustomDrawerContent from '../../Components/CustomDrawerContent/CustomDrawerContent';
import Profile from '../../Screens/Profile/Profile';
import EditProfile from '../../Screens/EditProfile/EditProfile';

export type RootStackParamList = {
  Login: undefined;
  MainDrawer: undefined;
  onBoard: undefined;
  Register: undefined;
  WelcomeScreen: undefined;
  User: undefined;
  BottomTabs: undefined;
  Profile: undefined;
  EditProfile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

export function MainDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, swipeEnabled: true, swipeEdgeWidth: 50 }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="BottomTabs" component={BottomTabs} />
      <Drawer.Screen name="User" component={User} />
    </Drawer.Navigator>
  );
}

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="onBoard"
      screenOptions={{ headerShown: false, animation: 'fade' }}>

      <Stack.Screen name="onBoard" component={OnboardScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MainDrawer" component={MainDrawer} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
