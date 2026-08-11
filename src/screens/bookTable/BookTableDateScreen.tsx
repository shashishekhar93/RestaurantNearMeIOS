import React, {
  useMemo,
  useState,
} from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import type {
  ReservationStackParamList,
} from '../../navigation/types';

import BookingHeader
  from './BookingHeader';

import BookingRestaurantCard
  from './BookingRestaurantCard';

import DateSelector, {
  BookingDate,
} from './DateSelector';

import TimeSelector, {
  BookingTime,
} from './TimeSelector';

import BookingBottomBar
  from './BookingBottomBar';

import AppText
  from '../../component/AppText/AppText';

import {
  Colors,
  Fonts,
  Spacing,
  Typography,
} from '../../theme';


// ============================================================
// NAVIGATION
// ============================================================

type NavigationProp =
  NativeStackNavigationProp<
    ReservationStackParamList,
    'BookTableDate'
  >;


// ============================================================
// ROUTE
// ============================================================

type RouteParams = {
  guests?: number;
};


// ============================================================
// SCREEN
// ============================================================

const BookTableDateScreen = () => {

  const navigation =
    useNavigation<NavigationProp>();

  const route =
    useRoute();

  const {
    guests = 2,
  } =
    route.params as RouteParams;


  // ==========================================================
  // DATES
  // ==========================================================

  const dates =
    useMemo<BookingDate[]>(() => {

      const result: BookingDate[] = [];

      const today =
        new Date();

      for (
        let index = 0;
        index < 14;
        index++
      ) {

        const date =
          new Date(today);

        date.setDate(
          today.getDate() + index,
        );

        const value =
          date
            .toISOString()
            .split('T')[0];

        const day =
          date.toLocaleDateString(
            'en-US',
            {
              weekday: 'short',
            },
          );

        const dateNumber =
          date.getDate().toString();

        const month =
          date.toLocaleDateString(
            'en-US',
            {
              month: 'short',
            },
          );

        result.push({
          value,
          day,
          date: dateNumber,
          month,
        });
      }

      return result;

    }, []);


  // ==========================================================
  // SELECTED DATE
  // ==========================================================

  const [
    selectedDate,
    setSelectedDate,
  ] = useState<string>(
    dates[0]?.value,
  );


  // ==========================================================
  // TIMES
  // ==========================================================

  const times =
    useMemo<BookingTime[]>(
      () => [
        {
          value: '11:30',
          label: '11:30 AM',
        },
        {
          value: '12:00',
          label: '12:00 PM',
        },
        {
          value: '12:30',
          label: '12:30 PM',
        },
        {
          value: '1:00',
          label: '1:00 PM',
        },
        {
          value: '1:30',
          label: '1:30 PM',
        },
        {
          value: '2:00',
          label: '2:00 PM',
        },
        {
          value: '6:30',
          label: '6:30 PM',
        },
        {
          value: '7:00',
          label: '7:00 PM',
        },
        {
          value: '7:30',
          label: '7:30 PM',
        },
        {
          value: '8:00',
          label: '8:00 PM',
        },
        {
          value: '8:30',
          label: '8:30 PM',
        },
        {
          value: '9:00',
          label: '9:00 PM',
        },
      ],
      [],
    );


  // ==========================================================
  // SELECTED TIME
  // ==========================================================

  const [
    selectedTime,
    setSelectedTime,
  ] = useState<string>();


  // ==========================================================
  // CONTINUE
  // ==========================================================

  const handleContinue = () => {

    if (
      !selectedDate ||
      !selectedTime
    ) {
      return;
    }

    navigation.navigate(
      'BookTableSeating',
      {
        guests,
        date: selectedDate,
        time: selectedTime,
      },
    );
  };


  // ==========================================================
  // BACK
  // ==========================================================

  const handleBack = () => {
    navigation.goBack();
  };


  return (
    <View style={styles.screen}>

      {/* ======================================================
          HEADER
      ====================================================== */}

      <BookingHeader
        restaurantName="The Cozy Kitchen"
        restaurantSubtitle="Italian · Café"
        currentStep={2}
        totalSteps={5}
        onBack={handleBack}
      />


      {/* ======================================================
          CONTENT
      ====================================================== */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }>

        {/* ====================================================
            RESTAURANT
        ==================================================== */}

        <BookingRestaurantCard
          restaurantName="The Cozy Kitchen"
          cuisine="Italian · Café"
          distance="0.3 km"
          rating={4.8}
        />


        {/* ====================================================
            DATE
        ==================================================== */}

        <View
          style={styles.section}>

          <AppText
            style={styles.title}>
            Choose a date
          </AppText>

          <AppText
            style={styles.description}>
            Select a day for your reservation.
          </AppText>

        </View>


        <DateSelector
          dates={dates}
          selectedDate={selectedDate}
          onChange={date =>
            setSelectedDate(
              date.value,
            )
          }
        />


        {/* ====================================================
            TIME
        ==================================================== */}

        <View
          style={styles.timeSection}>

          <AppText
            style={styles.title}>
            Choose a time
          </AppText>

          <AppText
            style={styles.description}>
            Available reservation times are shown
            below.
          </AppText>

        </View>


        <TimeSelector
          times={times}
          selectedTime={selectedTime}
          onChange={time =>
            setSelectedTime(
              time.value,
            )
          }
        />

      </ScrollView>


      {/* ======================================================
          BOTTOM ACTION
      ====================================================== */}

      <BookingBottomBar
        buttonText="Continue"
        disabled={
          !selectedDate ||
          !selectedTime
        }
        onPress={
          handleContinue
        }
        secondaryText={
          selectedDate && selectedTime
            ? `${selectedDate} · ${selectedTime}`
            : 'Select a date and time'
        }
      />

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
    flexGrow: 1,

    paddingHorizontal:
      Spacing.md,

    paddingTop:
      Spacing.md,

    paddingBottom:
      Spacing.lg,
  },


  // ==========================================================
  // DATE SECTION
  // ==========================================================

  section: {
    marginTop:
      Spacing.xl,

    marginBottom:
      Spacing.md,
  },


  // ==========================================================
  // TIME SECTION
  // ==========================================================

  timeSection: {
    marginTop:
      Spacing.xl,

    marginBottom:
      Spacing.md,
  },


  // ==========================================================
  // TITLE
  // ==========================================================

  title: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.h2,

    color:
      Colors.neutral900,
  },


  // ==========================================================
  // DESCRIPTION
  // ==========================================================

  description: {
    marginTop:
      Spacing.xs,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.body,

    lineHeight: 22,

    color:
      Colors.neutral600,
  },

});


export default React.memo(
  BookTableDateScreen,
);
// import React, {
//   useMemo,
//   useState,
// } from 'react';

// import {
//   ScrollView,
//   StyleSheet,
//   View,
// } from 'react-native';

// import {
//   useNavigation,
//   useRoute,
// } from '@react-navigation/native';

// import type {
//   NativeStackNavigationProp,
// } from '@react-navigation/native-stack';

// import BookingHeader
//   from './BookingHeader';

// import BookingRestaurantCard
//   from './BookingRestaurantCard';

// import DateSelector, {
//   BookingDate,
// } from './DateSelector';

// import TimeSelector, {
//   BookingTime,
// } from './TimeSelector';

// import BookingBottomBar
//   from './BookingBottomBar';

// import AppText
//   from '../../component/AppText/AppText';

// import {
//   Colors,
//   Fonts,
//   Spacing,
//   Typography,
// } from '../../theme';


// // ============================================================
// // NAVIGATION
// // ============================================================

// type NavigationProp =
//   NativeStackNavigationProp<any>;


// // ============================================================
// // ROUTE
// // ============================================================

// type RouteParams = {
//   guests?: number;
// };


// // ============================================================
// // SCREEN
// // ============================================================

// const BookTableDateScreen = () => {

//   const navigation =
//     useNavigation<NavigationProp>();

//   const route =
//     useRoute();

//   const {
//     guests = 2,
//   } =
//     route.params as RouteParams;


//   // ==========================================================
//   // DATES
//   // ==========================================================

//   const dates =
//     useMemo<BookingDate[]>(() => {

//       const result: BookingDate[] = [];

//       const today =
//         new Date();

//       for (
//         let index = 0;
//         index < 14;
//         index++
//       ) {

//         const date =
//           new Date(today);

//         date.setDate(
//           today.getDate() + index,
//         );

//         const value =
//           date
//             .toISOString()
//             .split('T')[0];

//         const day =
//           date.toLocaleDateString(
//             'en-US',
//             {
//               weekday: 'short',
//             },
//           );

//         const dateNumber =
//           date.getDate()
//             .toString();

//         const month =
//           date.toLocaleDateString(
//             'en-US',
//             {
//               month: 'short',
//             },
//           );

//         result.push({
//           value,
//           day,
//           date: dateNumber,
//           month,
//         });
//       }

//       return result;

//     }, []);


//   // ==========================================================
//   // SELECTED DATE
//   // ==========================================================

//   const [
//     selectedDate,
//     setSelectedDate,
//   ] = useState<string>(
//     dates[0]?.value,
//   );


//   // ==========================================================
//   // TIMES
//   // ==========================================================

//   const times =
//     useMemo<BookingTime[]>(
//       () => [
//         {
//           value: '11:30',
//           label: '11:30 AM',
//         },
//         {
//           value: '12:00',
//           label: '12:00 PM',
//         },
//         {
//           value: '12:30',
//           label: '12:30 PM',
//         },
//         {
//           value: '1:00',
//           label: '1:00 PM',
//         },
//         {
//           value: '1:30',
//           label: '1:30 PM',
//         },
//         {
//           value: '2:00',
//           label: '2:00 PM',
//         },
//         {
//           value: '6:30',
//           label: '6:30 PM',
//         },
//         {
//           value: '7:00',
//           label: '7:00 PM',
//         },
//         {
//           value: '7:30',
//           label: '7:30 PM',
//         },
//         {
//           value: '8:00',
//           label: '8:00 PM',
//         },
//         {
//           value: '8:30',
//           label: '8:30 PM',
//         },
//         {
//           value: '9:00',
//           label: '9:00 PM',
//         },
//       ],
//       [],
//     );


//   // ==========================================================
//   // SELECTED TIME
//   // ==========================================================

//   const [
//     selectedTime,
//     setSelectedTime,
//   ] = useState<string>();


//   // ==========================================================
//   // CONTINUE
//   // ==========================================================

//   const handleContinue = () => {

//     if (
//       !selectedDate ||
//       !selectedTime
//     ) {
//       return;
//     }

//     navigation.navigate(
//       'BookTableSeating',
//       {
//         guests,
//         date: selectedDate,
//         time: selectedTime,
//       },
//     );
//   };


//   // ==========================================================
//   // BACK
//   // ==========================================================

//   const handleBack = () => {
//     navigation.goBack();
//   };


//   return (
//     <View style={styles.screen}>

//       {/* ======================================================
//           HEADER
//       ====================================================== */}

//       <BookingHeader
//         restaurantName="The Cozy Kitchen"
//         restaurantSubtitle="Italian · Café"
//         currentStep={2}
//         totalSteps={5}
//         onBack={handleBack}
//       />


//       {/* ======================================================
//           CONTENT
//       ====================================================== */}

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={
//           styles.content
//         }>

//         {/* ====================================================
//             RESTAURANT
//         ==================================================== */}

//         <BookingRestaurantCard
//           restaurantName="The Cozy Kitchen"
//           cuisine="Italian · Café"
//           distance="0.3 km"
//           rating={4.8}
//         />


//         {/* ====================================================
//             DATE
//         ==================================================== */}

//         <View
//           style={styles.section}>

//           <AppText
//             style={styles.title}>
//             Choose a date
//           </AppText>

//           <AppText
//             style={styles.description}>
//             Select a day for your reservation.
//           </AppText>

//         </View>


//         <DateSelector
//           dates={dates}
//           selectedDate={selectedDate}
//           onChange={date =>
//             setSelectedDate(
//               date.value,
//             )
//           }
//         />


//         {/* ====================================================
//             TIME
//         ==================================================== */}

//         <View
//           style={styles.timeSection}>

//           <AppText
//             style={styles.title}>
//             Choose a time
//           </AppText>

//           <AppText
//             style={styles.description}>
//             Available reservation times are shown
//             below.
//           </AppText>

//         </View>


//         <TimeSelector
//           times={times}
//           selectedTime={selectedTime}
//           onChange={time =>
//             setSelectedTime(
//               time.value,
//             )
//           }
//         />

//       </ScrollView>


//       {/* ======================================================
//           BOTTOM ACTION
//       ====================================================== */}

//       <BookingBottomBar
//         buttonText="Continue"
//         disabled={
//           !selectedDate ||
//           !selectedTime
//         }
//         onPress={
//           handleContinue
//         }
//         secondaryText={
//           selectedDate && selectedTime
//             ? `${selectedDate} · ${selectedTime}`
//             : 'Select a date and time'
//         }
//       />

//     </View>
//   );
// };


// // ============================================================
// // STYLES
// // ============================================================

// const styles = StyleSheet.create({

//   // ==========================================================
//   // SCREEN
//   // ==========================================================

//   screen: {
//     flex: 1,

//     backgroundColor:
//       Colors.mainBackground,
//   },


//   // ==========================================================
//   // CONTENT
//   // ==========================================================

//   content: {
//     flexGrow: 1,

//     paddingHorizontal:
//       Spacing.md,

//     paddingTop:
//       Spacing.md,

//     paddingBottom:
//       Spacing.lg,
//   },


//   // ==========================================================
//   // DATE SECTION
//   // ==========================================================

//   section: {
//     marginTop:
//       Spacing.xl,

//     marginBottom:
//       Spacing.md,
//   },


//   // ==========================================================
//   // TIME SECTION
//   // ==========================================================

//   timeSection: {
//     marginTop:
//       Spacing.xl,

//     marginBottom:
//       Spacing.md,
//   },


//   // ==========================================================
//   // TITLE
//   // ==========================================================

//   title: {
//     fontFamily:
//       Fonts.interBold,

//     fontSize:
//       Typography.h2,

//     color:
//       Colors.neutral900,
//   },


//   // ==========================================================
//   // DESCRIPTION
//   // ==========================================================

//   description: {
//     marginTop:
//       Spacing.xs,

//     fontFamily:
//       Fonts.interRegular,

//     fontSize:
//       Typography.body,

//     lineHeight: 22,

//     color:
//       Colors.neutral600,
//   },

// });


// export default React.memo(
//   BookTableDateScreen,
// );