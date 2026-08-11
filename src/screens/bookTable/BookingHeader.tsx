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
  restaurantName: string;

  restaurantSubtitle?: string;

  currentStep: number;

  totalSteps?: number;

  onBack: () => void;
};


// ============================================================
// COMPONENT
// ============================================================

const BookingHeader = ({
  restaurantName,
  restaurantSubtitle = 'Italian · Café',
  currentStep,
  totalSteps = 5,
  onBack,
}: Props) => {

  const insets = useSafeAreaInsets();


  return (
    <View
      style={[
        styles.container,
        {
          paddingTop:
            insets.top +
            Spacing.sm,
        },
      ]}>

      {/* ======================================================
          HEADER ROW
      ====================================================== */}

      <View style={styles.headerRow}>

        {/* ====================================================
            BACK BUTTON
        ==================================================== */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onBack}
          style={styles.backButton}>

          <AppText
            style={styles.backIcon}>
            ‹
          </AppText>

        </TouchableOpacity>


        {/* ====================================================
            RESTAURANT INFORMATION
        ==================================================== */}

        <View style={styles.restaurantInfo}>

          <AppText
            numberOfLines={1}
            style={styles.restaurantName}>
            Book a table
          </AppText>

          <AppText
            numberOfLines={1}
            style={styles.restaurantSubtitle}>
            {restaurantName}
          </AppText>

        </View>


        {/* ====================================================
            STEP COUNTER
        ==================================================== */}

        <AppText
          style={styles.stepCounter}>
          {currentStep}/{totalSteps}
        </AppText>

      </View>


      {/* ======================================================
          PROGRESS
      ====================================================== */}

      <View style={styles.progressContainer}>

        {Array.from({
          length: totalSteps,
        }).map((_, index) => {

          const stepNumber =
            index + 1;

          const completed =
            stepNumber <= currentStep;

          return (
            <View
              key={stepNumber}
              style={[
                styles.progressSegment,
                completed &&
                  styles.activeProgressSegment,
              ]}
            />
          );
        })}

      </View>

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

    paddingBottom:
      Spacing.sm,

    backgroundColor:
      Colors.mainBackground,
  },


  // ==========================================================
  // HEADER ROW
  // ==========================================================

  headerRow: {
    flexDirection: 'row',

    alignItems: 'center',

    width: '100%',
  },


  // ==========================================================
  // BACK BUTTON
  // ==========================================================

  backButton: {
    width: 40,

    aspectRatio: 1,

    borderRadius:
      Radius.round,

    backgroundColor:
      Colors.background300,

    justifyContent:
      'center',

    alignItems:
      'center',

    marginRight:
      Spacing.sm,
  },


  // ==========================================================
  // BACK ICON
  // ==========================================================

  backIcon: {
    fontFamily:
      Fonts.interRegular,

    fontSize: 28,

    lineHeight: 28,

    color:
      Colors.neutral900,

    marginTop: -2,
  },


  // ==========================================================
  // RESTAURANT INFORMATION
  // ==========================================================

  restaurantInfo: {
    flex: 1,

    minWidth: 0,
  },


  restaurantName: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.small,

    color:
      Colors.neutral900,
  },


  restaurantSubtitle: {
    marginTop: 2,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.extraSmall,

    color:
      Colors.neutral600,
  },


  // ==========================================================
  // STEP COUNTER
  // ==========================================================

  stepCounter: {
    marginLeft:
      Spacing.sm,

    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.extraSmall,

    color:
      Colors.neutral700,
  },


  // ==========================================================
  // PROGRESS CONTAINER
  // ==========================================================

  progressContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    width: '100%',

    gap: Spacing.xs,

    marginTop:
      Spacing.md,
  },


  // ==========================================================
  // PROGRESS SEGMENT
  // ==========================================================

  progressSegment: {
    flex: 1,

    minWidth: 0,

    height: 3,

    borderRadius:
      Radius.round,

    backgroundColor:
      Colors.background500,
  },


  // ==========================================================
  // ACTIVE PROGRESS SEGMENT
  // ==========================================================

  activeProgressSegment: {
    backgroundColor:
      Colors.orangePrimary,
  },

});


export default React.memo(
  BookingHeader,
);