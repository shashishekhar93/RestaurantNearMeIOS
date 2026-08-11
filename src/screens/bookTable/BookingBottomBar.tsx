import React from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

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
  buttonText: string;

  onPress: () => void;

  disabled?: boolean;

  secondaryText?: string;
};


// ============================================================
// COMPONENT
// ============================================================

const BookingBottomBar = ({
  buttonText,
  onPress,
  disabled = false,
  secondaryText,
}: Props) => {

  const insets =
    useSafeAreaInsets();


  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom:
            insets.bottom +
            Spacing.sm,
        },
      ]}>

      {/* ======================================================
          SECONDARY INFORMATION
      ====================================================== */}

      {secondaryText ? (
        <AppText
          numberOfLines={2}
          style={styles.secondaryText}>
          {secondaryText}
        </AppText>
      ) : null}


      {/* ======================================================
          ACTION BUTTON
      ====================================================== */}

      <TouchableOpacity
        activeOpacity={0.85}
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.button,
          disabled &&
            styles.disabledButton,
        ]}>

        <AppText
          style={[
            styles.buttonText,
            disabled &&
              styles.disabledButtonText,
          ]}>
          {buttonText}
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
    width: '100%',

    paddingHorizontal:
      Spacing.md,

    paddingTop:
      Spacing.sm,

    backgroundColor:
      Colors.white,

    borderTopWidth: 1,

    borderTopColor:
      Colors.background500,
  },


  // ==========================================================
  // SECONDARY TEXT
  // ==========================================================

  secondaryText: {
    marginBottom:
      Spacing.sm,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.extraSmall,

    lineHeight: 17,

    color:
      Colors.neutral600,

    textAlign: 'center',
  },


  // ==========================================================
  // BUTTON
  // ==========================================================

  button: {
    width: '100%',

    minHeight: 52,

    paddingHorizontal:
      Spacing.lg,

    paddingVertical:
      Spacing.sm,

    borderRadius:
      Radius.xl,

    backgroundColor:
      Colors.orangePrimary,

    justifyContent:
      'center',

    alignItems:
      'center',
  },


  // ==========================================================
  // DISABLED BUTTON
  // ==========================================================

  disabledButton: {
    backgroundColor:
      Colors.background400,

    opacity: 0.7,
  },


  // ==========================================================
  // BUTTON TEXT
  // ==========================================================

  buttonText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.white,
  },


  // ==========================================================
  // DISABLED BUTTON TEXT
  // ==========================================================

  disabledButtonText: {
    color:
      Colors.neutral600,
  },

});


export default React.memo(
  BookingBottomBar,
);