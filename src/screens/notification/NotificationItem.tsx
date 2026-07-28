import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AppText from '../../component/AppText';
import {Colors, Fonts, Radius, Spacing, Typography} from '../../theme';
import {NotificationItem as Notification} from '../notification/NotificationData';

type Props = {
  item: Notification;
  onPress?: (item: Notification) => void;
};

const NotificationItem = ({item, onPress}: Props) => {
  const Icon = item.Icon;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => onPress?.(item)}>
      <View style={styles.iconContainer}>
        <Icon
          width={24}
          height={24}
          stroke={Colors.primary600}
          fill="none"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <AppText
            style={styles.title}
            numberOfLines={1}>
            {item.title}
          </AppText>

          <AppText style={styles.time}>{item.time}</AppText>
        </View>

        <AppText
          style={styles.description}
          numberOfLines={2}>
          {item.description}
        </AppText>
      </View>

      {item.isUnread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
};

export default React.memo(NotificationItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,

    shadowColor: Colors.neutral600,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 4,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: Radius.rounded,
    backgroundColor: Colors.primary50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },

  content: {
    flex: 1,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  title: {
    flex: 1,
    color: Colors.neutral900,
    fontFamily: Fonts.interBold,
    fontSize: Typography.body,
    marginRight: Spacing.sm,
  },

  time: {
    color: Colors.neutral500,
    fontFamily: Fonts.interRegular,
    fontSize: Typography.caption,
  },

  description: {
    marginTop: Spacing.xs,
    color: Colors.neutral600,
    fontFamily: Fonts.interRegular,
    fontSize: Typography.caption,
    lineHeight: 20,
  },

  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: Radius.round,
    backgroundColor: Colors.primary600,
    marginLeft: Spacing.sm,
    alignSelf: 'center',
  },
});