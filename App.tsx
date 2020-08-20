import { StatusBar } from 'expo-status-bar';
import React from 'react';
//import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './src/App'
import { AppLoading } from 'expo'
import { useFonts } from '@use-expo/font';

import Amplify from 'aws-amplify'
import config from './aws-exports'

import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
//import Navigation from './navigation';

Amplify.configure(config)

function AppWithNavigationContainer() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  let [fontsLoaded] = useFonts({
    'SourceSansPro-Regular': require('./src/assets/fonts/SourceSansPro-Regular.ttf'),
    'SourceSansPro-SemiBold': require('./src/assets/fonts/SourceSansPro-SemiBold.ttf'),
  });

  if (!isLoadingComplete || !fontsLoaded) {
    return <AppLoading />
  } else {
    return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
    );
  /*  return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );*/
  }
}

export default AppWithNavigationContainer