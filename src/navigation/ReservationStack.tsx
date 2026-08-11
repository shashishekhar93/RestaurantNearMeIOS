import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import type {
  ReservationStackParamList,
} from './types';

import PlaceholderScreen from './PlaceholderScreen';

import ReservationScreen
  from '../screens/Reservations/ReservationsScreen';

// ============================================================
// NAVIGATOR
// ============================================================

const Stack =
  createNativeStackNavigator<
    ReservationStackParamList
  >();

// ============================================================
// BOOKING DETAILS
// ============================================================

const BookingDetailsScreen = () => {
  return (
    <PlaceholderScreen
      title="Booking Details"
      description="This route is ready for a detailed reservation view."
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
      description="Search can be added here later without touching the tab layout."
    />
  );
};

// ============================================================
// RESERVATION STACK
// ============================================================

const ReservationStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>

      {/* ======================================================
          RESERVATIONS
      ====================================================== */}

      <Stack.Screen
        name="ReservationsScreen"
        component={
          ReservationScreen
        }
      />

      {/* ======================================================
          BOOKING DETAILS
      ====================================================== */}

      <Stack.Screen
        name="BookingDetails"
        component={
          BookingDetailsScreen
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

export default ReservationStackNavigator;

// import React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import type {ReservationStackParamList} from './types';
// import PlaceholderScreen from './PlaceholderScreen';
// import MainLayout from '../component/MainLayout';
// const Stack = createNativeStackNavigator<ReservationStackParamList>();
// import ReservationScreen
//   from '../screens/Reservations/ReservationsScreen';


// const ReservationsScreen = () => {
//   return (
//   <MainLayout>
//     <PlaceholderScreen
//       title="Reservations"
//       description="This stack can host booking history and reservation details."
//     />
//   </MainLayout>
// );
// };

// const BookingDetailsScreen = () => {
//   return (
//     <PlaceholderScreen
//       title="Booking Details"
//       description="This route is ready for a detailed reservation view."
//     />
//   );
// };

// const SearchScreen = () => {
//   return (
//     <PlaceholderScreen
//       title="Search"
//       description="Search can be added here later without touching the tab layout."
//     />
//   );
// };

// const ReservationStackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="ReservationsScreen" component={ReservationsScreen} />
//       <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
//       <Stack.Screen name="Search" component={SearchScreen} />
//     </Stack.Navigator>
//   );
// };

// export default ReservationStackNavigator;
