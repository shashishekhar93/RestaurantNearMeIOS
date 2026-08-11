// ============================================================
// RESERVATIONS SCREEN
// ============================================================

import React, {useState} from 'react';

import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import MainLayout from '../../component/MainLayout';
import AppText from '../../component/AppText/AppText';

import {
  Colors,
  Fonts,
  Radius,
  Spacing,
  Typography,
} from '../../theme';

// ============================================================
// TYPES
// ============================================================

type ReservationTab =
  | 'All'
  | 'Upcoming'
  | 'Past';

type ReservationStatus =
  | 'CONFIRMED'
  | 'PENDING'
  | 'COMPLETED'
  | 'CANCELLED';

type Reservation = {
  id: string;

  restaurantName: string;

  cuisine: string;

  seating: string;

  date: string;

  time: string;

  guests: number;

  status: ReservationStatus;
};

// ============================================================
// MOCK DATA
// ============================================================

const upcomingReservations: Reservation[] = [
  {
    id: '1',
    restaurantName: 'The Cozy Kitchen',
    cuisine: 'Italian · Café',
    seating: 'Window seat requested',
    date: 'Fri, Jun 13',
    time: '7:30 PM',
    guests: 4,
    status: 'CONFIRMED',
  },
  {
    id: '2',
    restaurantName: 'The Cozy Kitchen',
    cuisine: 'Italian · Café',
    seating: 'Window seat requested',
    date: 'Fri, Jun 13',
    time: '7:30 PM',
    guests: 4,
    status: 'PENDING',
  },
];

const pastReservations: Reservation[] = [
  {
    id: '3',
    restaurantName: 'The Cozy Kitchen',
    cuisine: 'Italian · Café',
    seating: 'Window seat requested',
    date: 'Fri, Jun 13',
    time: '7:30 PM',
    guests: 4,
    status: 'COMPLETED',
  },
  {
    id: '4',
    restaurantName: 'The Cozy Kitchen',
    cuisine: 'Italian · Café',
    seating: 'Window seat requested',
    date: 'Fri, Jun 13',
    time: '7:30 PM',
    guests: 4,
    status: 'CANCELLED',
  },
];

// ============================================================
// SCREEN
// ============================================================

const ReservationsScreen = () => {
  const [selectedTab, setSelectedTab] =
    useState<ReservationTab>('All');

  const showUpcoming =
    selectedTab !== 'Past';

  const showPast =
    selectedTab !== 'Upcoming';

  return (
    <MainLayout>
      <View style={styles.container}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.content
          }>

          {/* ==================================================
              HEADER
          ================================================== */}

          <View
            style={
              styles.headerRow
            }>

            <View
              style={
                styles.headerContent
              }>

              <AppText
                style={
                  styles.title
                }>
                Reservations
              </AppText>

              <AppText
                style={
                  styles.subtitle
                }>
                Your tables, all in one place
              </AppText>

            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              style={
                styles.bookButton
              }>

              <AppText
                style={
                  styles.bookButtonText
                }>
                + Book
              </AppText>

            </TouchableOpacity>

          </View>

          {/* ==================================================
              FILTERS
          ================================================== */}

          <View
            style={
              styles.filterRow
            }>

            {(
              [
                'All',
                'Upcoming',
                'Past',
              ] as ReservationTab[]
            ).map(tab => {

              const active =
                selectedTab === tab;

              return (
                <TouchableOpacity
                  key={tab}
                  activeOpacity={0.85}
                  onPress={() =>
                    setSelectedTab(tab)
                  }
                  style={[
                    styles.filterButton,
                    active &&
                      styles.activeFilterButton,
                  ]}>

                  <AppText
                    style={[
                      styles.filterText,
                      active &&
                        styles.activeFilterText,
                    ]}>
                    {tab}
                  </AppText>

                </TouchableOpacity>
              );
            })}

          </View>

          {/* ==================================================
              ONGOING
          ================================================== */}

          {showUpcoming && (
            <View
              style={
                styles.section
              }>

              <AppText
                style={
                  styles.sectionTitle
                }>
                ONGOING
              </AppText>

              <View
                style={
                  styles.ongoingCard
                }>

                <View
                  style={
                    styles.ongoingTop
                  }>

                  <View
                    style={
                      styles.ongoingImage
                    }>
                    <View
                      style={
                        styles.ongoingImagePlaceholder
                      }
                    />
                  </View>

                  <View
                    style={
                      styles.ongoingInfo
                    }>

                    <AppText
                      style={
                        styles.seatedNow
                      }>
                      SEATED NOW
                    </AppText>

                    <AppText
                      style={
                        styles.ongoingName
                      }>
                      Sakura Bites
                    </AppText>

                    <AppText
                      style={
                        styles.ongoingSubtext
                      }>
                      Table 12 · Seated 20 min ago
                    </AppText>

                  </View>

                </View>

                <View
                  style={
                    styles.ongoingDetails
                  }>

                  <AppText
                    style={
                      styles.ongoingDetailText
                    }>
                    ◷  7:30 PM
                  </AppText>

                  <AppText
                    style={
                      styles.ongoingDetailText
                    }>
                    ♧  2 guests
                  </AppText>

                  <AppText
                    style={
                      styles.ongoingDetailText
                    }>
                    ◉  Dine-in
                  </AppText>

                </View>

                <View
                  style={
                    styles.ongoingActions
                  }>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={
                      styles.menuButton
                    }>

                    <AppText
                      style={
                        styles.menuButtonText
                      }>
                      View menu
                    </AppText>

                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={
                      styles.callButton
                    }>

                    <AppText
                      style={
                        styles.callButtonText
                      }>
                      Call restaurant
                    </AppText>

                  </TouchableOpacity>

                </View>

              </View>

            </View>
          )}

          {/* ==================================================
              UPCOMING
          ================================================== */}

          {showUpcoming &&
            upcomingReservations.length >
              0 && (
              <View
                style={
                  styles.section
                }>

                <AppText
                  style={
                    styles.sectionTitle
                  }>
                  UPCOMING
                </AppText>

                {upcomingReservations.map(
                  reservation => (
                    <ReservationCard
                      key={
                        reservation.id
                      }
                      reservation={
                        reservation
                      }
                    />
                  ),
                )}

              </View>
            )}

          {/* ==================================================
              PAST
          ================================================== */}

          {showPast &&
            pastReservations.length >
              0 && (
              <View
                style={
                  styles.section
                }>

                <AppText
                  style={
                    styles.sectionTitle
                  }>
                  PAST
                </AppText>

                {pastReservations.map(
                  reservation => (
                    <ReservationCard
                      key={
                        reservation.id
                      }
                      reservation={
                        reservation
                      }
                    />
                  ),
                )}

              </View>
            )}

        </ScrollView>

      </View>
    </MainLayout>
  );
};

// ============================================================
// RESERVATION CARD
// ============================================================

type ReservationCardProps = {
  reservation: Reservation;
};

const ReservationCard = ({
  reservation,
}: ReservationCardProps) => {

  const statusColors =
    getStatusColors(
      reservation.status,
    );

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={
        styles.reservationCard
      }>

      <View
        style={
          styles.reservationTop
        }>

        <View
          style={
            styles.restaurantImage
          }>
          <View
            style={
              styles.restaurantImagePlaceholder
            }
          />
        </View>

        <View
          style={
            styles.restaurantContent
          }>

          <View
            style={
              styles.restaurantNameRow
            }>

            <AppText
              numberOfLines={1}
              style={
                styles.restaurantName
              }>
              {reservation.restaurantName}
            </AppText>

            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    statusColors.background,
                },
              ]}>

              <AppText
                style={[
                  styles.statusText,
                  {
                    color:
                      statusColors.text,
                  },
                ]}>
                {reservation.status}
              </AppText>

            </View>

          </View>

          <AppText
            numberOfLines={1}
            style={
              styles.restaurantDetails
            }>
            {reservation.cuisine}
            {' · '}
            {reservation.seating}
          </AppText>

        </View>

        <AppText
          style={
            styles.chevron
          }>
          ›
        </AppText>

      </View>

      <View
        style={
          styles.reservationBottom
        }>

        <AppText
          style={
            styles.reservationInfo
          }>
          □  {reservation.date}
        </AppText>

        <AppText
          style={
            styles.reservationInfo
          }>
          ◷  {reservation.time}
        </AppText>

        <AppText
          style={
            styles.reservationInfo
          }>
          ♧  {reservation.guests} guests
        </AppText>

      </View>

    </TouchableOpacity>
  );
};

// ============================================================
// STATUS COLORS
// ============================================================

const getStatusColors = (
  status: ReservationStatus,
) => {

  switch (status) {

    case 'CONFIRMED':
      return {
        background: '#E8F7EC',
        text: '#20A34A',
      };

    case 'PENDING':
      return {
        background: '#FFF0E7',
        text: '#A95120',
      };

    case 'COMPLETED':
      return {
        background: '#E8E8E8',
        text: '#333333',
      };

    case 'CANCELLED':
      return {
        background: '#FFE8E8',
        text: '#D93636',
      };

    default:
      return {
        background:
          Colors.background300,
        text:
          Colors.neutral700,
      };
  }
};

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,

    backgroundColor:
      Colors.mainBackground,
  },

  content: {
    paddingHorizontal:
      Spacing.md,

    paddingTop:
      Spacing.sm,

    paddingBottom:
      120,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  headerRow: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'space-between',

    marginBottom:
      Spacing.lg,
  },

  headerContent: {
    flex: 1,
  },

  title: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.h1,

    color:
      Colors.neutral900,
  },

  subtitle: {
    marginTop:
      Spacing.xs,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.body,

    color:
      Colors.neutral700,
  },

  bookButton: {
    height: 42,

    paddingHorizontal:
      Spacing.md,

    borderRadius:
      Radius.round,

    backgroundColor:
      Colors.orangePrimary,

    justifyContent:
      'center',

    alignItems:
      'center',

    marginLeft:
      Spacing.sm,
  },

  bookButtonText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.white,
  },

  // ==========================================================
  // FILTERS
  // ==========================================================

  filterRow: {
    flexDirection: 'row',

    marginBottom:
      Spacing.xl,
  },

  filterButton: {
    height: 40,

    paddingHorizontal:
      Spacing.lg,

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

  activeFilterButton: {
    backgroundColor:
      Colors.orangePrimary,
  },

  filterText: {
    fontFamily:
      Fonts.interMedium,

    fontSize:
      Typography.small,

    color:
      Colors.neutral800,
  },

  activeFilterText: {
    color:
      Colors.white,

    fontFamily:
      Fonts.interSemiBold,
  },

  // ==========================================================
  // SECTION
  // ==========================================================

  section: {
    marginBottom:
      Spacing.lg,
  },

  sectionTitle: {
    marginBottom:
      Spacing.md,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.small,

    color:
      Colors.neutral800,

    letterSpacing: 0.5,
  },

  // ==========================================================
  // ONGOING CARD
  // ==========================================================

  ongoingCard: {
    borderRadius:
      Radius.xl,

    backgroundColor:
      '#5A3325',

    padding:
      Spacing.md,
  },

  ongoingTop: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  ongoingImage: {
    width: 64,

    height: 64,

    borderRadius: 32,

    overflow: 'hidden',

    borderWidth: 2,

    borderColor:
      Colors.white,

    marginRight:
      Spacing.sm,
  },

  ongoingImagePlaceholder: {
    flex: 1,

    backgroundColor:
      '#A9623D',
  },

  ongoingInfo: {
    flex: 1,
  },

  seatedNow: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.extraSmall,

    color:
      Colors.white,
  },

  ongoingName: {
    marginTop: 2,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.title,

    color:
      Colors.white,
  },

  ongoingSubtext: {
    marginTop: 2,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    color:
      Colors.white,
  },

  ongoingDetails: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    marginTop:
      Spacing.md,
  },

  ongoingDetailText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.small,

    color:
      Colors.white,
  },

  ongoingActions: {
    flexDirection: 'row',

    marginTop:
      Spacing.md,
  },

  menuButton: {
    flex: 1,

    height: 46,

    borderRadius:
      Radius.round,

    backgroundColor:
      'rgba(255,255,255,0.18)',

    justifyContent:
      'center',

    alignItems:
      'center',

    marginRight:
      Spacing.sm,
  },

  menuButtonText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.small,

    color:
      Colors.white,
  },

  callButton: {
    flex: 1,

    height: 46,

    borderRadius:
      Radius.round,

    backgroundColor:
      Colors.white,

    justifyContent:
      'center',

    alignItems:
      'center',
  },

  callButtonText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.small,

    color:
      Colors.orangePrimary,
  },

  // ==========================================================
  // RESERVATION CARD
  // ==========================================================

  reservationCard: {
    backgroundColor:
      Colors.white,

    borderRadius:
      Radius.xl,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    padding:
      Spacing.md,

    marginBottom:
      Spacing.sm,
  },

  reservationTop: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  restaurantImage: {
    width: 62,

    height: 62,

    borderRadius: 31,

    overflow: 'hidden',

    marginRight:
      Spacing.sm,
  },

  restaurantImagePlaceholder: {
    flex: 1,

    backgroundColor:
      Colors.background300,
  },

  restaurantContent: {
    flex: 1,

    minWidth: 0,
  },

  restaurantNameRow: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  restaurantName: {
    flexShrink: 1,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.body,

    color:
      Colors.neutral900,

    marginRight:
      Spacing.xs,
  },

  restaurantDetails: {
    marginTop: 4,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    color:
      Colors.neutral600,
  },

  statusBadge: {
    paddingHorizontal: 7,

    paddingVertical: 3,

    borderRadius:
      Radius.round,
  },

  statusText: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.extraSmall,
  },

  chevron: {
    fontSize: 28,

    color:
      Colors.neutral700,

    marginLeft:
      Spacing.xs,
  },

  reservationBottom: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'space-between',

    marginTop:
      Spacing.md,
  },

  reservationInfo: {
    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.extraSmall,

    color:
      Colors.neutral800,
  },

});

export default React.memo(
  ReservationsScreen,
);