import React from 'react';
import {StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';
import AppText from '../component/AppText/AppText';
import {Colors, Fonts, Radius, Spacing, Typography} from '../theme';
import AccountIcon from '../assets/icons/ic_account.svg';
import AddressesIcon from '../assets/icons/ic_addresses.svg';
import HelpAndFaq from '../assets/icons/ic_faq.svg';
import ArrowForward from '../assets/icons/ic_arrow_forward.svg';
import WalletIcon from '../assets/icons/ic_wallet.svg';
import PersonalInfoIcon from '../assets/icons/ic_personalinfo.svg';

const rewards = [
  {
    title: 'Cozy Kitchen',
    completed: 5,
    total: 8,
    caption: '3 more for a free coffee',
  },
  {
    title: 'Sakura Bites',
    completed: 2,
    total: 8,
    caption: '6 more for a free dessert',
  },
];

const accountItems = [
  {label: 'Personal Information', Icon: PersonalInfoIcon},
  {label: 'Saved Addresses', Icon: AddressesIcon},
  {label: 'Help & FAQ', Icon: HelpAndFaq},
];

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Screen title inside the content area */}
        <AppText style={styles.screenTitle}>Accounts</AppText>

        {/* Profile card with initials, name, number, and action button */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <AppText style={styles.avatarText}>SS</AppText>
          </View>
          <AppText style={styles.profileName}>Smita Singhal</AppText>
          <AppText style={styles.profilePhone}>+91 8787878787</AppText>
          <TouchableOpacity style={styles.updateButton} activeOpacity={0.8}>
            <AppText style={styles.updateButtonText}>Update</AppText>
          </TouchableOpacity>
        </View>

        {/* Rewards block with two cards */}
        <View style={styles.sectionHeader}>
          <AppText style={styles.sectionTitle}>Your Rewards</AppText>
          <TouchableOpacity activeOpacity={0.8}>
            <AppText style={styles.viewAllText}>View All</AppText>
          </TouchableOpacity>
        </View>

        {rewards.map(reward => (
          <View key={reward.title} style={styles.rewardCard}>
            <AppText style={styles.rewardTitle}>{reward.title}</AppText>
            <View style={styles.rewardProgressRow}>
              {Array.from({length: reward.total}).map((_, index) => {
                const filled = index < reward.completed;
                return (
                  <View
                    key={`${reward.title}-${index}`}
                    style={[
                      styles.rewardDot,
                      filled ? styles.rewardDotFilled : styles.rewardDotEmpty,
                    ]}
                  />
                );
              })}
            </View>
            <AppText style={styles.rewardCaption}>{reward.caption}</AppText>
          </View>
        ))}

        {/* Wallet card with balance and action link */}
        <View style={styles.walletCard}>
          <View style={styles.walletLabelRow}>
            <View style={styles.walletIconPlaceholder}>
              <WalletIcon width={24} height={24} stroke={Colors.primary600} fill="none" />
            </View>
            <AppText style={styles.walletLabel}>Wallet</AppText>
          </View>
          <View style={styles.walletAmountRow}>
            <AppText style={styles.walletAmount}>₹24.50</AppText>
            <TouchableOpacity activeOpacity={0.8}>
              <AppText style={styles.addMoneyText}>Add Money</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* List of account action rows */}
        <View style={styles.listContainer}>
            {accountItems.map((item, index) => (
                <TouchableOpacity
                key={item.label}
                style={[
                    styles.listItem,
                    index === accountItems.length - 1 && styles.lastListItem,
                ]}
                activeOpacity={0.8}>
                <View style={styles.listItemLeft}>
                    <item.Icon
                    width={24}
                    height={24}
                    stroke={Colors.neutral700}
                    fill="none"
                    />
                    <AppText style={styles.listItemText}>
                    {item.label}
                    </AppText>
                </View>

                <ArrowForward />
                </TouchableOpacity>
            ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
          <AppText style={styles.logoutText}>Log Out</AppText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  screenTitle: {
    fontSize: Typography.h1,
    fontFamily: Fonts.interBold,
    color: Colors.neutral900,
    marginBottom: Spacing.lg,
  },
  profileCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    shadowColor: Colors.neutral600,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 6,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: Radius.round,
    backgroundColor: Colors.primary50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  avatarText: {
    color: Colors.primary600,
    fontSize: Typography.h2,
    fontFamily: Fonts.interBold,
  },
  profileName: {
    fontSize: Typography.title,
    color: Colors.neutral900,
    fontFamily: Fonts.interBold,
    marginBottom: Spacing.xs,
  },
  profilePhone: {
    fontSize: Typography.body,
    color: Colors.neutral600,
    fontFamily: Fonts.interRegular,
    marginBottom: Spacing.md,
  },
  updateButton: {
    width: '100%',
    backgroundColor: Colors.primary600,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButtonText: {
    color: Colors.white,
    fontFamily: Fonts.interSemiBold,
    fontSize: Typography.body,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.title,
    fontFamily: Fonts.interBold,
    color: Colors.neutral900,
  },
  viewAllText: {
    fontSize: Typography.caption,
    fontFamily: Fonts.interSemiBold,
    color: Colors.primary600,
  },
  rewardCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    shadowColor: Colors.neutral600,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.04,
    shadowRadius: 18,
    elevation: 4,
  },
  rewardTitle: {
    fontSize: Typography.body,
    fontFamily: Fonts.interSemiBold,
    color: Colors.neutral900,
    marginBottom: Spacing.sm,
  },
  rewardProgressRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  rewardDot: {
    width: 20,
    height: 20,
    borderRadius: Radius.round,
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  rewardDotFilled: {
    backgroundColor: Colors.primary600,
  },
  rewardDotEmpty: {
    backgroundColor: Colors.neutral200,
  },
  rewardCaption: {
    fontSize: Typography.caption,
    fontFamily: Fonts.interRegular,
    color: Colors.neutral600,
  },
  walletCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    shadowColor: Colors.neutral600,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.04,
    shadowRadius: 18,
    elevation: 4,
  },
  walletLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  walletIconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: Radius.rounded,
    backgroundColor: Colors.primary50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  walletLabel: {
    fontSize: Typography.body,
    fontFamily: Fonts.interSemiBold,
    color: Colors.neutral900,
  },
  walletAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletAmount: {
    fontSize: Typography.h2,
    fontFamily: Fonts.interBold,
    color: Colors.neutral900,
  },
  addMoneyText: {
    fontSize: Typography.body,
    fontFamily: Fonts.interSemiBold,
    color: Colors.primary600,
  },
  listContainer: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.sm,
    shadowColor: Colors.neutral600,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.04,
    shadowRadius: 18,
    elevation: 4,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral100,
  },
  lastListItem: {
  borderBottomWidth: 0,
},
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    marginLeft: Spacing.sm,
    fontSize: Typography.body,
    fontFamily: Fonts.interRegular,
    color: Colors.neutral700,
  },
  listItemArrow: {
    fontSize: Typography.caption,
    fontFamily: Fonts.interBold,
    color: Colors.neutral400,
  },
  logoutButton: {
    alignSelf: 'center',
    marginTop: Spacing.md,
  },
  logoutText: {
    color: Colors.primary600,
    fontSize: Typography.body,
    fontFamily: Fonts.interSemiBold,
  },
});

export default AccountScreen;
