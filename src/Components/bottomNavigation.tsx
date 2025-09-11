import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Image } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import Home from '../Screens/Home/Home';
import Login from '../Screens/Login/Login';
import User from '../Screens/User/User';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = require('../../Assets/home.png');
          } else if (route.name === 'Users') {
            iconSource = require('../../Assets/login.png');
          } else if (route.name === 'Coming soon') {
            iconSource = require('../../Assets/coming-soon.png');
          }

          return (
            <View style={styles.iconWrapper}>
              {focused ? (
                <View style={styles.circle}>
                  <Image
                    source={iconSource}
                    style={[styles.icon, { tintColor: 'blue' }]}
                  />
                </View>
              ) : (
                <Image
                  source={iconSource}
                  style={[styles.icon, { tintColor: 'gray' }]}
                />
              )}
            </View>
          );
        },
        tabBarShowLabel: true,
        tabBarStyle: { height: '7%' },
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Users" component={User} />
      <Tab.Screen name="Coming soon" component={Login} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    height: 90,
    width: 90,
    borderRadius: 60,
    backgroundColor: 'white', 
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 7,
    borderColor: "#F0F0F0"
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});
