import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AppText from '../AppText';

import BackIcon from '../../assets/icons/ic_back.svg';
import {Colors, Fonts, Radius, Spacing, Typography} from '../../theme';

type Props = {
  title: string;
  rightText?: string;
  onRightPress?: () => void;
  hideBack?: boolean;
  titleTopSpacing?: number;
  bottomSpacing?: number;
};

const ScreenHeader = ({
  title,
  rightText,
  onRightPress,
  hideBack = false,
  titleTopSpacing = Spacing.lg,
  bottomSpacing = Spacing.lg,
}: Props) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, {marginBottom: bottomSpacing}]}>
      <View style={styles.topRow}>
        {!hideBack ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        {rightText ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onRightPress}>
            <AppText style={styles.rightText}>
              {rightText}
            </AppText>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      <AppText
        style={[
            styles.title,
            {marginTop: titleTopSpacing},
        ]}>
      </AppText>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  backButton: {
    width: 48,
    height: 48,
    borderRadius: Radius.round,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: Colors.neutral600,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },

  placeholder: {
    width: 48,
  },

  title: {
    marginTop: Spacing.lg,
    fontSize: Typography.h1,
    fontFamily: Fonts.interBold,
    color: Colors.neutral900,
  },

  rightText: {
    color: Colors.primary600,
    fontFamily: Fonts.interSemiBold,
    fontSize: Typography.caption,
  },
});