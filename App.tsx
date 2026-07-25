/**
 * Restaurants Near Me Onboarding
 * @format
 */

import React, {useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import OnBoardingScreen from './src/screens/OnboardingScreen';
import SignUpScreen from './src/screens/SignUpScreen';

type AppScreen = 'onboarding' | 'signup';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('onboarding');

  const handleGetStarted = () => {
    // "When the user taps Get Started, open the Sign Up flow."
    setCurrentScreen('signup');
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {currentScreen === 'onboarding' ? (
        <OnBoardingScreen onGetStarted={handleGetStarted} />
      ) : (
        <SignUpScreen />
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
