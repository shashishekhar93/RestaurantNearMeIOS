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
} from '@react-navigation/native';

import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import AppText
  from '../../component/AppText/AppText';

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

import type {
  Address,
} from './AddressTypes';

import BackButton from '../../assets/icons/ic_back.svg';


// ============================================================
// NAVIGATION
// ============================================================

type NavigationProp =
  NativeStackNavigationProp<
    AccountStackParamList,
    'SavedAddresses'
  >;


// ============================================================
// DUMMY DATA
// ============================================================

const initialAddresses: Address[] = [

  {
    id: '1',

    title: 'Home',

    addressLine1:
      '42 Bridgeway St, Apt 3 Brooklyn, NY',

    addressLine2:
      '11201',

    city:
      '',

    state:
      '',

    postalCode:
      '',

    isDefault:
      true,

    type:
      'home',
  },

  {
    id: '2',

    title: 'Work',

    addressLine1:
      '42 Bridgeway St, Apt 3 Brooklyn, NY',

    addressLine2:
      '11201',

    city:
      '',

    state:
      '',

    postalCode:
      '',

    isDefault:
      false,

    type:
      'work',
  },

  {
    id: '3',

    title: 'Mom’s',

    addressLine1:
      '42 Bridgeway St, Apt 3 Brooklyn, NY',

    addressLine2:
      '11201',

    city:
      '',

    state:
      '',

    postalCode:
      '',

    isDefault:
      false,

    type:
      'home',
  },

];


// ============================================================
// SCREEN
// ============================================================

const AddressesScreen = () => {

  const navigation =
    useNavigation<NavigationProp>();

  const insets =
    useSafeAreaInsets();


  // ==========================================================
  // ADDRESSES
  // ==========================================================

  const [
    addresses,
    setAddresses,
  ] = useState<Address[]>(
    initialAddresses,
  );


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {
    navigation.goBack();
  };


  // ==========================================================
  // ADD NEW ADDRESS
  // ==========================================================

  const handleAddAddress = () => {

    navigation.navigate(
      'AddNewAddressScreen',
    );

  };


  // ==========================================================
  // ADDRESS ICON
  // ==========================================================

  const getAddressIcon =
    (address: Address) => {

      switch (address.type) {

        case 'work':
          return 'W';

        case 'home':
          return 'H';

        default:
          return 'A';
      }

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

      {/* ====================================================
          HEADER
      ==================================================== */}

      <View
        style={styles.header}>

        {/* ==================================================
            BACK BUTTON
        ================================================== */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleBack}
          style={styles.backButton}>

          <BackButton/>

        </TouchableOpacity>


        {/* ==================================================
            TITLE
        ================================================== */}

        <AppText
          style={styles.title}>
          Saved Addresses
        </AppText>

      </View>


      {/* ====================================================
          CONTENT
      ==================================================== */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom:
              insets.bottom +
              Spacing.xl,
          },
        ]}>

        {/* ==================================================
            ADDRESS LIST
        ================================================== */}

        <View
          style={styles.addressList}>

          {addresses.map(
            address => (

              <View
                key={address.id}
                style={
                  styles.addressCard
                }>

                {/* ==========================================
                    CARD HEADER
                ========================================== */}

                <View
                  style={
                    styles.cardHeader
                  }>

                  {/* ========================================
                      ICON
                  ======================================== */}

                  <View
                    style={
                      styles.addressIcon
                    }>

                    <AppText
                      style={
                        styles.addressIconText
                      }>
                      {
                        getAddressIcon(
                          address,
                        )
                      }
                    </AppText>

                  </View>


                  {/* ========================================
                      ADDRESS INFORMATION
                  ======================================== */}

                  <View
                    style={
                      styles.addressInfo
                    }>

                    {/* ======================================
                        TITLE
                    ====================================== */}

                    <View
                      style={
                        styles.titleRow
                      }>

                      <AppText
                        numberOfLines={1}
                        style={
                          styles.addressTitle
                        }>
                        {
                          address.title
                        }
                      </AppText>


                      {address.isDefault ? (

                        <View
                          style={
                            styles.defaultBadge
                          }>

                          <AppText
                            style={
                              styles.defaultBadgeText
                            }>
                            DEFAULT
                          </AppText>

                        </View>

                      ) : null}

                    </View>


                    {/* ======================================
                        ADDRESS
                    ====================================== */}

                    <AppText
                      numberOfLines={2}
                      style={
                        styles.addressLine
                      }>

                      {
                        address.addressLine1
                      }

                      {address.addressLine2
                        ? `\n${address.addressLine2}`
                        : ''}

                    </AppText>

                  </View>


                  {/* ========================================
                      MORE
                  ======================================== */}

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={
                      styles.moreButton
                    }>

                    <AppText
                      style={
                        styles.moreIcon
                      }>
                      ⋮
                    </AppText>

                  </TouchableOpacity>

                </View>

              </View>

            ),
          )}

        </View>


        {/* ==================================================
            ADD ADDRESS
        ================================================== */}

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={
            handleAddAddress
          }
          style={
            styles.addAddressButton
          }>

          <AppText
            style={
              styles.addIcon
            }>
            +
          </AppText>

          <AppText
            style={
              styles.addAddressText
            }>
            Add new address
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
  // CONTENT
  // ==========================================================

  content: {
    paddingHorizontal:
      Spacing.md,

    paddingTop:
      Spacing.xs,
  },


  // ==========================================================
  // ADDRESS LIST
  // ==========================================================

  addressList: {
    gap:
      Spacing.sm,
  },


  // ==========================================================
  // ADDRESS CARD
  // ==========================================================

  addressCard: {
    width: '100%',

    backgroundColor:
      Colors.white,

    borderRadius:
      Radius.xl,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    padding:
      Spacing.md,
  },


  // ==========================================================
  // CARD HEADER
  // ==========================================================

  cardHeader: {
    flexDirection:
      'row',

    alignItems:
      'center',

    width: '100%',
  },


  // ==========================================================
  // ADDRESS ICON
  // ==========================================================

  addressIcon: {
    width: 42,

    aspectRatio: 1,

    borderRadius:
      Radius.round,

    backgroundColor:
      Colors.primary50,

    justifyContent:
      'center',

    alignItems:
      'center',

    marginRight:
      Spacing.sm,
  },


  addressIconText: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.body,

    color:
      Colors.primary600,
  },


  // ==========================================================
  // ADDRESS INFORMATION
  // ==========================================================

  addressInfo: {
    flex: 1,

    minWidth: 0,
  },


  // ==========================================================
  // TITLE ROW
  // ==========================================================

  titleRow: {
    flexDirection:
      'row',

    alignItems:
      'center',

    flexShrink: 1,
  },


  // ==========================================================
  // ADDRESS TITLE
  // ==========================================================

  addressTitle: {
    flexShrink: 1,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.body,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // DEFAULT BADGE
  // ==========================================================

  defaultBadge: {
    marginLeft:
      Spacing.sm,

    paddingHorizontal:
      Spacing.sm,

    paddingVertical: 3,

    borderRadius:
      Radius.round,

    backgroundColor:
      Colors.primary50,
  },


  defaultBadgeText: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.extraSmall,

    color:
      Colors.primary600,
  },


  // ==========================================================
  // ADDRESS
  // ==========================================================

  addressLine: {
    marginTop:
      Spacing.xs,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    lineHeight: 20,

    color:
      Colors.neutral800,
  },


  // ==========================================================
  // MORE BUTTON
  // ==========================================================

  moreButton: {
    paddingLeft:
      Spacing.sm,

    paddingVertical:
      Spacing.xs,

    justifyContent:
      'center',

    alignItems:
      'center',

    alignSelf:
      'flex-start',
  },


  moreIcon: {
    fontFamily:
      Fonts.interBold,

    fontSize: 22,

    lineHeight: 22,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // ADD ADDRESS BUTTON
  // ==========================================================

  addAddressButton: {
    width: '100%',

    minHeight: 52,

    marginTop:
      Spacing.lg,

    flexDirection:
      'row',

    alignItems:
      'center',

    justifyContent:
      'center',

    borderRadius:
      Radius.xl,

    borderWidth: 2,

    borderStyle:
      'dashed',

    borderColor:
      Colors.neutral900,

    backgroundColor:
      Colors.mainBackground,
  },


  addIcon: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.h3,

    color:
      Colors.neutral900,

    marginRight:
      Spacing.xs,
  },


  addAddressText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.neutral900,
  },

});


export default React.memo(
  AddressesScreen,
);