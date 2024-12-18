import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

// นำเข้า MainNavigation
import MainNavigation from './navigation/MainNavigation';

export default function App() {
  const [fontsLoaded, error] = useFonts({
    'IBMPlexSansThai-Light': require('./assets/fonts/IBMPlexSansThai-Light.ttf'),
    'IBMPlexSansThai-Medium': require('./assets/fonts/IBMPlexSansThai-Medium.ttf'),
    'IBMPlexSansThai-Bold': require('./assets/fonts/IBMPlexSansThai-Bold.ttf'),
  });

  if (error) {
    console.error('Error loading font:', error);
    return <Text></Text>;
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: 'IBMPlexSansThai-Medium' };
  Text.defaultProps.style = { fontFamily: 'IBMPlexSansThai-Light' };
  Text.defaultProps.style = { fontFamily: 'IBMPlexSansThai-Bold' };
  Text.defaultProps.style = { fontFamily: 'IBMPlexSansThai-Regular' };

  return (
    <NavigationContainer>
      <MainNavigation /> {/* เรียกใช้ MainNavigation */}
    </NavigationContainer>
  );
}
