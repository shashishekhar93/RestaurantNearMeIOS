import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AppScreen from '../component/AppScreen/AppScreen';
import AppText from '../component/AppText';
import {Colors, Fonts, Radius, Spacing, Typography} from '../theme';
import AccountIcon from '../assets/icons/ic_account.svg';
import FavoritesIcon from '../assets/icons/ic_favorites.svg';
import HomeIcon from '../assets/icons/ic_home.svg';
import MapIcon from '../assets/icons/ic_map.svg';
import ReservationsIcon from '../assets/icons/ic_reservations.svg';
import DropdownIcon from '../assets/icons/ic_dropdown.svg';
import NotificationIcon from '../assets/icons/ic_notification.svg';
import AccountScreen from './AccountScreen';

type TabKey = 'home' | 'map' | 'favorites' | 'reservations' | 'account';

type TabItem = {
  key: TabKey;
  label: string;
  Icon: React.ComponentType<{width?: number; height?: number; stroke?: string; fill?: string}>;
};

const tabs: TabItem[] = [
  {key: 'home', label: 'Home', Icon: HomeIcon},
  {key: 'map', label: 'Map', Icon: MapIcon},
  {key: 'favorites', label: 'Favourites', Icon: FavoritesIcon},
  {key: 'reservations', label: 'Reservations', Icon: ReservationsIcon},
  {key: 'account', label: 'Account', Icon: AccountIcon},
];

const ParentScreen = () => {
  const [selectedTab, setSelectedTab] = useState<TabKey>('home');
  const activeColor = Colors.primary600;
  const inactiveColor = Colors.neutral700;
  const activeTab = tabs.find(tab => tab.key === selectedTab);

  const renderContent = () => {
    // Render the Account screen when the account tab is selected.
    if (selectedTab === 'account') {
      return <AccountScreen />;
    }

    // Default placeholder content for other tabs.
    return (
      <View style={styles.contentContainer}>
        <AppText style={styles.welcomeText}>Welcome back!</AppText>
        <AppText style={styles.screenTitle}>{activeTab?.label}</AppText>
        <AppText style={styles.descriptionText}>
          Tap a tab below to switch between screens. The selected tab name appears here.
        </AppText>
      </View>
    );
  };

  return (
    <AppScreen style={styles.screen}>
      {/* Header with location dropdown and notification button */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <AppText style={styles.locationText}>Bengaluru</AppText>
          <DropdownIcon />
        </View>
        <TouchableOpacity style={styles.notificationButton} activeOpacity={0.8}>
          <NotificationIcon />
        </TouchableOpacity>
      </View>

      {/* Main content area changes based on the selected tab */}
      <View style={styles.contentArea}>{renderContent()}</View>

      {/* Bottom tab navigation */}
      <View style={styles.tabBar}>
        {tabs.map(tab => {
          const isActive = tab.key === selectedTab;
          const iconColor = isActive ? activeColor : inactiveColor;

          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              activeOpacity={0.8}
              onPress={() => setSelectedTab(tab.key)}>
              <tab.Icon width={24} height={24} stroke={iconColor} fill="none" />
              <AppText style={[styles.tabLabel, {color: iconColor}]}>{tab.label}</AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.mainBackground,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: Spacing.md,
    marginHorizontal: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral50,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.xl,
  },
  locationText: {
    marginRight: Spacing.xs,
    fontSize: Typography.title,
    fontFamily: Fonts.interBold,
    color: Colors.neutral700,
  },
  dropdownArrow: {
    marginLeft: Spacing.xs,
    fontSize: Typography.caption,
    color: Colors.neutral700,
    fontFamily: Fonts.interBold,
  },
  notificationButton: {
    width: 48,
    height: 24,
    borderRadius: Radius.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  welcomeText: {
    fontSize: Typography.h3,
    color: Colors.neutral700,
    fontFamily: Fonts.interSemiBold,
    marginBottom: Spacing.sm,
  },
  screenTitle: {
    fontSize: Typography.h1,
    color: Colors.neutral900,
    fontFamily: Fonts.interBold,
    marginBottom: Spacing.sm,
  },
  descriptionText: {
    fontSize: Typography.body,
    color: Colors.neutral600,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: Fonts.interRegular,
    maxWidth: 280,
  },
  tabBar: {
    backgroundColor: Colors.neutral50,
    margin: Spacing.md,
    borderRadius: Radius.rounded,
    paddingVertical: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: Colors.neutral600,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  tabLabel: {
    marginTop: Spacing.xs,
    fontSize: Typography.extraSmall,
    fontFamily: Fonts.interSemiBold,
  },
});

export default ParentScreen;
