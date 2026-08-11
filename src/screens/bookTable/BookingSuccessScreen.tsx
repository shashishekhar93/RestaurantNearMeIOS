import React from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import AppText from '../../component/AppText/AppText';

import {
  Colors,
  Fonts,
  Radius,
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

  seating?: string;

  fullName?: string;

  mobileNumber?: string;
};


// ============================================================
// COMPONENT
// ============================================================

const BookingSuccessScreen = () => {

  const navigation =
    useNavigation<NavigationProp>();

  const route =
    useRoute();

  const {
    guests = 2,
    date,
    time,
    seating,
  } =
    route.params as RouteParams;


  // ==========================================================
  // DONE
  // ==========================================================

  const handleDone = () => {

    navigation.popToTop();

  };


  return (
    <View style={styles.screen}>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <View style={styles.content}>

        {/* ====================================================
            SUCCESS ICON
        ==================================================== */}

        <View
          style={styles.successCircle}>

          <AppText
            style={styles.checkmark}>
            ✓
          </AppText>

        </View>


        {/* ====================================================
            TITLE
        ==================================================== */}

        <AppText
          style={styles.title}>
          Booking confirmed!
        </AppText>


        {/* ====================================================
            DESCRIPTION
        ==================================================== */}

        <AppText
          style={styles.description}>
          Your table at The Cozy Kitchen has
          been successfully reserved.
        </AppText>


        {/* ====================================================
            BOOKING CARD
        ==================================================== */}

        <View
          style={styles.bookingCard}>

          {/* RESTAURANT */}

          <AppText
            style={styles.restaurantName}>
            The Cozy Kitchen
          </AppText>


          {/* DATE */}

          {date ? (
            <View
              style={styles.detailRow}>

              <AppText
                style={styles.detailLabel}>
                Date
              </AppText>

              <AppText
                style={styles.detailValue}>
                {date}
              </AppText>

            </View>
          ) : null}


          {/* TIME */}

          {time ? (
            <View
              style={styles.detailRow}>

              <AppText
                style={styles.detailLabel}>
                Time
              </AppText>

              <AppText
                style={styles.detailValue}>
                {time}
              </AppText>

            </View>
          ) : null}


          {/* GUESTS */}

          <View
            style={styles.detailRow}>

            <AppText
              style={styles.detailLabel}>
              Guests
            </AppText>

            <AppText
              style={styles.detailValue}>
              {guests}
              {guests === 1
                ? ' guest'
                : ' guests'}
            </AppText>

          </View>


          {/* SEATING */}

          {seating ? (
            <View
              style={styles.detailRow}>

              <AppText
                style={styles.detailLabel}>
                Seating
              </AppText>

              <AppText
                style={styles.detailValue}>
                {seating}
              </AppText>

            </View>
          ) : null}

        </View>


        {/* ====================================================
            CONFIRMATION MESSAGE
        ==================================================== */}

        <View
          style={styles.infoContainer}>

          <AppText
            style={styles.infoText}>
            A confirmation has been sent to your
            registered contact details.
          </AppText>

        </View>

      </View>


      {/* ======================================================
          DONE BUTTON
      ====================================================== */}

      <View
        style={styles.bottomContainer}>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleDone}
          style={styles.doneButton}>

          <AppText
            style={styles.doneText}>
            Done
          </AppText>

        </TouchableOpacity>

      </View>

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
    flex: 1,

    alignItems:
      'center',

    justifyContent:
      'center',

    paddingHorizontal:
      Spacing.md,
  },


  // ==========================================================
  // SUCCESS CIRCLE
  // ==========================================================

  successCircle: {
    width: 84,

    aspectRatio: 1,

    borderRadius:
      Radius.round,

    justifyContent:
      'center',

    alignItems:
      'center',

    backgroundColor:
      Colors.orangePrimary,

    marginBottom:
      Spacing.lg,
  },


  // ==========================================================
  // CHECKMARK
  // ==========================================================

  checkmark: {
    fontFamily:
      Fonts.interBold,

    fontSize: 42,

    lineHeight: 46,

    color:
      Colors.white,
  },


  // ==========================================================
  // TITLE
  // ==========================================================

  title: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.h1,

    lineHeight: 42,

    textAlign:
      'center',

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // DESCRIPTION
  // ==========================================================

  description: {
    maxWidth: 340,

    marginTop:
      Spacing.sm,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.body,

    lineHeight: 22,

    textAlign:
      'center',

    color:
      Colors.neutral600,
  },


  // ==========================================================
  // BOOKING CARD
  // ==========================================================

  bookingCard: {
    width: '100%',

    marginTop:
      Spacing.xl,

    padding:
      Spacing.md,

    borderRadius:
      Radius.xl,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    backgroundColor:
      Colors.white,
  },


  // ==========================================================
  // RESTAURANT
  // ==========================================================

  restaurantName: {
    marginBottom:
      Spacing.sm,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.body,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // DETAIL ROW
  // ==========================================================

  detailRow: {
    flexDirection: 'row',

    alignItems:
      'center',

    paddingVertical:
      Spacing.xs,
  },


  // ==========================================================
  // DETAIL LABEL
  // ==========================================================

  detailLabel: {
    width: 88,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    color:
      Colors.neutral600,
  },


  // ==========================================================
  // DETAIL VALUE
  // ==========================================================

  detailValue: {
    flex: 1,

    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.small,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // INFO
  // ==========================================================

  infoContainer: {
    marginTop:
      Spacing.lg,

    paddingHorizontal:
      Spacing.sm,
  },


  infoText: {
    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    lineHeight: 19,

    textAlign:
      'center',

    color:
      Colors.neutral600,
  },


  // ==========================================================
  // BOTTOM
  // ==========================================================

  bottomContainer: {
    width: '100%',

    paddingHorizontal:
      Spacing.md,

    paddingTop:
      Spacing.sm,

    paddingBottom:
      Spacing.md,

    backgroundColor:
      Colors.white,

    borderTopWidth: 1,

    borderTopColor:
      Colors.background500,
  },


  // ==========================================================
  // DONE BUTTON
  // ==========================================================

  doneButton: {
    width: '100%',

    minHeight: 52,

    paddingHorizontal:
      Spacing.lg,

    paddingVertical:
      Spacing.sm,

    borderRadius:
      Radius.xl,

    justifyContent:
      'center',

    alignItems:
      'center',

    backgroundColor:
      Colors.orangePrimary,
  },


  // ==========================================================
  // DONE TEXT
  // ==========================================================

  doneText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.white,
  },

});


export default React.memo(
  BookingSuccessScreen,
);