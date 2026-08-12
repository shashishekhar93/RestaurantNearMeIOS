import React, {
  useState,
} from 'react';


import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';


import {
  useNavigation,
} from '@react-navigation/native';


import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';


import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';


import AppText
  from '../../component/AppText/AppText';

import BackButton from '../../assets/icons/ic_back.svg';

import {
  Colors,
  Fonts,
  Radius,
  Spacing,
  Typography,
} from '../../theme';


import type {
  AccountStackParamList,
} from '../../navigation/types';


// ============================================================
// NAVIGATION
// ============================================================

type NavigationProp =
  NativeStackNavigationProp<
    AccountStackParamList,
    'AddNewAddressScreen'
  >;


// ============================================================
// SCREEN
// ============================================================

const AddNewAddressScreen = () => {

  const navigation =
    useNavigation<NavigationProp>();


  const insets =
    useSafeAreaInsets();


  // ==========================================================
  // FORM STATE
  // ==========================================================

  const [
    title,
    setTitle,
  ] = useState('Home');


  const [
    addressLine1,
    setAddressLine1,
  ] = useState('');


  const [
    addressLine2,
    setAddressLine2,
  ] = useState('');


  const [
    city,
    setCity,
  ] = useState('');


  const [
    state,
    setState,
  ] = useState('');


  const [
    postalCode,
    setPostalCode,
  ] = useState('');


  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = () => {

    if (
      !addressLine1.trim() ||
      !city.trim()
    ) {
      return;
    }


    // --------------------------------------------------------
    // TEMPORARY DUMMY ADDRESS
    // --------------------------------------------------------
    //
    // Actual API will be connected later.
    //
    // For now, simply return to
    // AddressesScreen.
    // --------------------------------------------------------

    navigation.goBack();
  };


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {
    navigation.goBack();
  };


  // ==========================================================
  // INPUT COMPONENT
  // ==========================================================

  const renderInput = (
    label: string,
    value: string,
    onChangeText: (
      value: string,
    ) => void,
    placeholder: string,
    multiline = false,
  ) => {

    return (
      <View
        style={
          styles.inputGroup
        }>

        <AppText
          style={
            styles.label
          }>
          {label}
        </AppText>


        <TextInput
          value={value}
          onChangeText={
            onChangeText
          }
          placeholder={
            placeholder
          }
          placeholderTextColor={
            Colors.neutral400
          }
          multiline={
            multiline
          }
          textAlignVertical={
            multiline
              ? 'top'
              : 'center'
          }
          style={[
            styles.input,
            multiline &&
              styles.multilineInput,
          ]}
        />

      </View>
    );
  };


  // ==========================================================
  // UI
  // ==========================================================

  return (
    <KeyboardAvoidingView
      style={[
        styles.screen,
        {
          paddingTop:
            insets.top,
        },
      ]}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }>

      {/* ====================================================
          HEADER
      ==================================================== */}

      <View
        style={
          styles.header
        }>

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

          <BackButton/>

        </TouchableOpacity>


        {/* ==================================================
            TITLE
        ================================================== */}

        <AppText
          style={
            styles.headerTitle
          }>
          Add New Address
        </AppText>


        {/* ==================================================
            SUBTITLE
        ================================================== */}

        <AppText
          style={
            styles.headerSubtitle
          }>
          Save a location for faster booking.
        </AppText>

      </View>


      {/* ====================================================
          FORM
      ==================================================== */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom:
              insets.bottom +
              Spacing.xxxxl,
          },
        ]}>

        {/* ==================================================
            ADDRESS TYPE
        ================================================== */}

        <AppText
          style={
            styles.sectionTitle
          }>
          Address type
        </AppText>


        <View
          style={
            styles.typeRow
          }>

          {[
            'Home',
            'Work',
            'Other',
          ].map(type => {

            const selected =
              title === type;


            return (
              <TouchableOpacity
                key={type}
                activeOpacity={0.8}
                onPress={() =>
                  setTitle(type)
                }
                style={[
                  styles.typeButton,
                  selected &&
                    styles.selectedTypeButton,
                ]}>

                <AppText
                  style={[
                    styles.typeText,
                    selected &&
                      styles.selectedTypeText,
                  ]}>
                  {type}
                </AppText>

              </TouchableOpacity>
            );
          })}

        </View>


        {/* ==================================================
            FORM FIELDS
        ================================================== */}

        <View
          style={
            styles.form
          }>

          {renderInput(
            'Address',
            addressLine1,
            setAddressLine1,
            'House number, building, street',
            true,
          )}


          {renderInput(
            'Apartment / Landmark',
            addressLine2,
            setAddressLine2,
            'Apartment, floor, landmark (optional)',
          )}


          {renderInput(
            'City',
            city,
            setCity,
            'Enter city',
          )}


          {renderInput(
            'State',
            state,
            setState,
            'Enter state',
          )}


          {renderInput(
            'Postal code',
            postalCode,
            setPostalCode,
            'Enter postal code',
          )}

        </View>


        {/* ==================================================
            ADD BUTTON
        ================================================== */}

        <TouchableOpacity
          activeOpacity={0.85}
          disabled={
            !addressLine1.trim() ||
            !city.trim()
          }
          onPress={
            handleSubmit
          }
          style={[
            styles.submitButton,
            (
              !addressLine1.trim() ||
              !city.trim()
            ) &&
              styles.disabledSubmitButton,
          ]}>

          <AppText
            style={[
              styles.submitButtonText,
              (
                !addressLine1.trim() ||
                !city.trim()
              ) &&
                styles.disabledSubmitButtonText,
            ]}>
            Add Address
          </AppText>

        </TouchableOpacity>

      </ScrollView>

    </KeyboardAvoidingView>
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
  // HEADER
  // ==========================================================

  header: {
    paddingHorizontal:
      Spacing.md,

    paddingTop:
      Spacing.sm,

    paddingBottom:
      Spacing.md,
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
  // HEADER TITLE
  // ==========================================================

  headerTitle: {
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
  // HEADER SUBTITLE
  // ==========================================================

  headerSubtitle: {
    marginTop:
      Spacing.xs,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    color:
      Colors.neutral600,
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
  // SECTION TITLE
  // ==========================================================

  sectionTitle: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.body,

    color:
      Colors.neutral900,

    marginBottom:
      Spacing.sm,
  },


  // ==========================================================
  // ADDRESS TYPE
  // ==========================================================

  typeRow: {
    flexDirection:
      'row',

    gap:
      Spacing.sm,

    marginBottom:
      Spacing.xl,
  },


  // ==========================================================
  // TYPE BUTTON
  // ==========================================================

  typeButton: {
    flex: 1,

    minHeight: 52,

    paddingHorizontal:
      Spacing.sm,

    borderRadius:
      Radius.round,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    backgroundColor:
      Colors.white,

    justifyContent:
      'center',

    alignItems:
      'center',
  },


  // ==========================================================
  // SELECTED TYPE
  // ==========================================================

  selectedTypeButton: {
    backgroundColor:
      Colors.orangePrimary,

    borderColor:
      Colors.orangePrimary,
  },


  // ==========================================================
  // TYPE TEXT
  // ==========================================================

  typeText: {
    fontFamily:
      Fonts.interMedium,

    fontSize:
      Typography.small,

    color:
      Colors.neutral700,
  },


  // ==========================================================
  // SELECTED TYPE TEXT
  // ==========================================================

  selectedTypeText: {
    fontFamily:
      Fonts.interSemiBold,

    color:
      Colors.white,
  },


  // ==========================================================
  // FORM
  // ==========================================================

  form: {
    gap:
      Spacing.md,
  },


  // ==========================================================
  // INPUT GROUP
  // ==========================================================

  inputGroup: {
    width:
      '100%',
  },


  // ==========================================================
  // LABEL
  // ==========================================================

  label: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.small,

    color:
      Colors.neutral800,

    marginBottom:
      Spacing.xs,
  },


  // ==========================================================
  // INPUT
  // ==========================================================

  input: {
    width:
      '100%',

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
    minHeight: 96,

    paddingTop:
      Spacing.md,
  },


  // ==========================================================
  // SUBMIT
  // ==========================================================

  submitButton: {
    width:
      '100%',

    minHeight: 52,

    marginTop:
      Spacing.xl,

    marginBottom: Spacing.xl,

    borderRadius:Radius.xl,

    backgroundColor:
      Colors.orangePrimary,

    justifyContent:
      'center',

    alignItems:
      'center',
  },


  // ==========================================================
  // DISABLED SUBMIT
  // ==========================================================

  disabledSubmitButton: {
    backgroundColor:
      Colors.background400,
  },


  // ==========================================================
  // SUBMIT TEXT
  // ==========================================================

  submitButtonText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.white,
  },


  // ==========================================================
  // DISABLED SUBMIT TEXT
  // ==========================================================

  disabledSubmitButtonText: {
    color:
      Colors.neutral600,
  },

});


export default React.memo(
  AddNewAddressScreen,
);