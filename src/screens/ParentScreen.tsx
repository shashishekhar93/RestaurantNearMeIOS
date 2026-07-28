import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AppScreen from '../component/AppScreen/AppScreen';
import AppText from '../component/AppText';
import {Colors, Fonts, Radius, Spacing, Typography} from '../theme';
import DropdownIcon from '../assets/icons/ic_dropdown.svg';
import NotificationIcon from '../assets/icons/ic_notification.svg';

const ParentScreen = () => {
  return (
    <AppScreen style={styles.screen}>
      Header with location dropdown and notification button
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <AppText style={styles.locationText}>Bengaluru</AppText>
          <DropdownIcon />
        </View>
        <TouchableOpacity style={styles.notificationButton} activeOpacity={0.8}>
          <NotificationIcon />
        </TouchableOpacity>
      </View>

      {/* Main content area for Home screen */}
      <View style={styles.contentArea}>
        <View style={styles.contentContainer}>
          <AppText style={styles.welcomeText}>Welcome back!</AppText>
          <AppText style={styles.screenTitle}>Home</AppText>
          <AppText style={styles.descriptionText}>
            Tap a tab below to switch between screens. The selected tab name appears here.
          </AppText>
        </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.mainBackground,
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
  notificationButton: {
    width: 48,
    height: 24,
    borderRadius: Radius.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
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
});

export default ParentScreen;
