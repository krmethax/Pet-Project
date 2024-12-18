import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ถูกต้อง

// นำเข้าหน้าจอต่างๆ ที่คุณมี
import OnBoarding from '../screens/OnBoardingScreen';
import SelectLogin from '../screens/SelectLoginScreen';
import MemberLogin from '../screens/MemberLoginScreen';
import SignUpScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PetsitterScreen from '../screens/PetsitterScreen';
import SettingsScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Main Stack Navigator สำหรับการควบคุมหน้า OnBoarding, Login และหน้าอื่นๆ
function MainStackNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const sessionData = await AsyncStorage.getItem('session');
      if (sessionData) {
        setIsLoggedIn(true); // ถ้ามี session แสดงว่าเข้าสู่ระบบแล้ว
      } else {
        setIsLoggedIn(false); // ถ้าไม่มี session แสดงว่ายังไม่ได้เข้าสู่ระบบ
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? "HomeTabs" : "OnBoarding"}>
      {/* ถ้าเข้าสู่ระบบแล้วให้ไปที่ HomeTabs ถ้าไม่ให้ไปที่ OnBoarding */}
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SelectLogin"
        component={SelectLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MemberLogin"
        component={MemberLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      {/* ใช้ Tab Navigator หลังจากเข้าสู่ระบบ */}
      <Stack.Screen
        name="HomeTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Tab Navigator สำหรับหน้า Home, Payment, Petsitter, Settings
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Payment') {
            iconName = 'card';
          } else if (route.name === 'Petsitter') {
            iconName = 'people';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00C283',
        tabBarInactiveTintColor: '#888',
        headerShown: false, // ซ่อน header ของแต่ละหน้า
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'หน้าหลัก' }} />
      <Tab.Screen name="Payment" component={PaymentScreen} options={{ title: 'ชำระเงิน' }} />
      <Tab.Screen name="Petsitter" component={PetsitterScreen} options={{ title: 'พี่เลี้ยง' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'การตั้งค่า' }} />
    </Tab.Navigator>
  );
}

export default MainStackNavigator;
