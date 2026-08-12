import React, {
  useState,
} from 'react';

import {
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  useNavigation,
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

import BackButton
  from '../../assets/icons/ic_back.svg';

  import CallButton from '../../assets/icons/ic_call.svg';
  import MailButton from '../../assets/icons/ic_mail.svg';
  import ExpandIcon from '../../assets/icons/ic_expand.svg';
  import ContractIcon from '../../assets/icons/ic_contract.svg';


// ============================================================
// TYPES
// ============================================================

type FAQItem = {
  id: string;

  question: string;

  answer: string;
};


// ============================================================
// DUMMY FAQ DATA
// ============================================================

const FAQ_DATA: FAQItem[] = [

  {
    id: '1',

    question:
      'How do I make a restaurant reservation?',

    answer:
      'Open the restaurant you want to visit and tap Book a table. Select the number of guests, preferred date and time, seating option, and enter your details to confirm the reservation.',
  },

  {
    id: '2',

    question:
      'Can I change the date or time of my reservation?',

    answer:
      'Yes, if the restaurant allows changes for your reservation. Open your reservation details and select the option to modify the booking. Available dates and times depend on the restaurant.',
  },

  {
    id: '3',

    question:
      'How can I cancel my reservation?',

    answer:
      'Open Reservations, select the booking you want to cancel, and choose Cancel reservation. Any cancellation conditions or applicable charges will be shown before you confirm.',
  },

  {
    id: '4',

    question:
      'What happens if I arrive late for my reservation?',

    answer:
      'Restaurants may hold your table for a limited period after the reservation time. If you expect to be late, we recommend contacting the restaurant directly so they can advise you about availability.',
  },

  {
    id: '5',

    question:
      'Can I request a specific seating area?',

    answer:
      'Yes. During the booking process, you can select from the seating options made available by the restaurant, such as indoor, outdoor patio, or bar seating.',
  },

  {
    id: '6',

    question:
      'How do I find my confirmed reservations?',

    answer:
      'Your confirmed bookings are available under the Reservations section. Select any reservation to view its date, time, guest count, seating preference, and other booking details.',
  },

];


// ============================================================
// SCREEN
// ============================================================

const FAQScreen = () => {

  const navigation =
    useNavigation();

  const insets =
    useSafeAreaInsets();


  // ==========================================================
  // EXPANDED FAQ
  // ==========================================================

  const [
    expandedId,
    setExpandedId,
  ] = useState<string | null>(
    FAQ_DATA[0]?.id ?? null,
  );


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {

    navigation.goBack();

  };


  // ==========================================================
  // FAQ TOGGLE
  // ==========================================================

  const handleFAQPress = (
    id: string,
  ) => {

    setExpandedId(
      current =>
        current === id
          ? null
          : id,
    );

  };


  // ==========================================================
  // MAIL
  // ==========================================================

  const handleMailPress = () => {

    Linking.openURL(
      'mailto:support@restaurantsnearme.com',
    );

  };


  // ==========================================================
  // CALL
  // ==========================================================

  const handleCallPress = () => {

    Linking.openURL(
      'tel:+18001234567',
    );

  };


  // ==========================================================
  // UI
  // ==========================================================

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
            HEADER
        ================================================== */}

        <View
          style={styles.header}>

          {/* BACK */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleBack}
            style={styles.backButton}>

            <BackButton />

          </TouchableOpacity>


          {/* TITLE */}

          <AppText
            style={styles.title}>

            Help & FAQ

          </AppText>

        </View>


        {/* ==================================================
            GET IN TOUCH
        ================================================== */}

        <AppText
          style={styles.sectionTitle}>

          GET IN TOUCH

        </AppText>


        <View
          style={styles.contactRow}>

          {/* MAIL */}

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={
              handleMailPress
            }
            style={styles.contactCard}>

            <MailButton/>

            <AppText
              style={styles.contactLabel}>

              Mail Us

            </AppText>

          </TouchableOpacity>


          {/* CALL */}

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={
              handleCallPress
            }
            style={styles.contactCard}>

            <CallButton/>

            <AppText
              style={styles.contactLabel}>

              Call Us

            </AppText>

          </TouchableOpacity>

        </View>


        {/* ==================================================
            FREQUENTLY ASKED
        ================================================== */}

        <AppText
          style={[
            styles.sectionTitle,
            styles.faqSectionTitle,
          ]}>

          FREQUENTLY ASKED

        </AppText>


        {/* ==================================================
            FAQ LIST
        ================================================== */}

        <View
          style={styles.faqContainer}>

          {FAQ_DATA.map(
            (item, index) => {

              const expanded =
                expandedId ===
                item.id;

              return (
                <View
                  key={item.id}>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      handleFAQPress(
                        item.id,
                      )
                    }
                    style={
                      styles.questionRow
                    }>

                    <AppText
                      numberOfLines={
                        expanded
                          ? undefined
                          : 2
                      }
                      style={
                        styles.question
                      }>

                      {item.question}

                    </AppText>

                    {expanded ? <ExpandIcon/> : <ContractIcon/>}

                  </TouchableOpacity>

                  {expanded && (

                    <View
                      style={
                        styles.answerContainer
                      }>

                      <AppText
                        style={
                          styles.answer
                        }>

                        {item.answer}

                      </AppText>

                    </View>

                  )}


                  {index <
                    FAQ_DATA.length - 1 && (
                    <View
                      style={
                        styles.separator
                      }
                    />
                  )}

                </View>
              );
            },
          )}

        </View>

      </ScrollView>

    </View>
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
      Spacing.sm,
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    width: '100%',

    alignItems:
      'flex-start',

    paddingBottom:
      Spacing.xl,
  },


  // ==========================================================
  // BACK BUTTON
  // ==========================================================

  backButton: {
    width: 48,

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


  // ==========================================================
  // TITLE
  // ==========================================================

  title: {
    marginTop:
      Spacing.lg,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.h2,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // SECTION TITLE
  // ==========================================================

  sectionTitle: {
    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.neutral700,

    letterSpacing: 0.3,
  },


  // ==========================================================
  // CONTACT ROW
  // ==========================================================

  contactRow: {
    flexDirection:
      'row',

    gap:
      Spacing.md,

    marginTop:
      Spacing.lg,
  },


  // ==========================================================
  // CONTACT CARD
  // ==========================================================

  contactCard: {
    flex: 1,

    minHeight: 128,

    paddingVertical:
      Spacing.lg,

    paddingHorizontal:
      Spacing.sm,

    borderRadius:
      Radius.xl,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    backgroundColor:
      Colors.white,

    alignItems:
      'center',

    justifyContent:
      'center',
  },


  // ==========================================================
  // CONTACT ICON
  // ==========================================================

  contactIcon: {
    fontFamily:
      Fonts.interRegular,

    fontSize:
      32,

    lineHeight: 36,

    color:
      Colors.orangePrimary,
  },


  // ==========================================================
  // CONTACT LABEL
  // ==========================================================

  contactLabel: {
    marginTop:
      Spacing.sm,

    fontFamily:
      Fonts.interSemiBold,

    fontSize:
      Typography.body,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // FAQ SECTION TITLE
  // ==========================================================

  faqSectionTitle: {
    marginTop:
      Spacing.xl,
  },


  // ==========================================================
  // FAQ CONTAINER
  // ==========================================================

  faqContainer: {
    marginTop:
      Spacing.lg,

      marginBottom: Spacing.xxl,

    overflow:
      'hidden',

    borderRadius:
      Radius.xl,

    borderWidth: 1,

    borderColor:
      Colors.background500,

    backgroundColor:
      Colors.white,
  },


  // ==========================================================
  // QUESTION ROW
  // ==========================================================

  questionRow: {
    flexDirection:
      'row',

    alignItems:
      'center',

    paddingHorizontal:
      Spacing.md,

    paddingVertical:
      Spacing.md,
  },


  // ==========================================================
  // QUESTION
  // ==========================================================

  question: {
    flex: 1,

    paddingRight:
      Spacing.sm,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.body,

    lineHeight: 22,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // CHEVRON
  // ==========================================================

  chevron: {
    fontFamily:
      Fonts.interBold,

    fontSize: 22,

    lineHeight: 22,

    color:
      Colors.neutral700,
  },


  // ==========================================================
  // ANSWER
  // ==========================================================

  answerContainer: {
    paddingHorizontal:
      Spacing.md,

    paddingBottom:
      Spacing.md,
  },


  answer: {
    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    lineHeight: 21,

    color:
      Colors.neutral600,
  },


  // ==========================================================
  // SEPARATOR
  // ==========================================================

  separator: {
    height: 1,

    backgroundColor:
      Colors.background500,
  },

});


export default React.memo(
  FAQScreen,
);