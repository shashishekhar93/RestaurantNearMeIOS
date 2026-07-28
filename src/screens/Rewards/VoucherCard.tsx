import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import AppText from '../../component/AppText/AppText';

import VoucherIcon from '../../assets/icons/ic_voucher.svg';

import {
  Colors,
  Fonts,
  Radius,
  Spacing,
  Typography,
} from '../../theme';

type Props = {
  title: string;
  code: string;
  expiry: string;
  highlighted?: boolean;
  onPress?: () => void;
};

const VoucherCard = ({
  title,
  code,
  expiry,
  highlighted = false,
  onPress,
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        highlighted && styles.highlightedContainer,
      ]}>
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <VoucherIcon />
        </View>

        <View style={styles.content}>
          <AppText style={styles.title}>
            {title}
          </AppText>

          <AppText style={styles.subtitle}>
            <AppText style={styles.code}>
              Code {code}
            </AppText>
            {' • '}
            {expiry}
          </AppText>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.useButton}
        onPress={onPress}>
        <AppText style={styles.useText}>
          Use
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default VoucherCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: Spacing.lg,

    borderRadius: Radius.xl,

    borderWidth: 1,
    borderColor: Colors.neutral200,

    backgroundColor: Colors.white,

    marginBottom: Spacing.md,
  },

  highlightedContainer: {
    backgroundColor: Colors.primary50,
    borderColor: Colors.primary200,
    borderStyle: 'dashed',
  },

  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: Radius.round,

    backgroundColor: Colors.white,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: Spacing.md,
  },

  content: {
    flex: 1,
  },

  title: {
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

  code: {
    fontFamily: Fonts.interBold,
    color: Colors.neutral900,
  },

  useButton: {
    marginLeft: Spacing.md,

    backgroundColor: Colors.neutral900,

    borderRadius: Radius.round,

    width: 72,
    height: 48,

    justifyContent: 'center',
    alignItems: 'center',
  },

  useText: {
    color: Colors.white,
    fontSize: Typography.body,
    fontFamily: Fonts.interBold,
  },
});