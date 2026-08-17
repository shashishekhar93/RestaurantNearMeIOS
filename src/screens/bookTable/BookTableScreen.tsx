import React, {
  useState,
} from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';


import type {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import type {
  ReservationStackParamList,
} from '../../navigation/types';

import AppText
  from '../../component/AppText/AppText';

import BookingHeader
  from './BookingHeader';

import BookingRestaurantCard
  from './BookingRestaurantCard';

import GuestSelector
  from './GuestSelector';

import BookingBottomBar
  from './BookingBottomBar';

import {
  Colors,
  Fonts,
  Spacing,
  Typography,
} from '../../theme';


// ============================================================
// NAVIGATION
// ============================================================

type Props =
  NativeStackScreenProps<
    ReservationStackParamList,
    'BookTable'
  >;


// ============================================================
// SCREEN
// ============================================================
    const BookTableScreen = ({
      navigation,
      route,
    }: Props) => {


  // ==========================================================
  // GUESTS
  // ==========================================================

  const [
    guests,
    setGuests,
  ] = useState(2);


  // ==========================================================
  // CONTINUE
  // ==========================================================

  const handleContinue = () => {

    navigation.navigate(
      'BookTableDate',
      {
        guests,
      },
    );
  };


  // ==========================================================
  // BACK
  // ==========================================================

  // const handleBack = () => {

  //   navigation.goBack();

  // };

  const handleBack = () => {
      if (route.params.source === 'menu') {
        navigation
          .getParent()
          ?.navigate('Home', {
            screen: 'MenuScreen',
            params: {
              restaurant: route.params.restaurant,
            },
          });

        return;
      }

      navigation.goBack();
    };



  // ==========================================================
  // UI
  // ==========================================================

  return (
    <View style={styles.screen}>

      {/* ======================================================
          HEADER
      ====================================================== */}

      <BookingHeader
        restaurantName="The Cozy Kitchen"
        restaurantSubtitle="Italian · Café"
        currentStep={1}
        totalSteps={5}
        onBack={handleBack}
      />


      {/* ======================================================
          CONTENT
      ====================================================== */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }>

        {/* ====================================================
            RESTAURANT
        ==================================================== */}

        <BookingRestaurantCard
          restaurantName="The Cozy Kitchen"
          cuisine="Italian · Café"
          distance="0.3 km"
          rating={4.8}
        />


        {/* ====================================================
            TITLE
        ==================================================== */}

        <View
          style={styles.section}>

          <AppText
            style={styles.title}>
            How many guests?
          </AppText>


          <AppText
            style={styles.description}>
            Select the number of people joining
            your reservation.
          </AppText>

        </View>


        {/* ====================================================
            GUEST SELECTOR
        ==================================================== */}

        <GuestSelector
          value={guests}
          min={1}
          max={20}
          onChange={setGuests}
        />

      </ScrollView>


      {/* ======================================================
          BOTTOM ACTION
      ====================================================== */}

      <BookingBottomBar
        buttonText="Continue"
        onPress={handleContinue}
        secondaryText={`${guests} ${
          guests === 1
            ? 'guest'
            : 'guests'
        } selected`}
      />

    </View>
  );
};


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // SCREEN
  // ==========================================================

  screen: {
    flex: 1,

    backgroundColor:
      Colors.mainBackground,
  },


  // ==========================================================
  // CONTENT
  // ==========================================================

  content: {
    flexGrow: 1,

    paddingHorizontal:
      Spacing.md,

    paddingTop:
      Spacing.md,

    paddingBottom:
      Spacing.lg,
  },


  // ==========================================================
  // SECTION
  // ==========================================================

  section: {
    marginTop:
      Spacing.xl,

    marginBottom:
      Spacing.lg,
  },


  // ==========================================================
  // TITLE
  // ==========================================================

  title: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.h2,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // DESCRIPTION
  // ==========================================================

  description: {
    marginTop:
      Spacing.xs,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.body,

    lineHeight: 22,

    color:
      Colors.neutral600,
  },

});


export default React.memo(
  BookTableScreen,
);

// import React, {
//   useState,
// } from 'react';

// import {
//   ScrollView,
//   StyleSheet,
//   View,
// } from 'react-native';

// import {
//   useNavigation,
// } from '@react-navigation/native';

// import type {
//   NativeStackNavigationProp,
// } from '@react-navigation/native-stack';

// import MainLayout from '../../component/MainLayout';

// import AppText from '../../component/AppText/AppText';

// import BookingHeader
//   from './BookingHeader';

// import BookingRestaurantCard
//   from './BookingRestaurantCard';

// import GuestSelector
//   from './GuestSelector';

// import BookingBottomBar
//   from './BookingBottomBar';

// import {
//   Colors,
//   Fonts,
//   Spacing,
//   Typography,
// } from '../../theme';


// // ============================================================
// // NAVIGATION
// // ============================================================

// type ReservationNavigationProp =
//   NativeStackNavigationProp<any>;


// // ============================================================
// // SCREEN
// // ============================================================

// const BookTableScreen = () => {

//   const navigation =
//     useNavigation<
//       ReservationNavigationProp
//     >();


//   // ==========================================================
//   // GUESTS
//   // ==========================================================

//   const [guests, setGuests] =
//     useState(2);


//   // ==========================================================
//   // CONTINUE
//   // ==========================================================

//   const handleContinue = () => {

//     navigation.navigate(
//       'BookTableDate',
//       {
//         guests,
//       },
//     );

//   };


//   // ==========================================================
//   // BACK
//   // ==========================================================

//   const handleBack = () => {

//     navigation.goBack();

//   };


//   return (
//     <View style={styles.screen}>

//       {/* ======================================================
//           HEADER
//       ====================================================== */}

//       <BookingHeader
//         restaurantName="The Cozy Kitchen"
//         restaurantSubtitle="Italian · Café"
//         currentStep={1}
//         totalSteps={5}
//         onBack={handleBack}
//       />


//       {/* ======================================================
//           CONTENT
//       ====================================================== */}

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={
//           styles.content
//         }>

//         {/* ====================================================
//             RESTAURANT
//         ==================================================== */}

//         <BookingRestaurantCard
//           restaurantName="The Cozy Kitchen"
//           cuisine="Italian · Café"
//           distance="0.3 km"
//           rating={4.8}
//         />


//         {/* ====================================================
//             TITLE
//         ==================================================== */}

//         <View
//           style={styles.section}>

//           <AppText
//             style={styles.title}>
//             How many guests?
//           </AppText>

//           <AppText
//             style={styles.description}>
//             Select the number of people joining
//             your reservation.
//           </AppText>

//         </View>


//         {/* ====================================================
//             GUEST SELECTOR
//         ==================================================== */}

//         <GuestSelector
//           value={guests}
//           min={1}
//           max={20}
//           onChange={setGuests}
//         />

//       </ScrollView>


//       {/* ======================================================
//           BOTTOM ACTION
//       ====================================================== */}

//       <BookingBottomBar
//         buttonText="Continue"
//         onPress={handleContinue}
//         secondaryText={`${guests} ${
//           guests === 1
//             ? 'guest'
//             : 'guests'
//         } selected`}
//       />

//     </View>
//   );
// };


// // ============================================================
// // STYLES
// // ============================================================

// const styles = StyleSheet.create({

//   // ==========================================================
//   // SCREEN
//   // ==========================================================

//   screen: {
//     flex: 1,

//     backgroundColor:
//       Colors.mainBackground,
//   },


//   // ==========================================================
//   // CONTENT
//   // ==========================================================

//   content: {
//     flexGrow: 1,

//     paddingHorizontal:
//       Spacing.md,

//     paddingTop:
//       Spacing.md,

//     paddingBottom:
//       Spacing.lg,
//   },


//   // ==========================================================
//   // SECTION
//   // ==========================================================

//   section: {
//     marginTop:
//       Spacing.xl,

//     marginBottom:
//       Spacing.lg,
//   },


//   // ==========================================================
//   // TITLE
//   // ==========================================================

//   title: {
//     fontFamily:
//       Fonts.interBold,

//     fontSize:
//       Typography.h2,

//     color:
//       Colors.neutral900,
//   },


//   // ==========================================================
//   // DESCRIPTION
//   // ==========================================================

//   description: {
//     marginTop:
//       Spacing.xs,

//     fontFamily:
//       Fonts.interRegular,

//     fontSize:
//       Typography.body,

//     lineHeight: 22,

//     color:
//       Colors.neutral600,
//   },

// });


// export default React.memo(
//   BookTableScreen,
// );