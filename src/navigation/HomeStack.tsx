import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import type {
  HomeStackParamList,
} from './types';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MenuScreen from '../screens/MenuScreen/MenuScreen';

import PlaceholderScreen from './PlaceholderScreen';


// ============================================================
// STACK
// ============================================================

const Stack =
  createNativeStackNavigator<
    HomeStackParamList
  >();


// ============================================================
// RESTAURANT DETAILS
// ============================================================

const RestaurantDetailsScreen = () => {
  return (
    <PlaceholderScreen
      title="Restaurant Details"
      description="Use this route later for restaurant detail content."
    />
  );
};


// ============================================================
// SEARCH
// ============================================================

const SearchScreen = () => {
  return (
    <PlaceholderScreen
      title="Search"
      description="This route can host your future search experience."
    />
  );
};


// ============================================================
// HOME STACK
// ============================================================

const HomeStackNavigator = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>

      {/* ==================================================
          HOME
      ================================================== */}

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />


      {/* ==================================================
          RESTAURANT DETAILS
      ================================================== */}

      <Stack.Screen
        name="RestaurantDetails"
        component={
          RestaurantDetailsScreen
        }
      />


      {/* ==================================================
          SEARCH
      ================================================== */}

      <Stack.Screen
        name="Search"
        component={
          SearchScreen
        }
      />


      {/* ==================================================
          MENU
      ================================================== */}

      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen }
      />

    </Stack.Navigator>
  );
};


// ============================================================
// EXPORT
// ============================================================

export default HomeStackNavigator;