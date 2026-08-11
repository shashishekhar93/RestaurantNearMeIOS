import React from 'react';

import {
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
// TIME ITEM
// ============================================================

export type BookingTime = {
  value: string;

  label: string;

  available?: boolean;
};


// ============================================================
// PROPS
// ============================================================

type Props = {
  times: BookingTime[];

  selectedTime?: string;

  onChange: (time: BookingTime) => void;
};


// ============================================================
// COMPONENT
// ============================================================

const TimeSelector = ({
  times,
  selectedTime,
  onChange,
}: Props) => {

  return (
    <View style={styles.container}>

      {times.map(time => {

        const selected =
          selectedTime ===
          time.value;

        const available =
          time.available !== false;

        return (
          <TouchableOpacity
            key={time.value}
            activeOpacity={0.8}
            disabled={!available}
            onPress={() =>
              onChange(time)
            }
            style={[
              styles.timeButton,
              selected &&
                styles.selectedTimeButton,
              !available &&
                styles.disabledTimeButton,
            ]}>

            <AppText
              style={[
                styles.timeText,
                selected &&
                  styles.selectedTimeText,
                !available &&
                  styles.disabledTimeText,
              ]}>
              {time.label}
            </AppText>

          </TouchableOpacity>
        );
      })}

    </View>
  );
};


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // CONTAINER
  // ==========================================================

  container: {
    width: '100%',

    flexDirection: 'row',

    flexWrap: 'wrap',

    gap: Spacing.sm,

    alignItems: 'center',
  },


  // ==========================================================
  // TIME BUTTON
  // ==========================================================

  timeButton: {
    minWidth: 88,

    paddingHorizontal:
      Spacing.md,

    paddingVertical:
      Spacing.sm,

    borderRadius:
      Radius.round,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    backgroundColor:
      Colors.white,

    justifyContent:
      'center',

    alignItems:
      'center',
  },


  // ==========================================================
  // SELECTED
  // ==========================================================

  selectedTimeButton: {
    backgroundColor:
      Colors.orangePrimary,

    borderColor:
      Colors.orangePrimary,
  },


  // ==========================================================
  // DISABLED
  // ==========================================================

  disabledTimeButton: {
    backgroundColor:
      Colors.background300,

    borderColor:
      Colors.background400,

    opacity: 0.55,
  },


  // ==========================================================
  // TIME TEXT
  // ==========================================================

  timeText: {
    fontFamily:
      Fonts.interMedium,

    fontSize:
      Typography.small,

    color:
      Colors.neutral800,
  },


  // ==========================================================
  // SELECTED TEXT
  // ==========================================================

  selectedTimeText: {
    fontFamily:
      Fonts.interSemiBold,

    color:
      Colors.white,
  },


  // ==========================================================
  // DISABLED TEXT
  // ==========================================================

  disabledTimeText: {
    color:
      Colors.neutral500,
  },

});


export default React.memo(
  TimeSelector,
);  