import { StyleSheet,} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';

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
      <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
