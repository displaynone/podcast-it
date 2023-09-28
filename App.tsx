import {
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import VideoSelector from './src/components/VideoSelector';
import { colors } from './src/colors';
import LocalizationProvider from './src/providers/LocalizationProvider';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [isSetUp, setIsSetUp] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_900Black,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync().then(async () => {
        if (!isSetUp) {
          setIsSetUp(true);
          await TrackPlayer.setupPlayer();
        }
      });
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ScrollView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar barStyle="light-content" />
      <LocalizationProvider>
        <VideoSelector />
      </LocalizationProvider>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: colors.darkBlue,
  },
});
