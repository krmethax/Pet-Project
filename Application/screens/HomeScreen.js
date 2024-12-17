import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        console.log('JWT Token:', token);
      } else {
        console.log('No token found');
      }
    };

    checkToken();
  }, []);

  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
    </View>
  );
}
