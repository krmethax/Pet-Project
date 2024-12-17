import { createNativeStackNavigator } from '@react-navigation/native-stack';  

import OnBoarding from '../screens/OnBoardingScreen';
import SelectLogin from '../screens/SelectLoginScreen';
import MemberLogin from '../screens/MemberLoginScreen';
import SignUpScreen from '../screens/SignupScreen';
import Home from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <Stack.Navigator initialRouteName="OnBoarding">
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
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
