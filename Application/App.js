import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigation from './navigation/MainNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
}