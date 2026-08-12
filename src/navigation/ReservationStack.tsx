import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import type {
  ReservationStackParamList,
} from './types';

import ReservationsScreen
  from '../screens/Reservations/ReservationsScreen';

import BookTableScreen
  from '../screens/bookTable/BookTableScreen';

import BookTableDateScreen
  from '../screens/bookTable/BookTableDateScreen';

import BookTableSeatingScreen
  from '../screens/bookTable/BookTableSeatingScreen';

import BookTableDetailsScreen
  from '../screens/bookTable/BookTableDetailsScreen';

import BookTableReviewScreen
  from '../screens/bookTable/BookTableReviewScreen';

import BookingSuccessScreen
  from '../screens/bookTable/BookingSuccessScreen';

import PlaceholderScreen
  from './PlaceholderScreen';

  import ReservationDetailScreen
  from '../screens/Reservations/ReservationDetailScreen';

// ============================================================
// NAVIGATOR
// ============================================================

const Stack =
  createNativeStackNavigator<
    ReservationStackParamList
  >();

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
          ReservationsScreen
        }
      />


      {/* ======================================================
          BOOK TABLE
      ====================================================== */}

      <Stack.Screen
        name="BookTable"
        component={
          BookTableScreen
        }
      />


      {/* ======================================================
          BOOKING DATE
      ====================================================== */}

      <Stack.Screen
        name="BookTableDate"
        component={
          BookTableDateScreen
        }
      />


      {/* ======================================================
          BOOKING SEATING
      ====================================================== */}

      <Stack.Screen
        name="BookTableSeating"
        component={
          BookTableSeatingScreen
        }
      />


      {/* ======================================================
          BOOKING DETAILS
      ====================================================== */}

      <Stack.Screen
        name="BookTableDetails"
        component={
          BookTableDetailsScreen
        }
      />


      {/* ======================================================
          BOOKING REVIEW
      ====================================================== */}

      <Stack.Screen
        name="BookTableReview"
        component={
          BookTableReviewScreen
        }
      />


      {/* ======================================================
          BOOKING SUCCESS
      ====================================================== */}

      <Stack.Screen
        name="BookingSuccess"
        component={
          BookingSuccessScreen
        }
      />


      {/* ======================================================
          EXISTING BOOKING DETAILS
      ====================================================== */}

      <Stack.Screen
        name="BookingDetails"
        component={
          ReservationDetailScreen
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

// import {
//   createNativeStackNavigator,
// } from '@react-navigation/native-stack';

// import type {
//   ReservationStackParamList,
// } from './types';

// import PlaceholderScreen from './PlaceholderScreen';

// import ReservationScreen
//   from '../screens/Reservations/ReservationsScreen';

// // ============================================================
// // NAVIGATOR
// // ============================================================

// const Stack =
//   createNativeStackNavigator<
//     ReservationStackParamList
//   >();

// // ============================================================
// // BOOKING DETAILS
// // ============================================================

// const BookingDetailsScreen = () => {
//   return (
//     <PlaceholderScreen
//       title="Booking Details"
//       description="This route is ready for a detailed reservation view."
//     />
//   );
// };

// // ============================================================
// // SEARCH
// // ============================================================

// const SearchScreen = () => {
//   return (
//     <PlaceholderScreen
//       title="Search"
//       description="Search can be added here later without touching the tab layout."
//     />
//   );
// };

// // ============================================================
// // RESERVATION STACK
// // ============================================================

// const ReservationStackNavigator = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>

//       {/* ======================================================
//           RESERVATIONS
//       ====================================================== */}

//       <Stack.Screen
//         name="ReservationsScreen"
//         component={
//           ReservationScreen
//         }
//       />

//       {/* ======================================================
//           BOOKING DETAILS
//       ====================================================== */}

//       <Stack.Screen
//         name="BookingDetails"
//         component={
//           BookingDetailsScreen
//         }
//       />

//       {/* ======================================================
//           SEARCH
//       ====================================================== */}

//       <Stack.Screen
//         name="Search"
//         component={
//           SearchScreen
//         }
//       />

//     </Stack.Navigator>
//   );
// };

// export default ReservationStackNavigator;