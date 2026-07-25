import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
  Keyboard,
  TextInput,
  Image,
} from 'react-native';
import AppText from '../component/AppText';
import { Colors, Fonts, Radius, Spacing, Typography } from '../theme';

// Define the props for the LoginBottomSheet component
type LoginBottomSheetProps = {
  isVisible: boolean; // Controls whether the bottom sheet is visible
  onClose: () => void; // Callback function when close button is pressed
};

const LoginBottomSheet = ({ isVisible, onClose }: LoginBottomSheetProps) => {
  // Animation value for the slide-up effect
  const slideAnim = useRef(new Animated.Value(0)).current;

  // State for mobile number input
  const [mobileNumber, setMobileNumber] = React.useState('');

  // Trigger animation when visibility changes
  useEffect(() => {
    if (isVisible) {
      // Animate the sheet sliding up from bottom
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
      // Dismiss keyboard when sheet opens
      Keyboard.dismiss();
    } else {
      // Animate the sheet sliding down to bottom
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible, slideAnim]);

  // Calculate the translateY value for animation
  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0], // Starts 600px below, ends at 0 (original position)
  });

  // Handle close button press
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={handleClose}>
      {/* Overlay - Semi-transparent background */}
      <View style={styles.overlay}>
        {/* Animated bottom sheet container */}
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [{ translateY }],
            },
          ]}>
          {/* Header section with close button */}
          <View style={styles.header}>
            <View style={styles.headerSpacer} />
            {/* Close button */}
            <TouchableOpacity
              style={styles.closeButton}
              activeOpacity={0.8}
              onPress={handleClose}>
              <AppText style={styles.closeIcon}>✕</AppText>
            </TouchableOpacity>
          </View>

          {/* Content section */}
          <View style={styles.content}>
            {/* Icon/Illustration placeholder */}
            <Image style={styles.iconEmoji} source={require('../assets/icons/ic_phone.png')} />

            {/* Title */}
            <AppText style={styles.title}>Enter the mobile number</AppText>

            {/* Description text */}
            <AppText style={styles.description}>
              This number will be used for all kinds of communication purposes
              whether via SMS, WhatsApp, etc.
            </AppText>

            {/* Mobile number input section */}
            <View style={styles.inputContainer}>
              {/* Country code dropdown */}
              <View style={styles.countryCodeSection}>
                <AppText style={styles.countryFlag}>🇮🇳</AppText>
                <AppText style={styles.countryCode}>+91</AppText>
                <AppText style={styles.dropdownArrow}>▼</AppText>
              </View>

              {/* Mobile number text input */}
              <TextInput
                style={styles.mobileInput}
                placeholder="Mobile number"
                placeholderTextColor={Colors.neutral400}
                keyboardType="phone-pad"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                maxLength={10}
              />
            </View>

            {/* Continue button */}
            <TouchableOpacity
              style={styles.continueButton}
              activeOpacity={0.8}>
              <AppText style={styles.continueButtonText}>Continue</AppText>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Overlay - covers the entire screen with semi-transparent background
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  // Bottom sheet container
  bottomSheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingBottom: Spacing.xl,
    maxHeight: '85%',
  },
  // Header area with close button
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  // Spacer to push close button to the right
  headerSpacer: {
    flex: 1,
  },
  // Close button styling
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
  // Close button icon
  closeIcon: {
    fontSize: 24,
    color: Colors.neutral900,
    fontFamily: Fonts.interBold,
  },
  // Content container with padding
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  // Icon emoji styling
  iconEmoji: {
    width: 100,
    height: 100,
  },
  // Title text styling
  title: {
    fontSize: Typography.h2,
    fontFamily: Fonts.interBold,
    color: Colors.neutral900,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  // Description text styling
  description: {
    fontSize: Typography.body,
    fontFamily: Fonts.interRegular,
    color: Colors.neutral600,
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  // Input container for country code and mobile number
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral50,
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  // Country code section styling
  countryCodeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.md,
    paddingRight: Spacing.md,
    borderRightWidth: 1,
    borderRightColor: Colors.neutral50,
  },
  // Country flag emoji
  countryFlag: {
    fontSize: 20,
    marginRight: Spacing.xs,
  },
  // Country code text
  countryCode: {
    fontSize: Typography.body,
    fontFamily: Fonts.interSemiBold,
    color: Colors.neutral900,
    marginRight: Spacing.sm,
  },
  // Dropdown arrow indicator
  dropdownArrow: {
    fontSize: 12,
    color: Colors.neutral600,
  },
  // Mobile number text input styling
  mobileInput: {
    flex: 1,
    fontSize: Typography.body,
    fontFamily: Fonts.interRegular,
    color: Colors.black,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  // Continue button styling
  continueButton: {
    backgroundColor: Colors.orangePrimary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  // Continue button text styling
  continueButtonText: {
    color: Colors.white,
    fontSize: Typography.title,
    fontFamily: Fonts.interBold,
  },
});

export default LoginBottomSheet;