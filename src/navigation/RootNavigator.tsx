import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, type NativeStackScreenProps} from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {Colors, Fonts, Spacing, Typography} from '../theme';
import BottomTabNavigator from './BottomTabNavigator';
import WalletScreen from '../screens/WalletScreen';
import type {RootStackParamList} from './types';
import AppText from '../component/AppText';
import NotificationScreen from '../screens/notification/NotificationScreen';
import RewardScreen from '../screens/Rewards/RewardScreen';
const RootStack = createNativeStackNavigator<RootStackParamList>();
type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'SplashScreen'>;
type OnboardingRouteProps = NativeStackScreenProps<RootStackParamList, 'OnboardingScreen'>;
type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;
type OTPScreenProps = NativeStackScreenProps<RootStackParamList, 'OTPScreen'>;
type LocationPermissionScreenProps = NativeStackScreenProps<RootStackParamList, 'LocationPermissionScreen'>;
import VerifyOtpScreen from '../screens/loginFlow/VerifyOtpScreen';
import {SessionManager} from '../utils/SessionManager';

// SplashScreen shows a short loading state before moving to onboarding.
const SplashScreen = ({navigation}: SplashScreenProps) => {
  useEffect(() => {
    checkLogin();
  }, []);
  const checkLogin = async () => {
      await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1200);
});

    const token =
      await SessionManager.getAccessToken();
    if (token) {
      navigation.replace('BottomTabs');
    } else {
      navigation.replace('OnboardingScreen');
    }
  };

  return (

    <View style={styles.centeredContainer}>

      <AppText style={styles.logoText}>
        Restaurants Near Me
      </AppText>

      <ActivityIndicator
        size="large"
        color={Colors.primary600}
      />

    </View>

  );

};

// The onboarding screen remains unchanged in UI and simply routes the user to
// the next authentication step.
const OnboardingScreenRoute = ({navigation}: OnboardingRouteProps) => {
  return (
    <OnboardingScreen
      onGetStarted={() => navigation.navigate('LoginScreen')}
      onLoginSuccess={() => navigation.navigate('BottomTabs')}
    />
  );
};

// LoginScreen uses the existing sign-up UI as a wrapper so the current design
// is preserved while the route is now part of the navigation flow.
const LoginScreenRoute = ({navigation}: LoginScreenProps) => {
  return (
    <SignUpScreen
      onSignedIn={() => navigation.navigate('OTPScreen')}
    />
  );
};


// LocationPermissionScreen reuses the existing location flow without changing its UI.
const LocationPermissionScreenRoute = ({navigation}: LocationPermissionScreenProps) => {
  return (
    <SignUpScreen
      onSignedIn={() => navigation.replace('BottomTabs')}
    />
  );
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="SplashScreen" screenOptions={{headerShown: false}}>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="OnboardingScreen" component={OnboardingScreenRoute} />
        <RootStack.Screen name="LoginScreen" component={LoginScreenRoute} />
        <RootStack.Screen name="OTPScreen" component={VerifyOtpScreen} />
        <RootStack.Screen name="LocationPermissionScreen" component={LocationPermissionScreenRoute} />
        <RootStack.Screen name="Wallet" component={WalletScreen} />
        <RootStack.Screen name="Notification" component={NotificationScreen} />
        <RootStack.Screen name="Reward" component={RewardScreen} />
        <RootStack.Screen name="BottomTabs" component={BottomTabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.mainBackground,
  },
  logoText: {
    fontSize: Typography.h1,
    fontFamily: Fonts.interBold,
    color: Colors.neutral900,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.h2,
    fontFamily: Fonts.interBold,
    color: Colors.neutral900,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: Typography.body,
    fontFamily: Fonts.interRegular,
    color: Colors.neutral600,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  actionText: {
    fontSize: Typography.body,
    fontFamily: Fonts.interSemiBold,
    color: Colors.primary600,
  },
});

export default RootNavigator;
