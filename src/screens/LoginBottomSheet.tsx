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
import { SvgProps } from 'react-native-svg';
type IconProps = {
  focused: boolean;
  icon: React.FC<SvgProps>;
};

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
            styles.bottomSheetWrapper,
            {
              transform: [{ translateY }],
            },
          ]}>
          {/* Close button - POSITIONED JUST ABOVE THE SHEET */}
          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.8}
            onPress={handleClose}>
            <AppText style={styles.closeIcon}>✕</AppText>
          </TouchableOpacity>

          {/* Bottom sheet container */}
          <View style={styles.bottomSheet}>
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
                  <IconProps
                  width={16}
                  height={16}
                  uri={require('../assets/icons/ic_dropdown.svg')}
                />
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
  // Wrapper for the entire animated view (sheet + close button together)
  bottomSheetWrapper: {
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  // Close button styling - POSITIONED JUST ABOVE THE SHEET
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 28,
    backgroundColor: Colors.neutral50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    marginRight: 4, // Align with the right edge of the sheet
    marginBottom: 12, // Negative margin to make it overlap with the sheet
    zIndex: 100, // Ensure it's on top
  },
  // Close button icon
  closeIcon: {
    fontSize: 22,
    color: Colors.neutral900,
    fontFamily: Fonts.interBold,
  },
  // Bottom sheet container
  bottomSheet: {
    backgroundColor: Colors.mainBackground,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingBottom: Spacing.xl,
    maxHeight: '100%',
    width: '100%',
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
    paddingVertical: Spacing.md,
  },
  // Country code section styling
  countryCodeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.neutral50,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    height: 56,
    marginRight: Spacing.md,
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
    height: 56,
    backgroundColor: Colors.neutral50,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    fontSize: Typography.body,
    fontFamily: Fonts.interRegular,
    color: Colors.black,
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