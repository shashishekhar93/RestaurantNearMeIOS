import React, {useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppText from '../component/AppText';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Fonts, Radius, Spacing, Typography} from '../theme';
import Geolocation, {GeolocationResponse} from '@react-native-community/geolocation';
// Change this import - use Image instead of importing SVG directly
import LocationIcon from '../assets/icons/ic_location.svg';

type PermissionStatus = 'idle' | 'checking' | 'granted' | 'denied' | 'blocked' | 'limited';

const SignUpScreen = () => {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<'location' | 'registration'>('location');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('idle');
  const [permissionMessage, setPermissionMessage] = useState('');

  const openAppSettings = async () => {
    try {
      await Linking.openSettings();
    } catch {
      Alert.alert('Unable to open settings', 'Please open Settings manually to update location permissions.');
    }
  };

  const getCurrentLocation = (): Promise<GeolocationResponse> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 1000,
      },
    );
  });
};

  const requestLocationPermission = async (): Promise<PermissionStatus> => {
    // For iOS, permission is requested automatically when getCurrentPosition is called.
    // This function keeps the flow consistent and can be extended later if a dedicated
    // permission library is added.
    if (Platform.OS === 'ios') {
      return 'granted';
    }

    return 'granted';
  };

  const handleLocationError = (error: any) => {
    const code = error?.code;
    const message = error?.message ?? 'Unable to access location.';

    if (code === 1) {
      setPermissionStatus('denied');
      setPermissionMessage('Location permission was denied.');
      Alert.alert(
        'Location permission denied',
        'Please allow location access so we can find nearby restaurants.',
        [
          {text: 'Open Settings', onPress: openAppSettings},
          {text: 'Cancel', style: 'cancel'},
        ],
      );
      return;
    }

    if (code === 2) {
      setPermissionStatus('blocked');
      setPermissionMessage('Location services are blocked or disabled. Please enable GPS.');
      Alert.alert(
        'Location blocked',
        'GPS appears to be disabled or blocked. Open Settings to enable location services.',
        [
          {text: 'Open Settings', onPress: openAppSettings},
          {text: 'Cancel', style: 'cancel'},
        ],
      );
      return;
    }

    if (code === 3) {
      setPermissionStatus('limited');
      setPermissionMessage('Location request timed out. Please try again.');
      return;
    }

    setPermissionStatus('denied');
    setPermissionMessage(message);
  };

  const handleAllowAccess = async () => {
    setPermissionStatus('checking');
    setPermissionMessage('Checking current location permission...');

    const status = await requestLocationPermission();

    if (status === 'blocked') {
      setPermissionMessage('Location permission is blocked. Open Settings to continue.');
      Alert.alert(
        'Location blocked',
        'Please open the device Settings and allow location access for this app.',
        [
          {text: 'Open Settings', onPress: openAppSettings},
          {text: 'Cancel', style: 'cancel'},
        ],
      );
      return;
    }

    if (status === 'denied') {
      setPermissionMessage('Location permission denied.');
      return;
    }

    try {
      const position = await getCurrentLocation();
      console.log(position.coords.latitude);
    console.log(position.coords.longitude);
      setPermissionStatus('granted');
      setPermissionMessage('Location found. Continue to registration');
      setStep('registration');
    } catch (error) {
      handleLocationError(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        <View style={[styles.topBar, {paddingTop: insets.top + Spacing.md}]}> 
          
        <View style={styles.indicatorContainer}>

            <View style={styles.indicatorWrapper}>
                <View
                style={[
                styles.indicator,
                step === 'location' && styles.activeIndicator,
                ]}
                />
            <View
            style={[
                styles.indicator,
                step === 'registration' && styles.activeIndicator,
            ]}
            />
        </View>

    
        </View>
        {step === 'registration' ? (
            <TouchableOpacity style={styles.backButton} activeOpacity={0.8} onPress={() => setStep('location')}>
              <AppText style={styles.backButtonIcon}>←</AppText>
            </TouchableOpacity>
          ) : (
            <View style={styles.backButtonPlaceholder} />
          )}
        </View>

        {step === 'location' ? (
          <View style={styles.screenContent}>
            <View style={styles.centerBlock}>
              <View style={styles.permissionCircle}>
                <LocationIcon />
              </View>
              <AppText style={styles.permissionTitle}>Find what’s near you</AppText>
              <AppText style={styles.permissionDescription}>
                Allow access to your location so we can show you the best restaurants and hidden culinary gems.
              </AppText>
            </View>

            {permissionMessage ? (
              <AppText style={styles.permissionStatusText}>{permissionMessage}</AppText>
            ) : null}

            <View style={styles.actions}>
              <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={handleAllowAccess}>
                <AppText style={styles.primaryButtonText}>Allow Access</AppText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8} onPress={() => setStep('registration')}>
                <AppText style={styles.secondaryButtonText}>Maybe Later</AppText>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.screenContent}>
            <View style={styles.stepHeader}>
              <AppText style={styles.stepTitle}>Create account</AppText>
              <AppText style={styles.stepSubtitle}>Just a few details and you’re in.</AppText>
            </View>

            <View style={styles.formContent}>
              <View style={styles.inputGroup}>
                <AppText style={styles.inputLabel}>Full Name</AppText>
                <TextInput
                  style={styles.input}
                  placeholder="Enter full name"
                  placeholderTextColor={Colors.neutral400}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
              <View style={styles.inputGroup}>
                <AppText style={styles.inputLabel}>Mobile Number</AppText>
                <TextInput
                  style={styles.input}
                  placeholder="Enter mobile number"
                  placeholderTextColor={Colors.neutral400}
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                  keyboardType="phone-pad"
                />
              </View>
              <View style={styles.inputGroup}>
                <View style={styles.otpLabelRow}>
                  <AppText style={styles.inputLabel}>OTP</AppText>
                  <TouchableOpacity activeOpacity={0.8}>
                    <AppText style={styles.sendOtpText}>Send OTP</AppText>
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter the 6-digit OTP"
                  placeholderTextColor={Colors.neutral400}
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                />
              </View>
              <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
                <AppText style={styles.primaryButtonText}>Create account</AppText>
              </TouchableOpacity>
              <AppText style={styles.loginText}>
                Already have an account?{' '}
                <AppText style={styles.loginLink}>Log in</AppText>
              </AppText>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background50,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
  },
  header: {
    marginBottom: Spacing.xl,
  },
  backButtonIcon: {
  fontSize: 22,
  color: Colors.black,
  fontFamily: Fonts.interBold,
},
  stepTitle: {
    color: Colors.black,
    fontSize: Typography.h1,
    fontFamily: Fonts.interBold,
    marginBottom: Spacing.sm,
  },
  stepSubtitle: {
    color: Colors.neutral600,
    fontSize: Typography.body,
    fontFamily: Fonts.interRegular,
    lineHeight: 22,
  },
  topBar: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  indicatorContainer: {
    width: '100%',
  alignItems: 'center',
  marginTop: Spacing.lg,
  marginBottom: Spacing.xxl,
},

indicatorWrapper: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  gap: Spacing.sm,
},

indicator: {
  flex: 1,
  height: 6,
  borderRadius: 3,
  backgroundColor: Colors.neutral200,
},

activeIndicator: {
  backgroundColor: Colors.orangePrimary,
},
  backButton: {
  width: 48,
  height: 48,
  borderRadius: 24,
  marginTop: Spacing.xs,
  alignSelf: 'flex-start',
  backgroundColor: Colors.neutral50,
  justifyContent: 'center',
  alignItems: 'center',

  shadowColor: Colors.black,
  shadowOpacity: 0.08,
  shadowRadius: 10,
  shadowOffset: {width: 0, height: 4},
  elevation: 4,
},
  backButtonPlaceholder: {
    width: 40,
    height: 40,
  },
  screenContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
  },
  centerBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  stepHeader: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  formContent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  permissionCircle: {
    width: 120,
    height: 120,
    borderRadius: Radius.round,
    backgroundColor: Colors.primary50,
    alignSelf: 'center',
    marginBottom: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationIcon: {
    width: 44,
    height: 44,
  },
  locationIconEmoji: {
    fontSize: 44,
  },
  permissionTitle: {
    color: Colors.black,
    fontSize: Typography.h2,
    fontFamily: Fonts.interBold,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  permissionDescription: {
    color: Colors.neutral500,
    fontSize: Typography.body,
    fontFamily: Fonts.interRegular,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  permissionStatusText: {
    color: Colors.neutral600,
    fontSize: Typography.body,
    fontFamily: Fonts.interMedium,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: Colors.orangePrimary,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: Typography.title,
    fontFamily: Fonts.interBold,
  },
  secondaryButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
  },
  secondaryButtonText: {
    color: Colors.neutral600,
    fontSize: Typography.body,
    fontFamily: Fonts.interMedium,
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    color: Colors.black,
    fontSize: Typography.caption,
    fontFamily: Fonts.interSemiBold,
    marginBottom: Spacing.xs,
  },
  input: {
    width: '100%',
    borderRadius: Radius.xl,
    backgroundColor: Colors.background100,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    color: Colors.black,
    fontSize: Typography.body,
    fontFamily: Fonts.interRegular,
  },
  otpLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  sendOtpText: {
    color: Colors.orangePrimary,
    fontSize: Typography.body,
    fontFamily: Fonts.interSemiBold,
  },
  loginText: {
    color: Colors.neutral600,
    textAlign: 'center',
    fontSize: Typography.body,
    fontFamily: Fonts.interRegular,
    marginTop: Spacing.md,
  },
  loginLink: {
    color: Colors.orangePrimary,
    fontFamily: Fonts.interSemiBold,
  },
  actions: {
  width: '100%',
  marginTop: 'auto',
  paddingHorizontal: Spacing.lg,
  paddingBottom: Spacing.xl,
},
});
