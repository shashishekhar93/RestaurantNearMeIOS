import React, {
  useState,
} from 'react';

import {
  ScrollView,
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

import BookingHeader
  from './BookingHeader';

import BookingRestaurantCard
  from './BookingRestaurantCard';

import BookingSummaryCard
  from './BookingSummaryCard';

import BookingBottomBar
  from './BookingBottomBar';

import AppText
  from '../../component/AppText/AppText';

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

  email?: string;

  specialRequests?: string;
};


// ============================================================
// SCREEN
// ============================================================

const BookTableReviewScreen = () => {

  const navigation =
    useNavigation<NavigationProp>();

  const route =
    useRoute();

  const {
    guests = 2,
    date,
    time,
    seating,
    fullName,
    mobileNumber,
    email,
    specialRequests,
  } =
    route.params as RouteParams;


  // ==========================================================
  // POLICY
  // ==========================================================

  const [
    accepted,
    setAccepted,
  ] = useState(false);


  // ==========================================================
  // CONFIRM
  // ==========================================================

  const handleConfirm = () => {

    if (!accepted) {
      return;
    }

    navigation.navigate(
      'BookingSuccess',
      {
        guests,
        date,
        time,
        seating,
        fullName,
        mobileNumber,
        email,
        specialRequests,
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
        currentStep={5}
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
            Review your booking
          </AppText>

          <AppText
            style={styles.description}>
            Please check your reservation details
            before confirming.
          </AppText>

        </View>


        {/* ====================================================
            BOOKING SUMMARY
        ==================================================== */}

        <BookingSummaryCard
          restaurantName="The Cozy Kitchen"
          guests={guests}
          date={date}
          time={time}
          seating={seating}
        />


        {/* ====================================================
            CUSTOMER DETAILS
        ==================================================== */}

        <View
          style={styles.detailsCard}>

          <AppText
            style={styles.cardTitle}>
            Guest details
          </AppText>


          {fullName ? (
            <View
              style={styles.detailRow}>

              <AppText
                style={styles.detailLabel}>
                Name
              </AppText>

              <AppText
                numberOfLines={1}
                style={styles.detailValue}>
                {fullName}
              </AppText>

            </View>
          ) : null}


          {mobileNumber ? (
            <View
              style={styles.detailRow}>

              <AppText
                style={styles.detailLabel}>
                Mobile
              </AppText>

              <AppText
                numberOfLines={1}
                style={styles.detailValue}>
                {mobileNumber}
              </AppText>

            </View>
          ) : null}


          {email ? (
            <View
              style={styles.detailRow}>

              <AppText
                style={styles.detailLabel}>
                Email
              </AppText>

              <AppText
                numberOfLines={1}
                style={styles.detailValue}>
                {email}
              </AppText>

            </View>
          ) : null}


          {specialRequests ? (
            <View
              style={styles.requestContainer}>

              <AppText
                style={styles.detailLabel}>
                Special requests
              </AppText>

              <AppText
                style={styles.requestText}>
                {specialRequests}
              </AppText>

            </View>
          ) : null}

        </View>


        {/* ====================================================
            POLICY
        ==================================================== */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            setAccepted(
              previous => !previous,
            )
          }
          style={styles.policyRow}>

          <View
            style={[
              styles.checkbox,
              accepted &&
                styles.checkedCheckbox,
            ]}>

            {accepted ? (
              <AppText
                style={styles.checkmark}>
                ✓
              </AppText>
            ) : null}

          </View>


          <AppText
            style={styles.policyText}>
            I agree to the restaurant's booking
            policy and cancellation terms.
          </AppText>

        </TouchableOpacity>

      </ScrollView>


      {/* ======================================================
          BOTTOM ACTION
      ====================================================== */}

      <BookingBottomBar
        buttonText="Confirm booking"
        disabled={!accepted}
        onPress={handleConfirm}
        secondaryText="Review all details before confirming"
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


  // ==========================================================
  // DETAILS CARD
  // ==========================================================

  detailsCard: {
    width: '100%',

    marginTop:
      Spacing.md,

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
  // CARD TITLE
  // ==========================================================

  cardTitle: {
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

    alignItems: 'center',

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
  // REQUEST
  // ==========================================================

  requestContainer: {
    marginTop:
      Spacing.xs,

    paddingTop:
      Spacing.sm,

    borderTopWidth: 1,

    borderTopColor:
      Colors.background400,
  },


  requestText: {
    marginTop: 4,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    lineHeight: 19,

    color:
      Colors.neutral800,
  },


  // ==========================================================
  // POLICY
  // ==========================================================

  policyRow: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    marginTop:
      Spacing.lg,

    paddingHorizontal:
      Spacing.xs,
  },


  // ==========================================================
  // CHECKBOX
  // ==========================================================

  checkbox: {
    width: 22,

    aspectRatio: 1,

    borderRadius:
      Radius.sm,

    borderWidth: 2,

    borderColor:
      Colors.neutral400,

    justifyContent:
      'center',

    alignItems:
      'center',

    marginRight:
      Spacing.sm,
  },


  // ==========================================================
  // CHECKED CHECKBOX
  // ==========================================================

  checkedCheckbox: {
    borderColor:
      Colors.orangePrimary,

    backgroundColor:
      Colors.orangePrimary,
  },


  // ==========================================================
  // CHECKMARK
  // ==========================================================

  checkmark: {
    fontFamily:
      Fonts.interBold,

    fontSize: 14,

    color:
      Colors.white,
  },


  // ==========================================================
  // POLICY TEXT
  // ==========================================================

  policyText: {
    flex: 1,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    lineHeight: 19,

    color:
      Colors.neutral700,
  },

});


export default React.memo(
  BookTableReviewScreen,
);