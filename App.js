import React, { useEffect, useState } from 'react';
import AppNavigation from './screens/AppNavigation';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync(); // Prevent auto-hide until everything is loaded

// Load custom font asynchronously
// Wait for fonts to be loaded
// Hide the splash screen when ready
// Don't render anything while fonts are loading

const fetchFonts = () => { // Load custom font
  return Font.loadAsync({ // Load the font asynchronously 
    'ConanFont': require('./assets/fonts/Crom_v1.ttf'), // we're using ConanFont here, but the font is actually named Crom. 
  });
};

export default function App() { // App component
  const [fontLoaded, setFontLoaded] = useState(false); // Font loaded state

  useEffect(() => { // useEffect hook
    async function prepare() { // Prepare function
      try { // Try block
        await fetchFonts(); // Wait for fonts to be loaded
        setFontLoaded(true); // Set font loaded to true
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
