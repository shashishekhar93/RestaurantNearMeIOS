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

import PersonalInformationScreen
  from '../screens/presonalInformation/PersonalInformationScreen';
  
  import FAQScreen
  from '../screens/faq/FAQScreen';

  import AddressesScreen
  from '../screens/addresses/AddressesScreen';



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
          PERSONAL INFORMATION
      ====================================================== */}

      <Stack.Screen
        name="PersonalInformationScreen"
        component={
          PersonalInformationScreen
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
          HELP & FAQ
      ====================================================== */}

      <Stack.Screen
        name="FAQScreen"
        component={
          FAQScreen
        }
      />

    </Stack.Navigator>
  );
};


export default AccountStackNavigator;
