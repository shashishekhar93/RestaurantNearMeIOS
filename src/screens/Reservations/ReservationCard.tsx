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
// RESERVATION TYPE
// ============================================================

type ReservationStatus =
  | 'CONFIRMED'
  | 'PENDING'
  | 'COMPLETED'
  | 'CANCELLED';

type Reservation = {
  id: string;

  restaurantName: string;

  cuisine: string;

  seating: string;

  date: string;

  time: string;

  guests: number;

  status: ReservationStatus;
};

// ============================================================
// PROPS
// ============================================================

type Props = {
  reservation: Reservation;
};

// ============================================================
// COMPONENT
// ============================================================

const ReservationCard = ({
  reservation,
}: Props) => {

  // ==========================================================
  // STATUS
  // ==========================================================

  const statusStyle =
    getStatusStyle(
      reservation.status,
    );

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={
        styles.card
      }>

      {/* ====================================================
          TOP ROW
      ==================================================== */}

      <View
        style={
          styles.topRow
        }>

        {/* ==================================================
            IMAGE
        ================================================== */}

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

        {/* ==================================================
            RESTAURANT INFORMATION
        ================================================== */}

        <View
          style={
            styles.restaurantInfo
          }>

          <View
            style={
              styles.nameRow
            }>

            <AppText
              numberOfLines={1}
              style={
                styles.restaurantName
              }>
              {reservation.restaurantName}
            </AppText>

            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    statusStyle.background,
                },
              ]}>

              <AppText
                style={[
                  styles.statusText,
                  {
                    color:
                      statusStyle.text,
                  },
                ]}>
                {reservation.status}
              </AppText>

            </View>

          </View>

          <AppText
            numberOfLines={1}
            style={
              styles.details
            }>
            {reservation.cuisine}
            {' · '}
            {reservation.seating}
          </AppText>

        </View>

        {/* ==================================================
            CHEVRON
        ================================================== */}

        <AppText
          style={
            styles.chevron
          }>
          ›
        </AppText>

      </View>

      {/* ====================================================
          BOTTOM INFORMATION
      ==================================================== */}

      <View
        style={
          styles.bottomRow
        }>

        <View
          style={
            styles.infoItem
          }>

          <AppText
            style={
              styles.infoIcon
            }>
            □
          </AppText>

          <AppText
            style={
              styles.infoText
            }>
            {reservation.date}
          </AppText>

        </View>

        <View
          style={
            styles.infoItem
          }>

          <AppText
            style={
              styles.infoIcon
            }>
            ◷
          </AppText>

          <AppText
            style={
              styles.infoText
            }>
            {reservation.time}
          </AppText>

        </View>

        <View
          style={
            styles.infoItem
          }>

          <AppText
            style={
              styles.infoIcon
            }>
            ♙
          </AppText>

          <AppText
            style={
              styles.infoText
            }>
            {reservation.guests} guests
          </AppText>

        </View>

      </View>

    </TouchableOpacity>
  );
};

// ============================================================
// STATUS COLORS
// ============================================================

const getStatusStyle = (
  status: ReservationStatus,
) => {

  switch (status) {

    case 'CONFIRMED':
      return {
        background:
          Colors.success50,

        text:
          Colors.success700,
      };

    case 'PENDING':
      return {
        background:
          Colors.warning50,

        text:
          Colors.primary800,
      };

    case 'COMPLETED':
      return {
        background:
          Colors.neutral100,

        text:
          Colors.neutral600,
      };

    case 'CANCELLED':
      return {
        background:
          Colors.error50,

        text:
          Colors.error700,
      };

    default:
      return {
        background:
          Colors.background300,

        text:
          Colors.neutral700,
      };
  }
};

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // CARD
  // ==========================================================

  card: {
    backgroundColor:
      Colors.white,

    borderRadius:
      Radius.xl,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    padding:
      Spacing.md,

    marginBottom:
      Spacing.sm,
  },

  // ==========================================================
  // TOP
  // ==========================================================

  topRow: {
    flexDirection:
      'row',

    alignItems:
      'center',
  },

  // ==========================================================
  // IMAGE
  // ==========================================================

  image: {
    width: 64,

    height: 64,

    borderRadius: 32,

    overflow: 'hidden',

    marginRight:
      Spacing.sm,
  },

  imagePlaceholder: {
    flex: 1,

    backgroundColor:
      Colors.background300,
  },

  // ==========================================================
  // RESTAURANT INFORMATION
  // ==========================================================

  restaurantInfo: {
    flex: 1,

    minWidth: 0,
  },

  nameRow: {
    flexDirection:
      'row',

    alignItems:
      'center',

    flex: 1,
  },

  restaurantName: {
    flexShrink: 1,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.body,

    color:
      Colors.neutral900,

    marginRight:
      Spacing.xs,
  },

  details: {
    marginTop: 4,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    color:
      Colors.neutral600,
  },

  // ==========================================================
  // STATUS
  // ==========================================================

  statusBadge: {
    paddingHorizontal:
      7,

    paddingVertical:
      3,

    borderRadius:
      Radius.round,
  },

  statusText: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.extraSmall,
  },

  // ==========================================================
  // CHEVRON
  // ==========================================================

  chevron: {
    fontSize: 28,

    lineHeight: 28,

    color:
      Colors.neutral700,

    marginLeft:
      Spacing.xs,
  },

  // ==========================================================
  // BOTTOM
  // ==========================================================

  bottomRow: {
    flexDirection:
      'row',

    alignItems:
      'center',

    justifyContent:
      'space-between',

    marginTop:
      Spacing.md,

    paddingTop:
      Spacing.sm,
  },

  infoItem: {
    flexDirection:
      'row',

    alignItems:
      'center',

    marginRight:
      Spacing.sm,
  },

  infoIcon: {
    fontSize: 17,

    color:
      Colors.neutral800,

    marginRight: 5,
  },

  infoText: {
    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.extraSmall,

    color:
      Colors.neutral800,
  },
});

// ============================================================
// EXPORT
// ============================================================

export default React.memo(
  ReservationCard,
);