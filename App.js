import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login, Movie, Checkout, Profile, Register, Search, SelectSeat, ShowAll, Ticket, Payment, Scanner } from './screens';
import { AuthProvider } from './contexts/AuthContext';
import { LangProvider } from './contexts/LangContext';
import { StatusBar } from 'react-native';

StatusBar.setBarStyle('light-content');
StatusBar.setBackgroundColor('transparent');
StatusBar.setTranslucent(true);

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  // loading custom fonts
  const [fontsLoaded, fontError] = useFonts({
    light: require('./assets/fonts/OpenSans-Light.ttf'),
    regular: require('./assets/fonts/OpenSans-Regular.ttf'),
    medium: require('./assets/fonts/OpenSans-Medium.ttf'),
    bold: require('./assets/fonts/OpenSans-Bold.ttf'),
    semibold: require('./assets/fonts/OpenSans-SemiBold.ttf'),
    extrabold: require('./assets/fonts/OpenSans-ExtraBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <LangProvider>
      <AuthProvider>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="Search"
            component={Search}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="ShowAll"
            component={ShowAll}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="Movie"
            component={Movie}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="SelectSeat"
            component={SelectSeat}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{ headerShown: false }} />
          
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="Ticket"
            component={Ticket}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="Scanner"
            component={Scanner}
            options={{ headerShown: false }} />

        </Stack.Navigator>
      </AuthProvider>
      </LangProvider>
    </NavigationContainer>
  );
}