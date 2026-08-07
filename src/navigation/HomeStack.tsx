import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {HomeStackParamList} from './types';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import PlaceholderScreen from './PlaceholderScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const RestaurantDetailsScreen = () => {
  return (
    <PlaceholderScreen
      title="Restaurant Details"
      description="Use this route later for restaurant detail content."
    />
  );
};

const SearchScreen = () => {
  return (
    <PlaceholderScreen
      title="Search"
      description="This route can host your future search experience."
    />
  );
};

// HomeStack keeps routes related to the home experience isolated from the other tabs.
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetailsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
