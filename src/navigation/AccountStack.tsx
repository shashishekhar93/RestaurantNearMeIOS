import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import type {
  AccountStackParamList,
} from './types';

import PlaceholderScreen
  from './PlaceholderScreen';

import AccountScreen
  from '../screens/AccountScreen';

import AddressesScreen
  from '../screens/addresses/AddressesScreen';

import AddNewAddressScreen
  from '../screens/addresses/AddNewAddressScreen';


// ============================================================
// NAVIGATOR
// ============================================================

const Stack =
  createNativeStackNavigator<
    AccountStackParamList
  >();


// ============================================================
// ACCOUNT SCREEN
// ============================================================

const AccountScreenRoute = ({
  navigation,
}: any) => {

  return (
    <AccountScreen
      onOpenWallet={() =>
        navigation
          .getParent()
          ?.navigate('Wallet')
      }

      onOpenRewards={() =>
        navigation
          .getParent()
          ?.navigate('Reward')
      }
    />
  );
};


// ============================================================
// EDIT PROFILE
// ============================================================

const EditProfileScreen = () => {

  return (
    <PlaceholderScreen
      title="Edit Profile"
      description="Use this route to manage profile updates later."
    />
  );
};


// ============================================================
// HELP & FAQ
// ============================================================

const HelpFAQScreen = () => {

  return (
    <PlaceholderScreen
      title="Help & FAQ"
      description="Add support content here in the future."
    />
  );
};


// ============================================================
// ACCOUNT STACK
// ============================================================

const AccountStackNavigator = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>

      {/* ======================================================
          ACCOUNT
      ====================================================== */}

      <Stack.Screen
        name="AccountScreen"
        component={
          AccountScreenRoute
        }
      />


      {/* ======================================================
          EDIT PROFILE
      ====================================================== */}

      <Stack.Screen
        name="EditProfile"
        component={
          EditProfileScreen
        }
      />


      {/* ======================================================
          SAVED ADDRESSES
      ====================================================== */}

      <Stack.Screen
        name="AddressesScreen"
        component={
          AddressesScreen
        }
      />


      {/* ======================================================
          ADD NEW ADDRESS
      ====================================================== */}

      <Stack.Screen
        name="AddNewAddressScreen"
        component={
          AddNewAddressScreen
        }
      />


      {/* ======================================================
          HELP & FAQ
      ====================================================== */}

      <Stack.Screen
        name="HelpFAQ"
        component={
          HelpFAQScreen
        }
      />

    </Stack.Navigator>
  );
};


export default AccountStackNavigator;