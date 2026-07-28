import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../component/AppText';
import {Colors, Fonts, Radius, Spacing, Typography} from '../theme';

type PlaceholderScreenProps = {
  title: string;
  description: string;
};

// A lightweight reusable placeholder for screens that are not yet implemented.
// It keeps the structure consistent while leaving room for future UI work.
const PlaceholderScreen = ({title, description}: PlaceholderScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.description}>{description}</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.mainBackground,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    shadowColor: Colors.neutral600,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
  },
  title: {
    fontSize: Typography.h2,
    fontFamily: Fonts.interBold,
    color: Colors.neutral900,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  description: {
    fontSize: Typography.body,
    fontFamily: Fonts.interRegular,
    color: Colors.neutral600,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default PlaceholderScreen;
