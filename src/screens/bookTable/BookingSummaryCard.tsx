import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import AppText from '../../component/AppText/AppText';

import {
  Colors,
  Fonts,
  Radius,
  Spacing,
  Typography,
} from '../../theme';


// ============================================================
// PROPS
// ============================================================

type Props = {
  restaurantName: string;

  guests: number;

  date?: string;

  time?: string;

  seating?: string;
};


// ============================================================
// COMPONENT
// ============================================================

const BookingSummaryCard = ({
  restaurantName,
  guests,
  date,
  time,
  seating,
}: Props) => {

  return (
    <View style={styles.card}>

      {/* ======================================================
          RESTAURANT
      ====================================================== */}

      <View style={styles.restaurantSection}>

        <AppText
          numberOfLines={1}
          style={styles.restaurantName}>
          {restaurantName}
        </AppText>

      </View>


      {/* ======================================================
          SUMMARY ROWS
      ====================================================== */}

      <View style={styles.summaryRow}>

        <View style={styles.summaryItem}>

          <AppText style={styles.icon}>
            ◷
          </AppText>

          <View style={styles.itemContent}>

            <AppText style={styles.label}>
              Date & Time
            </AppText>

            <AppText
              numberOfLines={1}
              style={styles.value}>

              {date || 'Not selected'}

              {time
                ? ` · ${time}`
                : ''}

            </AppText>

          </View>

        </View>


        <View style={styles.summaryItem}>

          <AppText style={styles.icon}>
            ♙
          </AppText>

          <View style={styles.itemContent}>

            <AppText style={styles.label}>
              Guests
            </AppText>

            <AppText style={styles.value}>
              {guests}
              {guests === 1
                ? ' guest'
                : ' guests'}
            </AppText>

          </View>

        </View>

      </View>


      {/* ======================================================
          SEATING
      ====================================================== */}

      {seating ? (

        <View style={styles.seatingRow}>

          <AppText style={styles.icon}>
            ◉
          </AppText>

          <View style={styles.itemContent}>

            <AppText style={styles.label}>
              Seating
            </AppText>

            <AppText style={styles.value}>
              {seating}
            </AppText>

          </View>

        </View>

      ) : null}

    </View>
  );
};


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // CARD
  // ==========================================================

  card: {
    width: '100%',

    padding:
      Spacing.md,

    borderRadius:
      Radius.xl,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    backgroundColor:
      Colors.white,
  },


  // ==========================================================
  // RESTAURANT
  // ==========================================================

  restaurantSection: {
    paddingBottom:
      Spacing.sm,

    marginBottom:
      Spacing.sm,

    borderBottomWidth: 1,

    borderBottomColor:
      Colors.background400,
  },


  restaurantName: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.body,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // SUMMARY ROW
  // ==========================================================

  summaryRow: {
    flexDirection: 'row',

    alignItems: 'center',

    width: '100%',

    gap: Spacing.md,
  },


  // ==========================================================
  // SUMMARY ITEM
  // ==========================================================

  summaryItem: {
    flex: 1,

    flexDirection: 'row',

    alignItems: 'center',

    minWidth: 0,
  },


  // ==========================================================
  // SEATING
  // ==========================================================

  seatingRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop:
      Spacing.md,

    paddingTop:
      Spacing.md,

    borderTopWidth: 1,

    borderTopColor:
      Colors.background400,
  },


  // ==========================================================
  // ICON
  // ==========================================================

  icon: {
    width: 28,

    fontSize: 18,

    color:
      Colors.neutral800,

    textAlign: 'center',

    marginRight:
      Spacing.sm,
  },


  // ==========================================================
  // CONTENT
  // ==========================================================

  itemContent: {
    flex: 1,

    minWidth: 0,
  },


  // ==========================================================
  // LABEL
  // ==========================================================

  label: {
    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.extraSmall,

    color:
      Colors.neutral600,
  },


  // ==========================================================
  // VALUE
  // ==========================================================

  value: {
    marginTop: 2,

    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.small,

    color:
      Colors.neutral900,
  },

});


export default React.memo(
  BookingSummaryCard,
);