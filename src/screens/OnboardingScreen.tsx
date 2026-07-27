import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AppText from '../component/AppText';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';

import {ONBOARDING_DATA} from '../constants/onboarding';
import {Colors, Fonts, Radius, Spacing, Typography} from '../theme';
import LoginBottomSheet from './LoginBottomSheet';

type OnboardingScreenProps = {
  onGetStarted: () => void;
  onLoginSuccess: () => void;
};

const OnboardingScreen = ({onGetStarted, onLoginSuccess}: OnboardingScreenProps) => {
  const insets = useSafeAreaInsets();
  const [selectedIndex, setSelectedIndex] = useState(0);
  // State to control the visibility of the login bottom sheet
  const [isLoginSheetVisible, setIsLoginSheetVisible] = useState(false);

  // Handler for opening the login bottom sheet
  const handleLoginPress = () => {
    setIsLoginSheetVisible(true);
  };

  // Handler for closing the login bottom sheet
  const handleCloseLoginSheet = () => {
    setIsLoginSheetVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.topBar, {paddingTop: insets.top}]}> 
        <View style={styles.topBarSpacer} />
        <TouchableOpacity style={styles.skipButton} activeOpacity={0.8}>
          <AppText style={styles.skipText}>Skip</AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <PagerView
          style={styles.pager}
          initialPage={0}
          onPageSelected={event => setSelectedIndex(event.nativeEvent.position)}>
          {ONBOARDING_DATA.map(item => (
            <View key={item.id} style={styles.page}>
              <ImageBackground
                source={{uri: item.image}}
                resizeMode="cover"
                style={styles.background}
                imageStyle={styles.backgroundImage}>
                <View style={styles.overlay} />
                <View style={styles.centerContent}>
                  <AppText style={styles.logo}>LOGO</AppText>
                  <AppText style={styles.pageTitle}>{item.title}</AppText>
                  <AppText style={styles.pageSubtitle}>{item.subtitle}</AppText>
                </View>
              </ImageBackground>
            </View>
          ))}
        </PagerView>
      </View>

      <View style={styles.footer}> 
        <View style={styles.pagination}> 
          {ONBOARDING_DATA.map((_, dotIndex) => (
            <View
              key={dotIndex}
              style={[
                styles.dot,
                dotIndex === selectedIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8} onPress={onGetStarted}>
          <AppText style={styles.ctaText}>Get Started</AppText>
        </TouchableOpacity>

        <AppText style={styles.loginText}>
          Already have an account?{' '}
          {/* Made the "Log in" text clickable to open the bottom sheet */}
          <TouchableOpacity onPress={handleLoginPress}>
            <AppText style={styles.loginLink}>Log in</AppText>
          </TouchableOpacity>
        </AppText>
      </View>

      {/* Login bottom sheet component - appears on top of the onboarding screen */}
      <LoginBottomSheet 
        isVisible={isLoginSheetVisible} 
        onClose={handleCloseLoginSheet}
        onLoginSuccess={onLoginSuccess}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  contentContainer: {
    flex: 1,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: Spacing.lg,
    right: Spacing.lg,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topBarSpacer: {
    width: 50,
  },
  skipButton: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.round,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  skipText: {
    color: Colors.white,
    fontSize: Typography.caption,
    fontFamily: Fonts.interSemiBold
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.96,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  logo: {
    color: Colors.white,
    fontSize: Typography.h2,
    fontFamily: Fonts.interBold,
    marginBottom: Spacing.sm,
  },
  pageTitle: {
    color: Colors.white,
    fontSize: Typography.h1,
    fontFamily: Fonts.interBold,
    lineHeight: 42,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  pageSubtitle: {
    color: Colors.white,
    fontSize: Typography.body,
    fontFamily: Fonts.interRegular,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: '80%',
  },
  footer: {
    position: 'absolute',
    bottom: Spacing.xl,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: Radius.round,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginRight: Spacing.sm,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.orangePrimary,
  },
  ctaButton: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: Colors.orangePrimary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  ctaText: {
    color: Colors.white,
    fontSize: Typography.title,
    fontFamily: Fonts.interBold,
  },
  loginText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: Typography.body,
    fontFamily: Fonts.interRegular,
    opacity: 0.88,
    marginBottom: Spacing.lg,
  },
  loginLink: {
    color: Colors.white,
    fontFamily: Fonts.interSemiBold,
  },
});
