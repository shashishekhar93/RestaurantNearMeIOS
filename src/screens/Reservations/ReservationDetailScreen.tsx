import React from 'react';

import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import AppText
  from '../../component/AppText/AppText';

import {
  Colors,
  Fonts,
  Radius,
  Spacing,
  Typography,
} from '../../theme';

import PolicyIcon from '../../assets/icons/ic_policy.svg'
import BackIcon from '../../assets/icons/ic_back.svg'
import ShareIcon from '../../assets/icons/ic_share.svg'
import GuestIcon from '../../assets/icons/ic_guests.svg'
import ClockIcon from '../../assets/icons/ic_clock.svg'
import HomeIcon from '../../assets/icons/ic_home.svg'
import CalendarIcon from '../../assets/icons/ic_calendar.svg'
import StarIcon from '../../assets/icons/ic_star.svg'



// ============================================================
// RESERVATION TYPE
// ============================================================

type Reservation = {
  id: string;

  restaurantName: string;

  cuisine: string;

  seating: string;

  date: string;

  time: string;

  guests: number;

  status:
    | 'CONFIRMED'
    | 'PENDING'
    | 'COMPLETED'
    | 'CANCELLED';
};


// ============================================================
// SCREEN
// ============================================================

const ReservationDetailScreen = () => {

  const navigation =
    useNavigation();

  const route =
    useRoute();

  const insets =
    useSafeAreaInsets();


  const {
    reservation,
  } = route.params as {
    reservation: Reservation;
  };


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // SHARE
  // ==========================================================

  const handleShare = () => {

    // TODO:
    // Native share functionality can be added later.

  };


  return (
    <View
      style={[
        styles.screen,
        {
          paddingTop:
            insets.top,
        },
      ]}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom:
              insets.bottom +
              Spacing.xl,
          },
        ]}>

        {/* ==================================================
            TOP ROW
        ================================================== */}

        <View
          style={styles.topRow}>

          {/* BACK */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleBack}
            style={styles.backButton}>

            <BackIcon/>

          </TouchableOpacity>


          {/* SHARE */}

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleShare}
            style={styles.shareButton}>

            <ShareIcon/>

            <AppText
              style={styles.shareText}>
              Share
            </AppText>

          </TouchableOpacity>

        </View>


        {/* ==================================================
            TITLE
        ================================================== */}

        <AppText
          style={styles.title}>

          Reservations Details

        </AppText>


        {/* ==================================================
            RESTAURANT CARD
        ================================================== */}

        <View
          style={styles.restaurantCard}>

          <View
            style={styles.restaurantTop}>

            {/* IMAGE */}

            <View
              style={styles.restaurantImage}>

              <View
                style={
                  styles.restaurantImagePlaceholder
                }
              />

            </View>


            {/* INFORMATION */}

            <View
              style={styles.restaurantInfo}>

              <AppText
                numberOfLines={1}
                style={
                  styles.restaurantName
                }>

                {
                  reservation.restaurantName
                }

              </AppText>


              <AppText
                numberOfLines={1}
                style={
                  styles.restaurantDetails
                }>

                {
                  reservation.cuisine
                }

                {' · 0.3 km'}

              </AppText>

            </View>


            {/* RATING */}

            <View
              style={styles.ratingBadge}>

              <StarIcon/>

              <AppText
                style={styles.ratingText}>

                4.8

              </AppText>

            </View>

          </View>


          {/* ACTIONS */}

          <View
            style={styles.restaurantActions}>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.menuButton}>

              <AppText
                style={
                  styles.menuButtonText
                }>

                View menu

              </AppText>

            </TouchableOpacity>


            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.callButton}>

              <AppText
                style={
                  styles.callButtonText
                }>

                Call restaurant

              </AppText>

            </TouchableOpacity>

          </View>

        </View>


        {/* ==================================================
            BOOKING DETAILS TITLE
        ================================================== */}

        <AppText
          style={styles.sectionTitle}>

          Booking Details

        </AppText>


        {/* ==================================================
            BOOKING DETAILS CARD
        ================================================== */}

        <View
          style={styles.detailsCard}>

          {/* DATE */}

          <DetailRow
            icon={<CalendarIcon color={Colors.neutral900} />}
            label="DATE"
            value={
              formatDate(
                reservation.date,
              )
            }
          />


          {/* TIME */}

          <DetailRow
            icon={<ClockIcon color={Colors.neutral900}/>}
            label="TIME"
            value={
              reservation.time
            }
          />


          {/* GUESTS */}

          <DetailRow
            icon={<GuestIcon color={Colors.neutral900}/>}
            label="GUESTS"
            value={
              `${reservation.guests} ${
                reservation.guests === 1
                  ? 'guest'
                  : 'guests'
              }`
            }
          />


          {/* SEATING */}

          <DetailRow
            icon={<HomeIcon color={Colors.neutral900}/>}
            label="SEATING"
            value={
              reservation.seating
            }
            last
          />

        </View>


        {/* ==================================================
            CONTACT
        ================================================== */}

        <View
          style={styles.contactCard}>

          <AppText
            style={styles.contactLabel}>

            CONTACT

          </AppText>


          <AppText
            style={styles.contactName}>

            Smitha James

          </AppText>


          <AppText
            style={styles.contactPhone}>

            +91 892934020

          </AppText>

        </View>


        {/* ==================================================
            CANCELLATION POLICY
        ================================================== */}

        <View
          style={styles.policyCard}>

          <PolicyIcon/>


          <AppText
            style={styles.policyText}>

            Free cancellation up to 2 hours
            before. No-shows may be charged
            a $10 fee per guest.

          </AppText>

        </View>

      </ScrollView>

    </View>
  );
};


// ============================================================
// DETAIL ROW
// ============================================================

type DetailRowProps = {
  icon: React.ReactNode;

  label: string;

  value: string;

  last?: boolean;
};


const DetailRow = ({
  icon,
  label,
  value,
  last = false,
}: DetailRowProps) => {

  return (
    <View
      style={[
        styles.detailRow,
        !last &&
          styles.detailRowBorder,
      ]}>

    <View
        style={styles.detailIcon}>

        {icon}

    </View>


      <View
        style={styles.detailContent}>

        <AppText
          style={styles.detailLabel}>

          {label}

        </AppText>


        <AppText
          style={styles.detailValue}>

          {value}

        </AppText>

      </View>

    </View>
  );
};


// ============================================================
// DATE FORMATTER
// ============================================================

const formatDate = (
  date: string,
): string => {

  // Existing mock data is:
  // "Fri, Jun 13"

  // We keep the existing value if it
  // cannot be converted into a Date.

  const parsed =
    new Date(date);


  if (
    Number.isNaN(
      parsed.getTime(),
    )
  ) {
    return date;
  }


  return parsed.toLocaleDateString(
    'en-US',
    {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    },
  );
};


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // SCREEN
  // ==========================================================

  screen: {
    flex: 1,

    backgroundColor:
      Colors.mainBackground,
  },


  // ==========================================================
  // CONTENT
  // ==========================================================

  content: {
    paddingHorizontal:
      Spacing.md,

    paddingTop:
      Spacing.md,
  },


  // ==========================================================
  // TOP ROW
  // ==========================================================

  topRow: {
    width: '100%',

    flexDirection:
      'row',

    alignItems:
      'center',

    justifyContent:
      'space-between',
  },


  // ==========================================================
  // BACK
  // ==========================================================

  backButton: {
    width: 52,

    aspectRatio: 1,

    borderRadius:
      Radius.round,

    backgroundColor:
      Colors.background300,

    justifyContent:
      'center',

    alignItems:
      'center',
  },


  backIcon: {
    fontFamily:
      Fonts.interRegular,

    fontSize: 30,

    lineHeight: 30,

    color:
      Colors.neutral900,

    marginTop: -3,
  },


  // ==========================================================
  // SHARE
  // ==========================================================

  shareButton: {
    minWidth: 150,

    paddingHorizontal:
      Spacing.md,

    paddingVertical:
      Spacing.sm,

    borderRadius:
      Radius.round,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    backgroundColor:
      Colors.white,

    flexDirection:
      'row',

    alignItems:
      'center',

    justifyContent:
      'center',

    gap:
      Spacing.xs,
  },


  shareIcon: {
    fontSize: 20,

    color:
      Colors.orangePrimary,
  },


  shareText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // TITLE
  // ==========================================================

  title: {
    marginTop:
      Spacing.lg,

    marginBottom:
      Spacing.xl,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.h1,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // RESTAURANT CARD
  // ==========================================================

  restaurantCard: {
    width: '100%',

    padding:
      Spacing.md,

    borderRadius:
      Radius.xl,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    backgroundColor:
      Colors.white,
  },


  restaurantTop: {
    flexDirection:
      'row',

    alignItems:
      'center',
  },


  restaurantImage: {
    width: 76,

    aspectRatio: 1,

    borderRadius: 38,

    overflow:
      'hidden',

    marginRight:
      Spacing.sm,
  },


  restaurantImagePlaceholder: {
    flex: 1,

    backgroundColor:
      Colors.background300,
  },


  restaurantInfo: {
    flex: 1,

    minWidth: 0,
  },


  restaurantName: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.body,

    color:
      Colors.neutral900,
  },


  restaurantDetails: {
    marginTop: 3,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    color:
      Colors.neutral700,
  },


  // ==========================================================
  // RATING
  // ==========================================================

  ratingBadge: {
    flexDirection:
      'row',

    alignItems:
      'center',

    paddingHorizontal:
      Spacing.sm,

    paddingVertical:
      Spacing.xs,

    borderRadius:
      Radius.round,

    backgroundColor:
      Colors.background100,
  },


  ratingText: {
    marginLeft:Spacing.xs,
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.small,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // RESTAURANT ACTIONS
  // ==========================================================

  restaurantActions: {
    flexDirection:
      'row',

    marginTop:
      Spacing.md,

    gap:
      Spacing.sm,
  },


  menuButton: {
    flex: 1,

    minHeight: 52,

    borderRadius:
      Radius.xl,

    backgroundColor:
      '#FFF1EA',

    justifyContent:
      'center',

    alignItems:
      'center',
  },


  menuButtonText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      '#C65B2A',
  },


  callButton: {
    flex: 1,

    minHeight: 52,

    borderRadius:
      Radius.xl,

    backgroundColor:
      Colors.orangePrimary,

    justifyContent:
      'center',

    alignItems:
      'center',
  },


  callButtonText: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.white,
  },


  // ==========================================================
  // SECTION TITLE
  // ==========================================================

  sectionTitle: {
    marginTop:
      Spacing.xl,

    marginBottom:
      Spacing.md,

    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.h3,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // DETAILS CARD
  // ==========================================================

  detailsCard: {
    width: '100%',

    borderRadius:
      Radius.xl,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    backgroundColor:
      Colors.white,

    overflow:
      'hidden',
  },


  detailRow: {
    flexDirection:
      'row',

    alignItems:
      'center',

    paddingHorizontal:
      Spacing.md,

    paddingVertical:
      Spacing.md,
  },


  detailRowBorder: {
    borderBottomWidth: 1,

    borderBottomColor:
      Colors.background500,
  },


  detailIcon: {
    width: 48,

    aspectRatio: 1,

    borderRadius: 24,

    backgroundColor:
      Colors.background300,

    justifyContent:
      'center',

    alignItems:
      'center',

    marginRight:
      Spacing.md,
  },


  detailIconText: {
    fontSize: 21,

    color:
      Colors.neutral900,
  },


  detailContent: {
    flex: 1,

    minWidth: 0,
  },


  detailLabel: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.small,

    color:
      Colors.neutral600,

    letterSpacing:
      0.3,
  },


  detailValue: {
    marginTop: 3,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.body,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // CONTACT
  // ==========================================================

  contactCard: {
    width: '100%',

    marginTop:
      Spacing.lg,

    padding:
      Spacing.lg,

    borderRadius:
      Radius.xl,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    backgroundColor:
      Colors.white,
  },


  contactLabel: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.small,

    color:
      Colors.neutral600,

    letterSpacing:
      0.3,
  },


  contactName: {
    marginTop:
      Spacing.sm,

    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.neutral900,
  },


  contactPhone: {
    marginTop:
      Spacing.xs,

    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // POLICY
  // ==========================================================

  policyCard: {
    width: '100%',

    marginTop:
      Spacing.lg,

    padding:
      Spacing.md,

    borderRadius:
      Radius.xl,

    backgroundColor:
      Colors.primary50,

    flexDirection:
      'row',

    alignItems:
      'flex-start',
  },


  policyIcon: {
    fontSize: 20,

    color:
      Colors.orangePrimary,

    marginRight:
      Spacing.sm,
  },


  policyText: {
    flex: 1,
    marginStart:Spacing.sm,
    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    color:
      Colors.neutral800,
  },

});


export default React.memo(
  ReservationDetailScreen,
);