import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

import AppText from '../../component/AppText/AppText';

import CheckIcon from '../../assets/icons/ic_check.svg';
import BonusIcon from '../../assets/icons/ic_bonus.svg';

import {
  Colors,
  Fonts,
  Radius,
  Spacing,
  Typography,
} from '../../theme';

type Props = {
  image: any;
  restaurant: string;
  subtitle: string;
  completed: number;
  total: number;
};

const StampCard = ({
  image,
  restaurant,
  subtitle,
  completed,
  total,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={image}
          style={styles.image}
        />

        <View style={styles.info}>
          <AppText style={styles.restaurant}>
            {restaurant}
          </AppText>

          <AppText style={styles.subtitle}>
            {subtitle}
          </AppText>
        </View>

        <View style={styles.rewardCount}>
          <BonusIcon
            width={18}
            height={18}
          />

          <AppText style={styles.rewardText}>
            {completed}/{total}
          </AppText>
        </View>
      </View>

      <View style={styles.progressRow}>
        {Array.from({length: total}).map((_, index) => {
          const filled = index < completed;

          return (
            <View
              key={index}
              style={[
                styles.circle,
                filled
                  ? styles.circleFilled
                  : styles.circleEmpty,
              ]}>
              {filled && (
                <CheckIcon
                  width={10}
                  height={10}
                />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default StampCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,

    borderRadius: Radius.xl,

    padding: Spacing.lg,

    marginBottom: Spacing.md,

    shadowColor: Colors.neutral600,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.04,
    shadowRadius: 18,
    elevation: 4,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: 64,
    height: 64,

    borderRadius: Radius.round,

    marginRight: Spacing.md,
  },

  info: {
    flex: 1,
  },

  restaurant: {
    fontSize: Typography.body,
    fontFamily: Fonts.interBold,
    color: Colors.neutral900,
    marginBottom: 4,
  },

  subtitle: {
    fontSize: Typography.body,
    fontFamily: Fonts.interRegular,
    color: Colors.neutral700,
  },

  rewardCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rewardText: {
    marginLeft: 6,

    color: Colors.primary600,
    fontFamily: Fonts.interBold,
    fontSize: Typography.body,
  },

  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: Spacing.lg,
  },

  circle: {
    width: 34,
    height: 34,

    borderRadius: Radius.round,

    justifyContent: 'center',
    alignItems: 'center',
  },

  circleFilled: {
    backgroundColor: Colors.primary600,
  },

  circleEmpty: {
    backgroundColor: Colors.neutral200,
  },
});