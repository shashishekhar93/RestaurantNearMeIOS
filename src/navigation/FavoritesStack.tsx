import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import type {
  FavoritesStackParamList,
} from './types';

import FavoritesScreen
  from '../screens/Favorites/FavoritesScreen';

import PlaceholderScreen
  from './PlaceholderScreen';

// ============================================================
// NAVIGATOR
// ============================================================

const Stack =
  createNativeStackNavigator<
    FavoritesStackParamList
  >();

// ============================================================
// RESTAURANT DETAILS
// ============================================================

const RestaurantDetailsScreen = () => {
  return (
    <PlaceholderScreen
      title="Restaurant Details"
      description="Restaurant details can be added here later."
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
      description="Search can be added here later."
    />
  );
};

// ============================================================
// FAVORITES STACK
// ============================================================

const FavoritesStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>

      {/* ======================================================
          FAVORITES
      ====================================================== */}

      <Stack.Screen
        name="FavoritesScreen"
        component={
          FavoritesScreen
        }
      />

      {/* ======================================================
          RESTAURANT DETAILS
      ====================================================== */}

      <Stack.Screen
        name="RestaurantDetails"
        component={
          RestaurantDetailsScreen
        }
      />

      {/* ======================================================
          SEARCH
      ====================================================== */}

      <Stack.Screen
        name="Search"
        component={
          SearchScreen
        }
      />

    </Stack.Navigator>
  );
};

export default FavoritesStackNavigator;
// import React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import type {FavoritesStackParamList} from './types';
// import PlaceholderScreen from './PlaceholderScreen';
// import MainLayout from '../component/MainLayout';

// const Stack = createNativeStackNavigator<FavoritesStackParamList>();

// const FavoritesScreen = () => {
//   return (
//   <MainLayout>
//     <PlaceholderScreen
//       title="Favorites"
//       description="This screen can host saved restaurants later."
//     />
//   </MainLayout>
// );
// };

// const RestaurantDetailsScreen = () => {
//   return (
//     <PlaceholderScreen
//       title="Restaurant Details"
//       description="Future detail screens can be pushed from favorites."
//     />
//   );
// };

// const SearchScreen = () => {
//   return (
//     <PlaceholderScreen
//       title="Search"
//       description="A dedicated search route can be used from favorites too."
//     />
//   );
// };

// const FavoritesStackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
//       <Stack.Screen name="RestaurantDetails" component={RestaurantDetailsScreen} />
//       <Stack.Screen name="Search" component={SearchScreen} />
//     </Stack.Navigator>
//   );
// };

// export default FavoritesStackNavigator;
