/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import RootNavigator from './src/navigations/RootNavigator';
import { navigationRef, navigate } from './src/navigations/NavigationService';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import MyComponent from './src/Components/bottomNavigation';
import BottomTabs from './src/Components/bottomNavigation';
import { useContext, useEffect, useState } from 'react';
import { AuthProvider } from './contexts/Auth';
import Splash from './src/Screens/Spalsh/splash';
import { Provider } from 'react-redux';
import { store } from './store';
import { ApolloProvider } from "@apollo/client/react";
import client from './src/Network/client';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const AppLayout = () => {

  const [splash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false)
    }, 2000)
  }, [setTimeout])

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '756528776450-pcjffvh09duv1gmjst6li4cd617e9rbr.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, [])

  return splash ? <Splash /> : <RootNavigator />;
};
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ApolloProvider client={client}>
          <AuthProvider>
          <NavigationContainer
            ref={navigationRef}>
            <AppLayout />
          </NavigationContainer>
          </AuthProvider>
        </ApolloProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
