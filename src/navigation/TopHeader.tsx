import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AppText from '../component/AppText';
import {Colors, Fonts, Radius, Spacing, Typography} from '../theme';

import DropdownIcon from '../assets/icons/ic_dropdown.svg';
import NotificationIcon from '../assets/icons/ic_notification.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';

const TopHeader = () => {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();

  const onNotificationPress = () => {
    navigation.navigate('Notification');
  };

  const onLocationPress = () => {
    // TODO: Open city bottom sheet
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.locationContainer}
        onPress={onLocationPress}>
        <AppText style={styles.locationText}>Bengaluru</AppText>
        <DropdownIcon />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.notificationButton}
        onPress={onNotificationPress}>
        <View style={styles.bellCircle}>
          <NotificationIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.mainBackground,
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral50,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.xl,
  },

  locationText: {
    marginRight: Spacing.xs,
    fontSize: Typography.title,
    fontFamily: Fonts.interBold,
    color: Colors.neutral700,
  },

  notificationButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bellCircle: {
    width: 48,
    height: 48,
    borderRadius: Radius.round,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: Colors.neutral600,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
});

export default TopHeader;

// import React from 'react';
// import {StyleSheet, TouchableOpacity, View} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';

// import AppText from '../component/AppText';
// import {Colors, Fonts, Radius, Spacing, Typography} from '../theme';

// import DropdownIcon from '../assets/icons/ic_dropdown.svg';
// import NotificationIcon from '../assets/icons/ic_notification.svg';

// const TopHeader = () => {
//   return (
//     <SafeAreaView edges={['top']} style={styles.safeArea}>
//       <View style={styles.headerContainer}>
//         <View style={styles.locationContainer}>
//           <AppText style={styles.locationText}>Bengaluru</AppText>
//           <DropdownIcon />
//         </View>

//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={styles.notificationButton}>
//           <View style={styles.bellCircle}>
//             <NotificationIcon />
//           </View>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     backgroundColor: Colors.mainBackground,
//   },

//   headerContainer: {
//     paddingTop: Spacing.md,
//     paddingHorizontal: Spacing.md,
//     paddingVertical: Spacing.sm,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',

//     backgroundColor: Colors.mainBackground,
//   },

//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: Colors.neutral50,
//     paddingHorizontal: Spacing.md,
//     paddingVertical: Spacing.sm,
//     borderRadius: Radius.xl,
//   },

//   locationText: {
//     marginRight: Spacing.xs,
//     fontSize: Typography.title,
//     fontFamily: Fonts.interBold,
//     color: Colors.neutral700,
//   },

//   notificationButton: {
//     width: 48,
//     height: 48,
//     borderRadius: Radius.round,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   bellCircle: {
//     width: 48,
//     height: 48,
//     borderRadius: Radius.round,
//     backgroundColor: Colors.white,
//     justifyContent: 'center',
//     alignItems: 'center',

//     shadowColor: Colors.neutral600,
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.06,
//     shadowRadius: 12,
//     elevation: 3,
//   },
// });

// export default TopHeader;