import React from 'react';
import {StyleSheet, View} from 'react-native';

import MainLayout from '../component/MainLayout';
import AppText from '../component/AppText';
import {Colors, Fonts, Radius, Spacing, Typography} from '../theme';

const HomeScreen = () => {
  return (
    <MainLayout>
      <View style={styles.content}>
        <View style={styles.heroCard}>
          <AppText style={styles.welcomeText}>Welcome back!</AppText>

          <AppText style={styles.screenTitle}>Home</AppText>

          <AppText style={styles.descriptionText}>
            Discover the nearest restaurants, deals, and personal favorites
            from your maps and bookings.
          </AppText>
        </View>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },

  heroCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.xl,

    shadowColor: Colors.neutral600,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 6,
  },

  welcomeText: {
    fontFamily: Fonts.interSemiBold,
    fontSize: Typography.h3,
    color: Colors.neutral700,
    marginBottom: Spacing.sm,
  },

  screenTitle: {
    fontFamily: Fonts.interBold,
    fontSize: Typography.h1,
    color: Colors.neutral900,
    marginBottom: Spacing.sm,
  },

  descriptionText: {
    fontFamily: Fonts.interRegular,
    fontSize: Typography.body,
    color: Colors.neutral600,
    lineHeight: 24,
  },
});

export default HomeScreen;

// import React from 'react';
// import {StyleSheet, TouchableOpacity, View} from 'react-native';
// import AppScreen from '../component/AppScreen/AppScreen';
// import AppText from '../component/AppText';
// import {Colors, Fonts, Radius, Spacing, Typography} from '../theme';

// const HomeScreen = () => {
//   return (
//     <AppScreen style={styles.container}>
//       <View style={styles.content}>
//         <View style={styles.heroCard}>
//           <AppText style={styles.welcomeText}>Welcome back!</AppText>
//           <AppText style={styles.screenTitle}>Home</AppText>
//           <AppText style={styles.descriptionText}>
//             Discover the nearest restaurants, deals, and personal favorites from your maps and bookings.
//           </AppText>
//         </View>
//       </View>
//     </AppScreen>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.mainBackground,
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: Spacing.md,
//   },
//   heroCard: {
//     backgroundColor: Colors.white,
//     borderRadius: Radius.xl,
//     padding: Spacing.xl,
//     shadowColor: Colors.neutral600,
//     shadowOffset: {width: 0, height: 10},
//     shadowOpacity: 0.05,
//     shadowRadius: 20,
//     elevation: 6,
//   },
//   welcomeText: {
//     fontFamily: Fonts.interSemiBold,
//     fontSize: Typography.h3,
//     color: Colors.neutral700,
//     marginBottom: Spacing.sm,
//   },
//   screenTitle: {
//     fontFamily: Fonts.interBold,
//     fontSize: Typography.h1,
//     color: Colors.neutral900,
//     marginBottom: Spacing.sm,
//   },
//   descriptionText: {
//     fontFamily: Fonts.interRegular,
//     fontSize: Typography.body,
//     color: Colors.neutral600,
//     lineHeight: 24,
//   },
// });

// export default HomeScreen;
