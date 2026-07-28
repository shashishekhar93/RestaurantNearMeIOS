import React from 'react';
import {
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AppScreen from '../../component/AppScreen';
import AppText from '../../component/AppText';
import NotificationItem from '../notification/NotificationItem';
import BackIcon from '../../assets/icons/ic_back.svg';
import {
  notificationSections,
  NotificationItem as Notification,
} from '../notification/NotificationData';

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
  'Notification'>;

type Props = {
  onNotificationPress?: (item: Notification) => void;
};

const NotificationScreen = ({onNotificationPress}: Props) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <AppScreen style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>

        <AppText style={styles.title}>Notifications</AppText>

        <TouchableOpacity activeOpacity={0.8}>
          <AppText style={styles.markAll}>
            Mark all read
          </AppText>
        </TouchableOpacity>
      </View>

      <SectionList
        sections={notificationSections}
        keyExtractor={item => item.id}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        renderItem={({item}) => (
          <NotificationItem
            item={item}
            onPress={onNotificationPress}
          />
        )}
        renderSectionHeader={({section}) => (
          <AppText style={styles.sectionTitle}>
            {section.title}
          </AppText>
        )}
      />
    </AppScreen>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
    paddingHorizontal: Spacing.lg,
  },

  content: {
    paddingBottom: Spacing.xxxl,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
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

  backArrow: {
    fontSize: 22,
    color: Colors.neutral900,
    fontFamily: Fonts.interBold,
  },

  title: {
    flex: 1,
    marginLeft: Spacing.md,
    fontSize: Typography.h1,
    fontFamily: Fonts.interBold,
    color: Colors.neutral900,
  },

  markAll: {
    color: Colors.primary600,
    fontFamily: Fonts.interSemiBold,
    fontSize: Typography.caption,
  },

  sectionTitle: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    color: Colors.neutral500,
    fontFamily: Fonts.interSemiBold,
    fontSize: Typography.title,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

// import React from 'react';
// import {
//   SectionList,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import AppScreen from '../../component/AppScreen';
// import AppText from '../../component/AppText';
// import NotificationItem from '../notification/NotificationItem';


// import {
//   notificationSections,
//   NotificationItem as Notification,
// } from '../notification/NotificationData';

// import {Colors, Fonts, Radius, Spacing, Typography} from '../../theme';

// type Props = {
//   onBack?: () => void;
//   onNotificationPress?: (item: Notification) => void;
// };

// const NotificationScreen = ({
//   onBack,
//   onNotificationPress,
// }: Props) => {
//   return (
//     <AppScreen style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={styles.backButton}
//           onPress={onBack}>
//           <AppText style={styles.backArrow}>←</AppText>
//         </TouchableOpacity>

//         <AppText style={styles.title}>
//           Notifications
//         </AppText>

//         <TouchableOpacity activeOpacity={0.8}>
//           <AppText style={styles.markAll}>
//             Mark all read
//           </AppText>
//         </TouchableOpacity>
//       </View>

//       <SectionList
//         sections={notificationSections}
//         keyExtractor={item => item.id}
//         stickySectionHeadersEnabled={false}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.content}
//         renderItem={({item}) => (
//           <NotificationItem
//             item={item}
//             onPress={onNotificationPress}
//           />
//         )}
//         renderSectionHeader={({section}) => (
//           <AppText style={styles.sectionTitle}>
//             {section.title}
//           </AppText>
//         )}
//       />
//     </AppScreen>
//   );
// };

// export default NotificationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.mainBackground,
//     paddingHorizontal: Spacing.lg,
//   },

//   content: {
//     paddingBottom: Spacing.xxxl,
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: Spacing.md,
//     marginBottom: Spacing.lg,
//   },

//   backButton: {
//     width: 40,
//     height: 40,
//     borderRadius: Radius.rounded,
//     backgroundColor: Colors.white,
//     justifyContent: 'center',
//     alignItems: 'center',

//     shadowColor: Colors.neutral600,
//     shadowOffset: {
//       width: 0,
//       height: 6,
//     },
//     shadowOpacity: 0.05,
//     shadowRadius: 12,
//     elevation: 3,
//   },

//   backArrow: {
//     fontSize: 22,
//     color: Colors.neutral900,
//     fontFamily: Fonts.interBold,
//   },

//   title: {
//     flex: 1,
//     marginLeft: Spacing.md,
//     fontSize: Typography.h1,
//     fontFamily: Fonts.interBold,
//     color: Colors.neutral900,
//   },

//   markAll: {
//     color: Colors.primary600,
//     fontFamily: Fonts.interSemiBold,
//     fontSize: Typography.caption,
//   },

//   sectionTitle: {
//     marginTop: Spacing.md,
//     marginBottom: Spacing.sm,
//     color: Colors.neutral500,
//     fontFamily: Fonts.interSemiBold,
//     fontSize: Typography.title,
//     letterSpacing: 1,
//     textTransform: 'uppercase',
//   },
// });