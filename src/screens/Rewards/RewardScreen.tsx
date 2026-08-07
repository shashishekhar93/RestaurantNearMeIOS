import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import AppScreen from '../../component/AppScreen/AppScreen';
import AppText from '../../component/AppText';

import BackIcon from '../../assets/icons/ic_back.svg';

import {
  vouchers,
  stampRewards,
} from './RewardData';

import VoucherCard from './VoucherCard';
import StampCard from './StampCard';

import {RootStackParamList} from '../../navigation/types';

import {
  Colors,
  Fonts,
  Radius,
  Spacing,
  Typography,
} from '../../theme';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Reward'
>;

const RewardScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <AppScreen
      edges={['top', 'left', 'right']}
      style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* Header */}

        <View style={styles.header}>

          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>

          <AppText style={styles.title}>
            Your Rewards
          </AppText>

        </View>

        {/* ACTIVE VOUCHERS */}

        <AppText style={styles.sectionTitle}>
          ACTIVE VOUCHERS
        </AppText>

        {vouchers.map((voucher, index) => (
          <VoucherCard
            key={voucher.id}
            title={voucher.title}
            code={voucher.code}
            expiry={voucher.expiry}
            highlighted={index === 0}
          />
        ))}

        {/* STAMP CARDS */}

        <AppText
          style={[
            styles.sectionTitle,
            styles.stampSection,
          ]}>
          STAMP CARDS
        </AppText>

        {stampRewards.map(item => (
          <StampCard
            key={item.id}
            image={item.image}
            restaurant={item.restaurant}
            subtitle={item.subtitle}
            completed={item.completed}
            total={item.total}
          />
        ))}
      </ScrollView>
    </AppScreen>
  );
};

export default RewardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },

  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxxxl,
  },

  header: {
    marginBottom: Spacing.xl,
  },

  backButton: {
    width: 40,
    height: 40,

    borderRadius: Radius.rounded,

    backgroundColor: Colors.white,

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: Colors.neutral600,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },

  title: {
    marginTop: Spacing.lg,

    fontSize: Typography.h1,
    fontFamily: Fonts.interBold,

    color: Colors.neutral900,
  },

  sectionTitle: {
    marginBottom: Spacing.md,

    fontSize: Typography.title,
    fontFamily: Fonts.interBold,

    color: Colors.neutral700,
  },

  stampSection: {
    marginTop: Spacing.lg,
  },
});