import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {FavoritesStackParamList} from './types';
import PlaceholderScreen from './PlaceholderScreen';
import MainLayout from '../component/MainLayout';

const Stack = createNativeStackNavigator<FavoritesStackParamList>();

const FavoritesScreen = () => {
  return (
  <MainLayout>
    <PlaceholderScreen
      title="Favorites"
      description="This screen can host saved restaurants later."
    />
  </MainLayout>
);
};

const RestaurantDetailsScreen = () => {
  return (
    <PlaceholderScreen
      title="Restaurant Details"
      description="Future detail screens can be pushed from favorites."
    />
  );
};

const SearchScreen = () => {
  return (
    <PlaceholderScreen
      title="Search"
      description="A dedicated search route can be used from favorites too."
    />
  );
};

const FavoritesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetailsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default FavoritesStackNavigator;
