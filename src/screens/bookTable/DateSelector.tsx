import React from 'react';

import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
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
// DATE ITEM
// ============================================================

export type BookingDate = {
  value: string;

  day: string;

  date: string;

  month: string;
};


// ============================================================
// PROPS
// ============================================================

type Props = {
  dates: BookingDate[];

  selectedDate?: string;

  onChange: (date: BookingDate) => void;
};


// ============================================================
// COMPONENT
// ============================================================

const DateSelector = ({
  dates,
  selectedDate,
  onChange,
}: Props) => {

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={
        styles.content
      }>

      {dates.map(date => {

        const selected =
          selectedDate ===
          date.value;

        return (
          <TouchableOpacity
            key={date.value}
            activeOpacity={0.8}
            onPress={() =>
              onChange(date)
            }
            style={[
              styles.dateCard,
              selected &&
                styles.selectedDateCard,
            ]}>

            {/* ==================================================
                DAY
            ================================================== */}

            <AppText
              style={[
                styles.day,
                selected &&
                  styles.selectedText,
              ]}>
              {date.day}
            </AppText>


            {/* ==================================================
                DATE
            ================================================== */}

            <AppText
              style={[
                styles.date,
                selected &&
                  styles.selectedText,
              ]}>
              {date.date}
            </AppText>


            {/* ==================================================
                MONTH
            ================================================== */}

            <AppText
              style={[
                styles.month,
                selected &&
                  styles.selectedText,
              ]}>
              {date.month}
            </AppText>

          </TouchableOpacity>
        );
      })}

    </ScrollView>
  );
};


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // CONTENT
  // ==========================================================

  content: {
    paddingHorizontal:
      Spacing.xs,

    paddingVertical:
      Spacing.xs,

    gap:
      Spacing.sm,
  },


  // ==========================================================
  // DATE CARD
  // ==========================================================

  dateCard: {
    minWidth: 72,

    paddingHorizontal:
      Spacing.sm,

    paddingVertical:
      Spacing.md,

    borderRadius:
      Radius.xl,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    backgroundColor:
      Colors.white,

    alignItems:
      'center',

    justifyContent:
      'center',
  },


  // ==========================================================
  // SELECTED DATE
  // ==========================================================

  selectedDateCard: {
    backgroundColor:
      Colors.orangePrimary,

    borderColor:
      Colors.orangePrimary,
  },


  // ==========================================================
  // DAY
  // ==========================================================

  day: {
    fontFamily:
      Fonts.interMedium,

    fontSize:
      Typography.extraSmall,

    color:
      Colors.neutral600,

    textTransform:
      'uppercase',
  },


  // ==========================================================
  // DATE
  // ==========================================================

  date: {
    marginTop: 4,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.h3,

    lineHeight: 30,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // MONTH
  // ==========================================================

  month: {
    marginTop: 2,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.extraSmall,

    color:
      Colors.neutral600,

    textTransform:
      'uppercase',
  },


  // ==========================================================
  // SELECTED TEXT
  // ==========================================================

  selectedText: {
    color:
      Colors.white,
  },

});


export default React.memo(
  DateSelector,
);