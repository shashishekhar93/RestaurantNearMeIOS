/**
 * Restaurants Near Me Onboarding
 * @format
 */

import React, {useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import OnBoardingScreen from './src/screens/OnboardingScreen';
import ParentScreen from './src/screens/ParentScreen';
import SignUpScreen from './src/screens/SignUpScreen';

type AppScreen = 'onboarding' | 'signup' | 'parent';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('onboarding');

  const handleGetStarted = () => {
    // When the user taps Get Started, open the Sign Up flow.
    setCurrentScreen('signup');
  };

  const handleLoginSuccess = () => {
    // When login or account creation succeeds, show the ParentScreen.
    setCurrentScreen('parent');
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {currentScreen === 'onboarding' ? (
        <OnBoardingScreen
          onGetStarted={handleGetStarted}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : currentScreen === 'signup' ? (
        <SignUpScreen onSignedIn={handleLoginSuccess} />
      ) : (
        <ParentScreen />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
