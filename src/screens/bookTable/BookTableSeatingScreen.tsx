import React, {
  useState,
} from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import BookingHeader
  from './BookingHeader';

import BookingRestaurantCard
  from './BookingRestaurantCard';

import SeatingOption
  from './SeatingOption';

import BookingBottomBar
  from './BookingBottomBar';

import {
  BookingSeating,
} from './BookingTypes';

import AppText
  from '../../component/AppText/AppText';

import {
  Colors,
  Fonts,
  Spacing,
  Typography,
} from '../../theme';


// ============================================================
// NAVIGATION
// ============================================================

type NavigationProp =
  NativeStackNavigationProp<any>;


// ============================================================
// ROUTE
// ============================================================

type RouteParams = {
  guests?: number;

  date?: string;

  time?: string;
};


// ============================================================
// SCREEN
// ============================================================

const BookTableSeatingScreen = () => {

  const navigation =
    useNavigation<NavigationProp>();

  const route =
    useRoute();

  const {
    guests = 2,
    date,
    time,
  } =
    route.params as RouteParams;


  // ==========================================================
  // SEATING
  // ==========================================================

  const [
    selectedSeating,
    setSelectedSeating,
  ] =
    useState<BookingSeating>();


  // ==========================================================
  // CONTINUE
  // ==========================================================

  const handleContinue = () => {

    if (!selectedSeating) {
      return;
    }

    navigation.navigate(
      'BookTableDetails',
      {
        guests,
        date,
        time,
        seating:
          selectedSeating,
      },
    );
  };


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {
    navigation.goBack();
  };


  return (
    <View style={styles.screen}>

      {/* ======================================================
          HEADER
      ====================================================== */}

      <BookingHeader
        restaurantName="The Cozy Kitchen"
        restaurantSubtitle="Italian · Café"
        currentStep={3}
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
            Choose your seating
          </AppText>

          <AppText
            style={styles.description}>
            Select your preferred seating area.
          </AppText>

        </View>


        {/* ====================================================
            SEATING OPTIONS
        ==================================================== */}

        <SeatingOption
          seating="Indoor"
          description="Comfortable indoor dining area."
          selected={
            selectedSeating ===
            'Indoor'
          }
          onPress={() =>
            setSelectedSeating(
              'Indoor',
            )
          }
        />


        <SeatingOption
          seating="Outdoor patio"
          description="Enjoy your meal in the open air."
          selected={
            selectedSeating ===
            'Outdoor patio'
          }
          onPress={() =>
            setSelectedSeating(
              'Outdoor patio',
            )
          }
        />


        <SeatingOption
          seating="Bar seating"
          description="Casual seating at the restaurant bar."
          selected={
            selectedSeating ===
            'Bar seating'
          }
          onPress={() =>
            setSelectedSeating(
              'Bar seating',
            )
          }
        />


        <SeatingOption
          seating="Private room"
          description="A quieter space for a more private experience."
          selected={
            selectedSeating ===
            'Private room'
          }
          onPress={() =>
            setSelectedSeating(
              'Private room',
            )
          }
        />

      </ScrollView>


      {/* ======================================================
          BOTTOM ACTION
      ====================================================== */}

      <BookingBottomBar
        buttonText="Continue"
        disabled={
          !selectedSeating
        }
        onPress={
          handleContinue
        }
        secondaryText={
          selectedSeating
            ? `Seating: ${selectedSeating}`
            : 'Select your preferred seating'
        }
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
  BookTableSeatingScreen,
);