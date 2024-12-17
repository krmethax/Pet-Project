import { createNativeStackNavigator } from '@react-navigation/native-stack';  

import OnBoarding from '../screens/OnBoardingScreen';
import SelectLogin from '../screens/SelectLoginScreen';
import MemberLogin from '../screens/MemberLoginScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <Stack.Navigator initialRouteName="OnBoardingScreen">
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
    </Stack.Navigator>
  );
}
