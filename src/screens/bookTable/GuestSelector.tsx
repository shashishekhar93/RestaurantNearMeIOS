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
// PROPS
// ============================================================

type Props = {
  value: number;

  min?: number;

  max?: number;

  onChange: (value: number) => void;
};


// ============================================================
// COMPONENT
// ============================================================

const GuestSelector = ({
  value,
  min = 1,
  max = 20,
  onChange,
}: Props) => {

  const decrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };


  const increase = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };


  return (
    <View style={styles.container}>

      {/* ======================================================
          DECREASE
      ====================================================== */}

      <TouchableOpacity
        activeOpacity={0.8}
        disabled={value <= min}
        onPress={decrease}
        style={[
          styles.button,
          value <= min &&
            styles.disabledButton,
        ]}>

        <AppText
          style={[
            styles.buttonText,
            value <= min &&
              styles.disabledText,
          ]}>
          −
        </AppText>

      </TouchableOpacity>


      {/* ======================================================
          GUEST COUNT
      ====================================================== */}

      <View style={styles.countContainer}>

        <AppText
          style={styles.count}>
          {value}
        </AppText>

        <AppText
          style={styles.label}>
          {value === 1
            ? 'guest'
            : 'guests'}
        </AppText>

      </View>


      {/* ======================================================
          INCREASE
      ====================================================== */}

      <TouchableOpacity
        activeOpacity={0.8}
        disabled={value >= max}
        onPress={increase}
        style={[
          styles.button,
          value >= max &&
            styles.disabledButton,
        ]}>

        <AppText
          style={[
            styles.buttonText,
            value >= max &&
              styles.disabledText,
          ]}>
          +
        </AppText>

      </TouchableOpacity>

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
    flexDirection: 'row',

    alignItems: 'center',

    alignSelf: 'center',

    padding:
      Spacing.xs,

    borderRadius:
      Radius.round,

    backgroundColor:
      Colors.background300,
  },


  // ==========================================================
  // BUTTON
  // ==========================================================

  button: {
    width: 44,

    aspectRatio: 1,

    borderRadius:
      Radius.round,

    justifyContent:
      'center',

    alignItems:
      'center',

    backgroundColor:
      Colors.white,
  },


  // ==========================================================
  // BUTTON TEXT
  // ==========================================================

  buttonText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize: 26,

    lineHeight: 28,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // DISABLED BUTTON
  // ==========================================================

  disabledButton: {
    opacity: 0.45,
  },


  disabledText: {
    color:
      Colors.neutral500,
  },


  // ==========================================================
  // COUNT
  // ==========================================================

  countContainer: {
    minWidth: 82,

    alignItems:
      'center',

    justifyContent:
      'center',

    paddingHorizontal:
      Spacing.sm,
  },


  count: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.title,

    lineHeight: 26,

    color:
      Colors.neutral900,
  },


  label: {
    marginTop: 1,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.extraSmall,

    color:
      Colors.neutral600,
  },

});


export default React.memo(
  GuestSelector,
);