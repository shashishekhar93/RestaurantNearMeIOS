import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {AccountStackParamList} from './types';
import PlaceholderScreen from './PlaceholderScreen';
import AccountScreen from '../screens/AccountScreen';

const Stack = createNativeStackNavigator<AccountStackParamList>();

const AccountScreenRoute = ({navigation}: any) => {
  return (
    <AccountScreen
      onOpenWallet={() => navigation.getParent()?.navigate('Wallet')}
    />
  );
};


const EditProfileScreen = () => {
  return (
    <PlaceholderScreen
      title="Edit Profile"
      description="Use this route to manage profile updates later."
    />
  );
};

const SavedAddressesScreen = () => {
  return (
    <PlaceholderScreen
      title="Saved Addresses"
      description="This route can host address management later."
    />
  );
};

const HelpFAQScreen = () => {
  return (
    <PlaceholderScreen
      title="Help & FAQ"
      description="Add support content here in the future."
    />
  );
};

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Account" component={AccountScreenRoute} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="SavedAddresses" component={SavedAddressesScreen} />
      <Stack.Screen name="HelpFAQ" component={HelpFAQScreen} />
    </Stack.Navigator>
  );
};

export default AccountStackNavigator;
