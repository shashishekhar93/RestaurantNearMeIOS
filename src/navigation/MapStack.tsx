import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import type {
  MapStackParamList,
} from './types';

import MapScreen from '../screens/MapScreen/MapScreen';

import PlaceholderScreen from './PlaceholderScreen';


// ============================================================
// STACK
// ============================================================

const Stack =
  createNativeStackNavigator<
    MapStackParamList
  >();


// ============================================================
// SEARCH SCREEN
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
// RESTAURANT DETAILS SCREEN
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
// MAP STACK
// ============================================================

const MapStack = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>

      {/* ==================================================
          MAP
      ================================================== */}

      <Stack.Screen
        name="MapScreen"
        component={
          MapScreen
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
          RESTAURANT DETAILS
      ================================================== */}

      <Stack.Screen
        name="RestaurantDetails"
        component={
          RestaurantDetailsScreen
        }
      />

    </Stack.Navigator>
  );
};


// ============================================================
// EXPORT
// ============================================================

export default MapStack;

// import React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import type {MapStackParamList} from './types';
// import PlaceholderScreen from './PlaceholderScreen';
// import MainLayout from '../component/MainLayout';

// const Stack = createNativeStackNavigator<MapStackParamList>();

// const MapScreen = () => {
//   return (
//   <MainLayout>
//     <PlaceholderScreen
//       title="Map"
//       description="This screen can host your location-based restaurant map."
//     />
//   </MainLayout>
// );
// };

// const SearchScreen = () => {
//   return (
//     <PlaceholderScreen
//       title="Search"
//       description="This route can host your future search experience."
//     />
//   );
// };

// const RestaurantDetailsScreen = () => {
//   return (
//     <PlaceholderScreen
//       title="Restaurant Details"
//       description="Add detail UI later while keeping the stack structure intact."
//     />
//   );
// };

// const MapStackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen
//         name="MapScreen"
//         component={MapScreen}
//       />
//       <Stack.Screen name="Search" component={SearchScreen} />
//       <Stack.Screen name="RestaurantDetails" component={RestaurantDetailsScreen} />
//     </Stack.Navigator>
//   );
// };

// export default MapStackNavigator;
