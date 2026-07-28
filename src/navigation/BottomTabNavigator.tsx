import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors, Fonts, Radius, Spacing, Typography} from '../theme';
import HomeStackNavigator from './HomeStack';
import MapStackNavigator from './MapStack';
import FavoritesStackNavigator from './FavoritesStack';
import ReservationStackNavigator from './ReservationStack';
import AccountStackNavigator from './AccountStack';
import type {BottomTabParamList} from './types';
import HomeIcon from '../assets/icons/ic_home.svg';
import MapIcon from '../assets/icons/ic_map.svg';
import FavoritesIcon from '../assets/icons/ic_favorites.svg';
import ReservationsIcon from '../assets/icons/ic_reservations.svg';
import AccountIcon from '../assets/icons/ic_account.svg';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

// This navigator contains only the five requested top-level tabs.
const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary600,
        tabBarInactiveTintColor: Colors.neutral700,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 0,
          height: 80,
          paddingTop: Spacing.sm,
          paddingBottom: Spacing.sm,
          marginHorizontal: Spacing.md,
          marginBottom: Spacing.md,
          borderRadius: Radius.rounded,
          position: 'absolute',
          left: 0,
          right: 0,
          shadowColor: Colors.neutral600,
          shadowOffset: {width: 0, height: 8},
          shadowOpacity: 0.08,
          shadowRadius: 20,
          elevation: 12,
        },
        tabBarLabelStyle: {
          fontFamily: Fonts.interSemiBold,
          fontSize: Typography.extraSmall,
          marginTop: Spacing.xs,
        },
        tabBarIcon: ({focused, color}) => {
          const iconProps = {
            width: 22, 
            height: 22,
            color: focused ? Colors.primary600 : Colors.neutral700,};

          switch (route.name) {
            case 'Map':
              return <MapIcon {...iconProps} />;
            case 'Favorites':
              return <FavoritesIcon {...iconProps} />;
            case 'Reservations':
              return <ReservationsIcon {...iconProps} />;
            case 'Account':
              return <AccountIcon {...iconProps} />;
            case 'Home':
            default:
              return <HomeIcon {...iconProps} />;
          }
        },
      })}>
      <BottomTab.Screen name="Home" component={HomeStackNavigator} options={{title: 'Home'}} />
      <BottomTab.Screen name="Map" component={MapStackNavigator} options={{title: 'Map'}} />
      <BottomTab.Screen name="Favorites" component={FavoritesStackNavigator} options={{title: 'Favorites'}} />
      <BottomTab.Screen name="Reservations" component={ReservationStackNavigator} options={{title: 'Reservations'}} />
      <BottomTab.Screen name="Account" component={AccountStackNavigator} options={{title: 'Account'}} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
