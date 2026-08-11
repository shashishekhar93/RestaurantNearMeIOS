import React, {
  useState,
} from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
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
};


// ============================================================
// SCREEN
// ============================================================

const BookTableDetailsScreen = () => {

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
  // FORM
  // ==========================================================

  const [
    fullName,
    setFullName,
  ] = useState('');

  const [
    mobileNumber,
    setMobileNumber,
  ] = useState('');

  const [
    email,
    setEmail,
  ] = useState('');

  const [
    specialRequests,
    setSpecialRequests,
  ] = useState('');


  // ==========================================================
  // CONTINUE
  // ==========================================================

  const handleContinue = () => {

    navigation.navigate(
      'BookTableReview',
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


  // ==========================================================
  // FORM VALIDATION
  // ==========================================================

  const isValid =
    fullName.trim().length > 0 &&
    mobileNumber.trim().length > 0;


  return (
    <View style={styles.screen}>

      {/* ======================================================
          HEADER
      ====================================================== */}

      <BookingHeader
        restaurantName="The Cozy Kitchen"
        restaurantSubtitle="Italian · Café"
        currentStep={4}
        totalSteps={5}
        onBack={handleBack}
      />


      {/* ======================================================
          KEYBOARD AVOIDING CONTENT
      ====================================================== */}

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.content
          }>

          {/* ==================================================
              RESTAURANT
          ================================================== */}

          <BookingRestaurantCard
            restaurantName="The Cozy Kitchen"
            cuisine="Italian · Café"
            distance="0.3 km"
            rating={4.8}
          />


          {/* ==================================================
              TITLE
          ================================================== */}

          <View
            style={styles.section}>

            <AppText
              style={styles.title}>
              Your details
            </AppText>

            <AppText
              style={styles.description}>
              Enter your details so the restaurant
              can confirm your reservation.
            </AppText>

          </View>


          {/* ==================================================
              FULL NAME
          ================================================== */}

          <View
            style={styles.field}>

            <AppText
              style={styles.label}>
              Full name
            </AppText>

            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              placeholderTextColor={
                Colors.neutral500
              }
              autoCapitalize="words"
              style={styles.input}
            />

          </View>


          {/* ==================================================
              MOBILE
          ================================================== */}

          <View
            style={styles.field}>

            <AppText
              style={styles.label}>
              Mobile number
            </AppText>

            <TextInput
              value={mobileNumber}
              onChangeText={setMobileNumber}
              placeholder="Enter your mobile number"
              placeholderTextColor={
                Colors.neutral500
              }
              keyboardType="phone-pad"
              style={styles.input}
            />

          </View>


          {/* ==================================================
              EMAIL
          ================================================== */}

          <View
            style={styles.field}>

            <AppText
              style={styles.label}>
              Email
            </AppText>

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={
                Colors.neutral500
              }
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />

          </View>


          {/* ==================================================
              SPECIAL REQUESTS
          ================================================== */}

          <View
            style={styles.field}>

            <AppText
              style={styles.label}>
              Special requests
            </AppText>

            <TextInput
              value={specialRequests}
              onChangeText={
                setSpecialRequests
              }
              placeholder="Anything the restaurant should know?"
              placeholderTextColor={
                Colors.neutral500
              }
              multiline
              textAlignVertical="top"
              style={[
                styles.input,
                styles.multilineInput,
              ]}
            />

          </View>

        </ScrollView>

      </KeyboardAvoidingView>


      {/* ======================================================
          BOTTOM ACTION
      ====================================================== */}

      <BookingBottomBar
        buttonText="Review booking"
        disabled={!isValid}
        onPress={handleContinue}
        secondaryText={
          seating
            ? `${guests} ${
                guests === 1
                  ? 'guest'
                  : 'guests'
              } · ${seating}`
            : undefined
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
  // KEYBOARD CONTAINER
  // ==========================================================

  keyboardContainer: {
    flex: 1,
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
  // FIELD
  // ==========================================================

  field: {
    marginBottom:
      Spacing.md,
  },


  // ==========================================================
  // LABEL
  // ==========================================================

  label: {
    marginBottom:
      Spacing.xs,

    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.small,

    color:
      Colors.neutral800,
  },


  // ==========================================================
  // INPUT
  // ==========================================================

  input: {
    width: '100%',

    minHeight: 52,

    paddingHorizontal:
      Spacing.md,

    paddingVertical:
      Spacing.sm,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    borderRadius:
      Radius.xl,

    backgroundColor:
      Colors.white,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.body,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // MULTILINE INPUT
  // ==========================================================

  multilineInput: {
    minHeight: 100,

    paddingTop:
      Spacing.md,
  },

});


export default React.memo(
  BookTableDetailsScreen,
);