import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
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

import SearchIcon from '../../assets/icons/ic_search.svg';
import RecordLightIcon from '../../assets/icons/ic_record_light.svg';
import RecordDarkIcon from '../../assets/icons/ic_record_dark.svg';

const filters = [
  'All',
  'Nearby',
  'Open Now',
  'Breakfast',
  'Lunch',
];

const HomeHeader = () => {
  return (
    <View style={styles.container}>

      {/* =====================================
          TITLE
      ===================================== */}
      <View style={styles.titleContainer}>
        <AppText style={styles.title}>
          Hungry?
        </AppText>

        <AppText style={styles.title}>
          Order & Eat.
        </AppText>

        <AppText style={styles.subtitle}>
          Warm plates within a short walk.
        </AppText>
      </View>

      {/* =====================================
          SEARCH
      ===================================== */}
      <View style={styles.searchRow}>

        <View style={styles.searchContainer}>

          <SearchIcon
            width={24}
            height={24}
            color={Colors.neutral500}
          />

          <TextInput
            placeholder="Search restaurants..."
            placeholderTextColor={Colors.neutral400}
            style={styles.searchInput}
            returnKeyType="search"
          />

        </View>

        {/* MICROPHONE */}
        <TouchableOpacity
          activeOpacity={0.8}>

          <RecordLightIcon
            width={56}
            height={56}
          />

        </TouchableOpacity>

      </View>

      {/* =====================================
          FILTERS
      ===================================== */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterWrapper}>

        {filters.map((filter, index) => (
            <TouchableOpacity
            key={filter}
            activeOpacity={0.8}
            style={[
                styles.filterChip,
                index === 0 &&
                styles.activeFilterChip,
            ]}>

            <AppText
                style={[
                styles.filterText,
                index === 0 &&
                    styles.activeFilterText,
                ]}>
                {filter}
            </AppText>

            </TouchableOpacity>
        ))}

        </ScrollView>

    </View>
  );
};

export default React.memo(HomeHeader);

const styles = StyleSheet.create({

  // =========================================
  // MAIN HEADER
  // =========================================

  container: {
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },

  // =========================================
  // TITLE
  // =========================================

  titleContainer: {
    marginBottom: Spacing.lg,
  },

  title: {
    fontFamily: Fonts.interBold,
    fontSize: 34,
    lineHeight: 38,
    color: Colors.neutral900,
  },

  subtitle: {
    marginTop: Spacing.sm,

    fontFamily: Fonts.interRegular,
    fontSize: Typography.body,

    color: Colors.neutral600,
  },

  // =========================================
  // SEARCH ROW
  // =========================================

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: Spacing.lg,
  },

  // =========================================
  // SEARCH BOX
  // =========================================

  searchContainer: {
    flex: 1,

    height: 56,

    flexDirection: 'row',
    alignItems: 'center',

    marginRight: Spacing.sm,
    paddingHorizontal: Spacing.md,

    backgroundColor:
      Colors.background300,

    borderRadius: Radius.xl,
  },

  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    paddingVertical: 0,
    fontFamily: Fonts.interRegular,
    fontSize: Typography.body,
    color: Colors.neutral800,
  },



  // =========================================
  // FILTERS
  // =========================================

  filterWrapper: {
    flexDirection: 'row',
  },

  filterChip: {
    height: 48,

    paddingHorizontal: 26,

    borderRadius: 24,

    backgroundColor:
      Colors.background300,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: Spacing.sm,
  },

  activeFilterChip: {
    backgroundColor:
      Colors.orangePrimary,
  },

  filterText: {
    fontFamily: Fonts.interMedium,
    fontSize: Typography.body,

    color: Colors.neutral600,
  },

  activeFilterText: {
    color: Colors.white,
    fontFamily: Fonts.interSemiBold,
  },
});