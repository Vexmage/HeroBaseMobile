import React, { useEffect, useState } from 'react';
import AppNavigation from './screens/AppNavigation';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); // Prevent auto-hide until everything is loaded

const fetchFonts = () => {
  return Font.loadAsync({
    'ConanFont': require('./assets/fonts/Crom_v1.ttf'), // Ensure the path is correct
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await fetchFonts(); // Wait for fonts to be loaded
        setFontLoaded(true);
      } catch (e) {
        console.warn(e);
      } finally {
        if (fontLoaded) {
          SplashScreen.hideAsync(); // Hide the splash screen when ready
        }
      }
    }

    prepare();
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null; // Don't render anything while fonts are loading
  }

  return <AppNavigation />;
}
