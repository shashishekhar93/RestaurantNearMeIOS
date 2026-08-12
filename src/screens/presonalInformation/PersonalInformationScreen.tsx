import React from 'react';

import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import AppText
  from '../../component/AppText';

import {
  Colors,
  Fonts,
  Radius,
  Spacing,
  Typography,
} from '../../theme';


// ============================================================
// DUMMY PROFILE
// ============================================================

const dummyProfile = {
  fullName: 'Riya Johnson Reddy',

  mobileNumber: '+61 478 92 020',

  email: '',
};


// ============================================================
// SCREEN
// ============================================================

const PersonalInformationScreen = () => {

  const navigation =
    useNavigation();

  const insets =
    useSafeAreaInsets();


  // ==========================================================
  // DUMMY DATA
  // ==========================================================

  const fullName =
    dummyProfile.fullName;

  const mobileNumber =
    dummyProfile.mobileNumber;

  const email =
    dummyProfile.email;


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // UPDATE
  // ==========================================================

  const handleUpdate = () => {

    // --------------------------------------------------------
    // API integration will be added later.
    // --------------------------------------------------------

  };


  // ==========================================================
  // UI
  // ==========================================================

  return (
    <View
      style={[
        styles.screen,
        {
          paddingTop:
            insets.top,
        },
      ]}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom:
              insets.bottom +
              Spacing.xxxxl,
          },
        ]}>

        {/* ==================================================
            BACK BUTTON
        ================================================== */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={
            handleBack
          }
          style={
            styles.backButton
          }>

          <AppText
            style={
              styles.backIcon
            }>
            ‹
          </AppText>

        </TouchableOpacity>


        {/* ==================================================
            TITLE
        ================================================== */}

        <AppText
          style={
            styles.title
          }>
          Personal Information
        </AppText>


        {/* ==================================================
            PROFILE IMAGE / ADD
        ================================================== */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={
            styles.avatarButton
          }>

          <AppText
            style={
              styles.plusIcon
            }>
            +
          </AppText>

        </TouchableOpacity>


        {/* ==================================================
            FULL NAME
        ================================================== */}

        <View
          style={
            styles.field
          }>

          <AppText
            style={
              styles.label
            }>
            Full Name
          </AppText>

          <TextInput
            value={
              fullName
            }
            editable={false}
            style={
              styles.input
            }
          />

        </View>


        {/* ==================================================
            MOBILE NUMBER
        ================================================== */}

        <View
          style={
            styles.field
          }>

          <AppText
            style={
              styles.label
            }>
            Mobile Number
          </AppText>

          <TextInput
            value={
              mobileNumber
            }
            editable={false}
            style={
              styles.input
            }
          />

        </View>


        {/* ==================================================
            EMAIL
        ================================================== */}

        <View
          style={
            styles.field
          }>

          <AppText
            style={
              styles.label
            }>
            Email
          </AppText>

          <TextInput
            value={
              email
            }
            editable={true}
            placeholder="Enter your email id"
            placeholderTextColor={
              Colors.neutral600
            }
            style={
              styles.input
            }
          />

        </View>


        {/* ==================================================
            UPDATE
        ================================================== */}

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={
            handleUpdate
          }
          style={
            styles.updateButton
          }>

          <AppText
            style={
              styles.updateButtonText
            }>
            Update
          </AppText>

        </TouchableOpacity>

      </ScrollView>

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
    paddingHorizontal:
      Spacing.lg,

    paddingTop:
      Spacing.sm,
  },


  // ==========================================================
  // BACK BUTTON
  // ==========================================================

  backButton: {
    width: 44,

    aspectRatio: 1,

    borderRadius:
      Radius.round,

    backgroundColor:
      Colors.background300,

    justifyContent:
      'center',

    alignItems:
      'center',
  },


  // ==========================================================
  // BACK ICON
  // ==========================================================

  backIcon: {
    fontFamily:
      Fonts.interRegular,

    fontSize: 28,

    lineHeight: 28,

    color:
      Colors.neutral900,

    marginTop: -2,
  },


  // ==========================================================
  // TITLE
  // ==========================================================

  title: {
    marginTop:
      Spacing.lg,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.h2,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // AVATAR
  // ==========================================================

  avatarButton: {
    alignSelf:
      'center',

    width: 90,

    aspectRatio: 1,

    borderRadius:
      Radius.round,

    borderWidth: 4,

    borderColor:
      Colors.orangePrimary,

    backgroundColor:
      Colors.primary50,

    justifyContent:
      'center',

    alignItems:
      'center',

    marginTop:
      Spacing.xl,

    marginBottom:
      Spacing.xxl,
  },


  // ==========================================================
  // PLUS
  // ==========================================================

  plusIcon: {
    fontFamily:
      Fonts.interRegular,

    fontSize: 64,

    lineHeight: 70,

    color:
      Colors.orangePrimary,
  },


  // ==========================================================
  // FIELD
  // ==========================================================

  field: {
    marginBottom:
      Spacing.xl,
  },


  // ==========================================================
  // LABEL
  // ==========================================================

  label: {
    marginBottom:
      Spacing.sm,

    marginLeft:
      Spacing.xs,

    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.neutral800,
  },


  // ==========================================================
  // INPUT
  // ==========================================================

  input: {
    width:
      '100%',

    minHeight: 58,

    paddingHorizontal:
      Spacing.lg,

    borderRadius:
      Radius.round,

    backgroundColor:
      Colors.background300,

    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // UPDATE BUTTON
  // ==========================================================

  updateButton: {
    width:
      '100%',

    minHeight: 58,

    marginTop:
      Spacing.md,

    borderRadius:
      Radius.round,

    backgroundColor:
      Colors.orangePrimary,

    justifyContent:
      'center',

    alignItems:
      'center',
  },


  // ==========================================================
  // UPDATE TEXT
  // ==========================================================

  updateButtonText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.white,
  },

});


export default React.memo(
  PersonalInformationScreen,
);