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

import {
  BookingSeating,
} from './BookingTypes';


// ============================================================
// PROPS
// ============================================================

type Props = {
  seating: BookingSeating;

  selected?: boolean;

  description?: string;

  onPress: () => void;
};


// ============================================================
// COMPONENT
// ============================================================

const SeatingOption = ({
  seating,
  selected = false,
  description,
  onPress,
}: Props) => {

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.container,
        selected &&
          styles.selectedContainer,
      ]}>

      {/* ======================================================
          RADIO
      ====================================================== */}

      <View
        style={[
          styles.radio,
          selected &&
            styles.selectedRadio,
        ]}>

        {selected && (
          <View
            style={styles.radioDot}
          />
        )}

      </View>


      {/* ======================================================
          CONTENT
      ====================================================== */}

      <View
        style={styles.content}>

        <AppText
          style={[
            styles.title,
            selected &&
              styles.selectedTitle,
          ]}>
          {seating}
        </AppText>

        {description ? (
          <AppText
            numberOfLines={2}
            style={styles.description}>
            {description}
          </AppText>
        ) : null}

      </View>

    </TouchableOpacity>
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

    alignItems: 'center',

    paddingHorizontal:
      Spacing.md,

    paddingVertical:
      Spacing.md,

    borderRadius:
      Radius.xl,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    backgroundColor:
      Colors.white,

    marginBottom:
      Spacing.sm,
  },


  // ==========================================================
  // SELECTED CONTAINER
  // ==========================================================

  selectedContainer: {
    borderColor:
      Colors.orangePrimary,

    backgroundColor:
      Colors.background100,
  },


  // ==========================================================
  // RADIO
  // ==========================================================

  radio: {
    width: 22,

    aspectRatio: 1,

    borderRadius:
      Radius.round,

    borderWidth: 2,

    borderColor:
      Colors.neutral400,

    justifyContent:
      'center',

    alignItems:
      'center',

    marginRight:
      Spacing.md,
  },


  // ==========================================================
  // SELECTED RADIO
  // ==========================================================

  selectedRadio: {
    borderColor:
      Colors.orangePrimary,
  },


  // ==========================================================
  // RADIO DOT
  // ==========================================================

  radioDot: {
    width: 10,

    aspectRatio: 1,

    borderRadius:
      Radius.round,

    backgroundColor:
      Colors.orangePrimary,
  },


  // ==========================================================
  // CONTENT
  // ==========================================================

  content: {
    flex: 1,

    minWidth: 0,
  },


  // ==========================================================
  // TITLE
  // ==========================================================

  title: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // SELECTED TITLE
  // ==========================================================

  selectedTitle: {
    color:
      Colors.neutral900,
  },


  // ==========================================================
  // DESCRIPTION
  // ==========================================================

  description: {
    marginTop: 3,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.extraSmall,

    lineHeight: 17,

    color:
      Colors.neutral600,
  },

});


export default React.memo(
  SeatingOption,
);