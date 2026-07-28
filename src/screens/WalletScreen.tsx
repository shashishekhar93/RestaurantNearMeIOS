import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import AppScreen from '../component/AppScreen/AppScreen';
import AppText from '../component/AppText/AppText';
import {Colors, Fonts, Radius, Spacing, Typography} from '../theme';
import BackIcon from '../assets/icons/ic_back.svg';
import RewardIcon from '../assets/icons/ic_reward.svg';
import DownloadIcon from '../assets/icons/ic_download.svg';
import BonusIcon from '../assets/icons/ic_bonus.svg';
import CreditIcon from '../assets/icons/ic_credit.svg';

// A small sample transaction list to mimic the screenshot
const transactions = [
  {id: '1', title: 'Sakura Bites', subtitle: 'Order #NB-2034 · Today · 7:42 PM', amount: '-$18.40', Icon: RewardIcon},
  {id: '2', title: 'Top up', subtitle: 'Visa •• 4242 · Today · 6:10 PM', amount: '+$25.00', Icon: CreditIcon},
  {id: '3', title: 'Cashback reward', subtitle: 'Cozy Kitchen order · Yesterday', amount: '+$2.15', Icon: BonusIcon},
  {id: '4', title: 'Spice Route', subtitle: 'Order #NB-2018 · Mon · 8:24 PM', amount: '-$12.00', Icon: RewardIcon},
  {id: '5', title: 'Welcome bonus', subtitle: 'Promo SUMMER10 · Jun 2', amount: '+$10.00', Icon: BonusIcon},
  {id: '6', title: 'Patisserie Lune', subtitle: 'Order #NB-1992 · May 28', amount: '-$8.50', Icon: RewardIcon},
];

type Props = {
  // Called when user taps back. ParentScreen will hide this screen.
  onBack?: () => void;
  // navigation prop is provided when used inside a Stack.Screen
  navigation?: any;
};

/**
 * WalletScreen
 * This is a full-screen view for wallet related actions.
 * It intentionally does not render the ParentScreen header/footer.
 *
 * Props:
 * - onBack: function called when user presses the back button (top-left).
 */
const WalletScreen = ({onBack, navigation}: Props) => {
  const renderTransaction = ({item}: any) => (
    <View style={styles.txRow}>
      <View style={styles.txLeft}>
        <item.Icon width={20} height={20} stroke={Colors.primary600} fill="none" />
        <View style={{marginLeft: Spacing.sm}}>
          <AppText style={styles.txTitle}>{item.title}</AppText>
          <AppText style={styles.txSubtitle}>{item.subtitle}</AppText>
        </View>
      </View>
      <AppText style={[styles.txAmount, item.amount.startsWith('+') ? styles.positive : styles.negative]}>{item.amount}</AppText>
    </View>
  );

  return (
    <AppScreen
      edges={['top', 'left', 'right']}
      style={styles.container}>
      {/* Top bar with back button */}
      <View style={styles.header}>
  <View style={styles.headerTopRow}>
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.backButton}
      onPress={() => {
        if (onBack) return onBack();
        if (navigation && navigation.goBack) return navigation.goBack();
      }}>
      <BackIcon />
    </TouchableOpacity>
  </View>

  <AppText style={styles.screenTitle}>
    Wallet
  </AppText>
</View>

<ScrollView
  contentContainerStyle={styles.content}
  showsVerticalScrollIndicator={false}>

        {/* Big wallet amount card */}
        <View style={styles.walletCardTop}>
          <AppText style={styles.walletLabel}>WALLET AMOUNT</AppText>
          <AppText style={styles.walletBigAmount}>$64.25</AppText>
        </View>

        {/* Add money CTA */}
        <TouchableOpacity style={styles.addMoneyBtn} activeOpacity={0.9}>
          <AppText style={styles.addMoneyText}>+  Add money to wallet</AppText>
        </TouchableOpacity>

        {/* Transaction history header */}
        <View style={styles.sectionHeader}>
          <AppText style={styles.sectionTitle}>TRANSACTION HISTORY</AppText>
          <TouchableOpacity activeOpacity={0.8}>
            <AppText style={styles.sectionLink}>See all</AppText>
          </TouchableOpacity>
        </View>

        {/* Transactions list */}
        <View style={styles.txListCard}>
          {transactions.map((item, index) => (
            <React.Fragment key={item.id}>
              {renderTransaction({ item })}
              {index !== transactions.length - 1 && (
                <View style={styles.separator} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Download statement CTA */}
        <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.8}>
          <DownloadIcon width={18} height={18} stroke={Colors.neutral900} fill="none" />
          <AppText style={styles.downloadText}>Download statement</AppText>
        </TouchableOpacity>
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.mainBackground},
  header: {
  paddingHorizontal: Spacing.lg,
  marginBottom: Spacing.lg,
},

headerTopRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.round,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.neutral600,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  content: {
  paddingHorizontal: Spacing.lg,
  paddingBottom: Spacing.xxl,
},
  screenTitle: {
  marginTop: Spacing.md,
  fontSize: Typography.h1,
  fontFamily: Fonts.interBold,
  color: Colors.neutral900,
},
  walletCardTop: {
    backgroundColor: Colors.primary600,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  walletLabel: {color: Colors.white, fontSize: Typography.caption, fontFamily: Fonts.interSemiBold},
  walletBigAmount: {color: Colors.white, fontSize: 36, fontFamily: Fonts.interBold, marginTop: Spacing.sm},
  addMoneyBtn: {
    marginTop: Spacing.md,
    backgroundColor: Colors.neutral900,
    borderRadius: Radius.round,
    paddingVertical: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addMoneyText: {color: Colors.white, fontFamily: Fonts.interSemiBold, fontSize: Typography.body},
  sectionHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Spacing.lg, marginBottom: Spacing.sm},
  sectionTitle: {fontSize: Typography.title, fontFamily: Fonts.interBold, color: Colors.neutral900},
  sectionLink: {color: Colors.primary600, fontFamily: Fonts.interSemiBold},
  txListCard: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    shadowColor: Colors.neutral600,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.04,
    shadowRadius: 18,
    elevation: 4,
  },
  txRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing.lg},
  txLeft: {flexDirection: 'row', alignItems: 'center'},
  txTitle: {fontFamily: Fonts.interSemiBold, color: Colors.neutral900},
  txSubtitle: {fontFamily: Fonts.interRegular, color: Colors.neutral600, fontSize: Typography.small},
  txAmount: {fontFamily: Fonts.interSemiBold},
  positive: {color: Colors.success600 || '#2A8A45'},
  negative: {color: Colors.neutral700},
  separator: {height: 1, backgroundColor: Colors.neutral100},
  downloadBtn: {
    marginTop: Spacing.md,
    backgroundColor: Colors.background50 || Colors.backgroundSecondary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadText: {marginLeft: Spacing.sm, fontFamily: Fonts.interRegular, color: Colors.neutral900},
});

export default WalletScreen;
