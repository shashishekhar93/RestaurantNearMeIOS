import type {NavigatorScreenParams} from '@react-navigation/native';

import type {Restaurant} from '../api/services/restaurantList/Restaurant';


// ============================================================
// ROOT NAVIGATION
// ============================================================

// Root-level routes. The app starts on SplashScreen and then moves
// through the authentication experience before reaching the main
// tabbed experience.
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


// ============================================================
// BOTTOM TABS
// ============================================================

// The tab bar exposes the five main sections of the application.
export type BottomTabParamList = {
  Home: undefined;
  Map: undefined;
  Favorites: undefined;
  Reservations: undefined;
  Account: undefined;
};


// ============================================================
// HOME STACK
// ============================================================

export type HomeStackParamList = {

  /**
   * Home screen.
   */
  HomeScreen: undefined;


   /**
   * Menu screen.
   *
   * We pass the complete Restaurant object from HomeScreen.
   *
   * This means MenuScreen does NOT need to call the restaurant
   * API again just to get basic restaurant information.
   *
   * It can directly use:
   *
   * route.params.restaurant
   */
  MenuScreen: {
    restaurant: Restaurant;
  };


  /**
   * Restaurant details screen.
   *
   * Existing route kept unchanged.
   */
  RestaurantDetails: {
    restaurantId?: string;
    name?: string;
  } | undefined;


  /**
   * Search screen.
   */
  Search: undefined;
};


// ============================================================
// MAP STACK
// ============================================================

export type MapStackParamList = {
  MapScreen: undefined;
  Search: undefined;

  RestaurantDetails: {
    restaurantId?: string;
    name?: string;
  } | undefined;
};


// ============================================================
// FAVORITES STACK
// ============================================================

export type FavoritesStackParamList = {
  FavoritesScreen: undefined;

  RestaurantDetails: {
    restaurantId?: string;
    name?: string;
  } | undefined;

  Search: undefined;
};


// ============================================================
// RESERVATION STACK
// ============================================================

export type ReservationStackParamList = {

  // ==========================================================
  // RESERVATIONS
  // ==========================================================

  ReservationsScreen: undefined;


  // ==========================================================
  // BOOK TABLE
  // ==========================================================

  BookTable: undefined;


  // ==========================================================
  // BOOKING DATE & TIME
  // ==========================================================

  BookTableDate: {
    guests?: number;
  };


  // ==========================================================
  // BOOKING SEATING
  // ==========================================================

  BookTableSeating: {
    guests?: number;
    date?: string;
    time?: string;
  };


  // ==========================================================
  // BOOKING DETAILS
  // ==========================================================

  BookTableDetails: {
    guests?: number;
    date?: string;
    time?: string;
    seating?: string;
  };


  // ==========================================================
  // BOOKING REVIEW
  // ==========================================================

  BookTableReview: {
    guests?: number;
    date?: string;
    time?: string;
    seating?: string;
    fullName?: string;
    mobileNumber?: string;
    email?: string;
    specialRequests?: string;
  };


  // ==========================================================
  // BOOKING SUCCESS
  // ==========================================================

  BookingSuccess: {
    guests?: number;
    date?: string;
    time?: string;
    seating?: string;
    fullName?: string;
    mobileNumber?: string;
    email?: string;
    specialRequests?: string;
  };


  // ==========================================================
  // EXISTING BOOKING DETAILS
  // ==========================================================

  BookingDetails: {
    bookingId?: string;
  } | undefined;


  // ==========================================================
  // SEARCH
  // ==========================================================

  Search: undefined;
};


// ============================================================
// ACCOUNT STACK
// ============================================================

export type AccountStackParamList = {
  AccountScreen: undefined;
  EditProfile: undefined;
  SavedAddresses: undefined;
  HelpFAQ: undefined;
};


// ============================================================
// ROOT STACK WITH TABS
// ============================================================

// Used by the root stack to point to the tab navigator.
export type RootStackParamListWithTabs =
  RootStackParamList & {
    BottomTabs: NavigatorScreenParams<BottomTabParamList>;
  };
