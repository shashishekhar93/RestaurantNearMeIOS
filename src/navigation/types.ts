import type {NavigatorScreenParams} from '@react-navigation/native';

// Root-level routes. The app starts on SplashScreen and then moves through the
// authentication experience before reaching the main tabbed experience.
export type RootStackParamList = {
  SplashScreen: undefined;
  OnboardingScreen: undefined;
  LoginScreen: undefined;
  OTPScreen: {phoneNumber?: string} | undefined;
  LocationPermissionScreen: undefined;
  BottomTabs: undefined;
  Wallet: undefined;
  Notification: undefined;
  Reward: undefined;
};

// The tab bar only exposes the five main sections requested by the app.
export type BottomTabParamList = {
  Home: undefined;
  Map: undefined;
  Favorites: undefined;
  Reservations: undefined;
  Account: undefined;
};

// Each tab is backed by its own stack so future screens can be pushed without
// mixing routes between tabs.
export type HomeStackParamList = {
  HomeScreen: undefined;
  RestaurantDetails: {
    restaurantId?: string;
    name?: string;
  } | undefined;
  Search: undefined;
};

export type MapStackParamList = {
  MapScreen: undefined;
  Search: undefined;
  RestaurantDetails: {restaurantId?: string; name?: string} | undefined;
};

export type FavoritesStackParamList = {
  FavoritesScreen: undefined;
  RestaurantDetails: {restaurantId?: string; name?: string} | undefined;
  Search: undefined;
};

export type ReservationStackParamList = {
  ReservationsScreen: undefined;
  BookingDetails: {bookingId?: string} | undefined;
  Search: undefined;
};

export type AccountStackParamList = {
  AccountScreen: undefined;
  EditProfile: undefined;
  SavedAddresses: undefined;
  HelpFAQ: undefined;
};

// This is used by the root stack to point to the tab navigator.
export type RootStackParamListWithTabs = RootStackParamList & {
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
};
