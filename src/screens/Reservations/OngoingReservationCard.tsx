import React from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import AppText from '../../component/AppText/AppText';
import ClockIcon from '../../assets/icons/ic_clock.svg';
import GuestIcon from '../../assets/icons/ic_guest.svg';

import {
  Colors,
  Fonts,
  Radius,
  Spacing,
  Typography,
} from '../../theme';

// ============================================================
// COMPONENT
// ============================================================

const OngoingReservationCard = () => {

  return (
    <View
      style={
        styles.card
      }>

      {/* ====================================================
          RESTAURANT
      ==================================================== */}

      <View
        style={
          styles.topRow
        }>

        <View
          style={
            styles.image
          }>

          <View
            style={
              styles.imagePlaceholder
            }
          />

        </View>

        <View
          style={
            styles.restaurantInfo
          }>

          <AppText
            style={
              styles.seatedNow
            }>
            SEATED NOW
          </AppText>

          <AppText
            style={
              styles.restaurantName
            }>
            Sakura Bites
          </AppText>

          <AppText
            style={
              styles.tableInfo
            }>
            Table 12 · Seated 20 min ago
          </AppText>

        </View>

      </View>

      {/* ====================================================
          INFORMATION
      ==================================================== */}

      <View
        style={
          styles.infoRow
        }>

        <View
          style={
            styles.infoItem
          }>

          <ClockIcon
            width={24}
            height={24}
          />

          <AppText
            style={
              styles.infoText
            }>
            7:30 PM
          </AppText>

        </View>

        <View
          style={
            styles.infoItem
          }>

          <GuestIcon
            width={24}
            height={24}
          />

          <AppText
            style={
              styles.infoText
            }>
            2 guests
          </AppText>

        </View>

        <View
          style={
            styles.infoItem
          }>

          <AppText
            style={
              styles.icon
            }>
            ♧
          </AppText>

          <AppText
            style={
              styles.infoText
            }>
            Dine-in
          </AppText>

        </View>

      </View>

      {/* ====================================================
          ACTIONS
      ==================================================== */}

      <View
        style={
          styles.actionRow
        }>

        <TouchableOpacity
          activeOpacity={0.85}
          style={
            styles.darkButton
          }>

          <AppText
            style={
              styles.darkButtonText
            }>
            View menu
          </AppText>

        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          style={
            styles.lightButton
          }>

          <AppText
            style={
              styles.lightButtonText
            }>
            Call restaurant
          </AppText>

        </TouchableOpacity>

      </View>

    </View>
  );
};

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  card: {
    borderRadius:
      Radius.xl,

    backgroundColor:
      '#5A3325',

    padding:
      Spacing.md,

    marginBottom:
      Spacing.sm,
  },

  // ==========================================================
  // TOP
  // ==========================================================

  topRow: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  image: {
    width: 62,

    height: 62,

    borderRadius: 31,

    overflow: 'hidden',

    borderWidth: 2,

    borderColor:
      Colors.white,

    marginRight:
      Spacing.sm,
  },

  imagePlaceholder: {
    flex: 1,

    backgroundColor:
      '#A9623D',
  },

  restaurantInfo: {
    flex: 1,
  },

  seatedNow: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.extraSmall,

    color:
      Colors.white,

    opacity: 0.85,
  },

  restaurantName: {
    marginTop: 2,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.title,

    color:
      Colors.white,
  },

  tableInfo: {
    marginTop: 2,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    color:
      Colors.white,

    opacity: 0.85,
  },

  // ==========================================================
  // INFORMATION
  // ==========================================================

  infoRow: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    marginTop:
      Spacing.md,
  },

  infoItem: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  icon: {
    fontSize: 17,

    color:
      Colors.white,

    marginRight: 5,
  },

  infoText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.small,

    color:
      Colors.white,
  },

  // ==========================================================
  // ACTIONS
  // ==========================================================

  actionRow: {
    flexDirection: 'row',

    marginTop:
      Spacing.md,
  },

  darkButton: {
    flex: 1,

    height: 46,

    borderRadius:
      Radius.round,

    backgroundColor:
      'rgba(255,255,255,0.18)',

    justifyContent:
      'center',

    alignItems:
      'center',

    marginRight:
      Spacing.sm,
  },

  darkButtonText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.small,

    color:
      Colors.white,
  },

  lightButton: {
    flex: 1,

    height: 46,

    borderRadius:
      Radius.round,

    backgroundColor:
      Colors.white,

    justifyContent:
      'center',

    alignItems:
      'center',
  },

  lightButtonText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.small,

    color:
      Colors.orangePrimary,
  },
});

export default React.memo(
  OngoingReservationCard,
);