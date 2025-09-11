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
import { Auth } from './contexts/Auth';
import Splash from './src/Screens/Spalsh/splash';
import { Provider } from 'react-redux';
import { store } from './store';

const AppLayout = () => {

  const [splash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false)
    },2000)
  },[setTimeout])
  
  return splash ? <Splash /> : <RootNavigator />;
};
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer
          ref={navigationRef}>
            <AppLayout/>
          </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
