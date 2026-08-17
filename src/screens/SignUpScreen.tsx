import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import AppText from '../component/AppText';
import {
  Colors,
  Fonts,
  Radius,
  Spacing,
  Typography,
} from '../theme';

import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation';

import authRepository from '../api/repository/authRepository';
import {SessionManager} from '../utils/SessionManager';

import LocationIcon from '../assets/icons/ic_location.svg';

type SignUpScreenProps = {
  onSignedIn: () => void;
  onLoginPress: () => void;
};

type Step = 'location' | 'registration';

const SignUpScreen = ({
  onSignedIn,
  onLoginPress,
}: SignUpScreenProps) => {
  const insets = useSafeAreaInsets();

  // ============================================================
  // STEP
  // ============================================================

  const [step, setStep] = useState<Step>('location');

  // ============================================================
  // REGISTRATION DATA
  // ============================================================

  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');

  // ============================================================
  // OTP STATE
  // ============================================================

  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  // ============================================================
  // LOCATION STATE
  // ============================================================

  const [locationLoading, setLocationLoading] = useState(false);
  const [locationMessage, setLocationMessage] = useState('');

  // ============================================================
  // VALIDATION
  // ============================================================

  const isValidName = (name: string) => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return false;
    }

    return /^[A-Za-zÀ-ÖØ-öø-ÿ.' ]+$/.test(trimmedName);
  };

  const isValidMobile = (mobile: string) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  const isValidOtp = (value: string) => {
    return /^\d{4}$/.test(value);
  };

  // ============================================================
  // LOCATION
  // ============================================================

  const openAppSettings = async () => {
    try {
      await Linking.openSettings();
    } catch {
      Alert.alert(
        'Unable to open settings',
        'Please open Settings manually and allow location access.',
      );
    }
  };

  const getCurrentLocation = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          console.log(
            'Latitude:',
            position.coords.latitude,
          );

          console.log(
            'Longitude:',
            position.coords.longitude,
          );

          resolve();
        },
        error => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 1000,
        },
      );
    });
  };

  const handleLocationError = (error: any) => {
    console.log('LOCATION ERROR:', error);

    const code = error?.code;

    if (code === 1) {
      setLocationMessage(
        'Location permission was denied.',
      );

      Alert.alert(
        'Location Permission Required',
        'Please allow location access so we can find restaurants near you.',
        [
          {
            text: 'Open Settings',
            onPress: openAppSettings,
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
      );

      return;
    }

    if (code === 2) {
      setLocationMessage(
        'Location services are disabled.',
      );

      Alert.alert(
        'Location Unavailable',
        'Please enable Location Services and try again.',
        [
          {
            text: 'Open Settings',
            onPress: openAppSettings,
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
      );

      return;
    }

    if (code === 3) {
      setLocationMessage(
        'Location request timed out. Please try again.',
      );

      return;
    }

    setLocationMessage(
      error?.message ??
        'Unable to access your location.',
    );
  };

  const handleAllowAccess = async () => {
    if (locationLoading) {
      return;
    }

    try {
      setLocationLoading(true);
      setLocationMessage('');

      /*
       * Calling getCurrentPosition on iOS triggers
       * the native location permission prompt.
       */
      await getCurrentLocation();

      setLocationMessage('');

      // Move to registration step.
      setStep('registration');
    } catch (error) {
      handleLocationError(error);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleMaybeLater = () => {
    setLocationMessage('');
    setStep('registration');
  };

  // ============================================================
  // SEND OTP
  // ============================================================

  const handleSendOtp = async () => {
    const name = fullName.trim();
    const mobile = mobileNumber.trim();

    if (!isValidName(name)) {
      Alert.alert(
        'Invalid Name',
        'Please enter a valid full name.',
      );
      return;
    }

    if (!isValidMobile(mobile)) {
      Alert.alert(
        'Invalid Mobile Number',
        'Please enter a valid 10-digit mobile number.',
      );
      return;
    }

    if (sendingOtp) {
      return;
    }

    try {
      setSendingOtp(true);

      const fullPhoneNumber = `+91${mobile}`;

      const response =
        await authRepository.generateOtp(
          fullPhoneNumber,
        );

      if (response.status === 1) {
        setOtpSent(true);
        setOtp('');

        Alert.alert(
          'OTP Sent',
          `OTP has been sent to ${fullPhoneNumber}.`,
        );
      } else {
        Alert.alert(
          'Failed',
          response.error ??
            'Unable to generate OTP.',
        );
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.error ??
          'Something went wrong while sending OTP.',
      );
    } finally {
      setSendingOtp(false);
    }
  };

  // ============================================================
  // OTP INPUT
  // ============================================================

  const handleOtpChange = (value: string) => {
    const numericValue =
      value.replace(/\D/g, '');

    setOtp(
      numericValue.slice(0, 4),
    );
  };

  // ============================================================
  // CREATE ACCOUNT
  // ============================================================

  const handleCreateAccount = async () => {
    const name = fullName.trim();
    const mobile = mobileNumber.trim();
    const enteredOtp = otp.trim();

    if (!isValidName(name)) {
      Alert.alert(
        'Invalid Name',
        'Please enter a valid full name.',
      );
      return;
    }

    if (!isValidMobile(mobile)) {
      Alert.alert(
        'Invalid Mobile Number',
        'Please enter a valid 10-digit mobile number.',
      );
      return;
    }

    if (!otpSent) {
      Alert.alert(
        'OTP Required',
        'Please send OTP first.',
      );
      return;
    }

    if (!isValidOtp(enteredOtp)) {
      Alert.alert(
        'Invalid OTP',
        'Please enter a valid 4-digit OTP.',
      );
      return;
    }

    if (verifyingOtp) {
      return;
    }

    try {
      setVerifyingOtp(true);

      const fullPhoneNumber = `+91${mobile}`;

      const response =
        await authRepository.verifyOtp(
          fullPhoneNumber,
          enteredOtp,
          name,
        );

      if (response.status === 1) {

        /*
         * Store the exact same session returned
         * by the API, just like the existing login flow.
         */
        await SessionManager.saveSession(
          response.data,
        );

        /*
         * Session is now persisted.
         */
        onSignedIn();

      } else {
        Alert.alert(
          'Verification Failed',
          response.error ??
            'Invalid OTP.',
        );
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.error ??
          'Something went wrong while verifying OTP.',
      );
    } finally {
      setVerifyingOtp(false);
    }
  };

  // ============================================================
  // BACK TO LOCATION
  // ============================================================

  const handleBack = () => {
    if (step === 'registration') {
      setStep('location');
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }>

        {/* ================================================== */}
        {/* TOP PROGRESS */}
        {/* ================================================== */}

        <View
          style={[
            styles.topBar,
            {
              paddingTop:
                insets.top + Spacing.sm,
            },
          ]}>

          <View style={styles.indicatorWrapper}>

            <View
              style={[
                styles.indicator,
                step === 'location' &&
                  styles.activeIndicator,
              ]}
            />

            <View
              style={[
                styles.indicator,
                step === 'registration' &&
                  styles.activeIndicator,
              ]}
            />

          </View>

          {/* BACK BUTTON */}

          {step === 'registration' ? (
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.8}
              onPress={handleBack}>

              <AppText
                style={styles.backButtonIcon}>
                ←
              </AppText>

            </TouchableOpacity>
          ) : (
            <View
              style={
                styles.backButtonPlaceholder
              }
            />
          )}

        </View>

        {/* ================================================== */}
        {/* LOCATION STEP */}
        {/* ================================================== */}

        {step === 'location' ? (
          <View style={styles.screenContent}>

            <View style={styles.locationCenter}>

              <View
                style={styles.permissionCircle}>

                <LocationIcon
                  width={44}
                  height={44}
                />

              </View>

              <AppText
                style={styles.permissionTitle}>
                Find what's near you
              </AppText>

              <AppText
                style={
                  styles.permissionDescription
                }>
                Allow access to your location so we
                can show you the best restaurants and
                hidden culinary gems in your
                immediate neighborhood.
              </AppText>

              {locationMessage ? (
                <AppText
                  style={
                    styles.permissionStatusText
                  }>
                  {locationMessage}
                </AppText>
              ) : null}

            </View>

            <View style={styles.actions}>

              <TouchableOpacity
                style={styles.primaryButton}
                activeOpacity={0.8}
                onPress={handleAllowAccess}
                disabled={locationLoading}>

                {locationLoading ? (
                  <ActivityIndicator
                    color={Colors.white}
                  />
                ) : (
                  <AppText
                    style={
                      styles.primaryButtonText
                    }>
                    Allow Access
                  </AppText>
                )}

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                activeOpacity={0.8}
                onPress={handleMaybeLater}
                disabled={locationLoading}>

                <AppText
                  style={
                    styles.secondaryButtonText
                  }>
                  Maybe Later
                </AppText>

              </TouchableOpacity>

            </View>

          </View>
        ) : (

          /* ================================================== */
          /* REGISTRATION STEP */
          /* ================================================== */

          <View style={styles.screenContent}>

            <View style={styles.stepHeader}>

              <AppText
                style={styles.stepTitle}>
                Create account
              </AppText>

              <AppText
                style={styles.stepSubtitle}>
                Just a few details and you’re in.
              </AppText>

            </View>

            <View style={styles.formContent}>

              {/* FULL NAME */}

              <View style={styles.inputGroup}>

                <AppText
                  style={styles.inputLabel}>
                  Full Name
                </AppText>

                <TextInput
                  style={styles.input}
                  placeholder="Enter full name"
                  placeholderTextColor={
                    Colors.neutral400
                  }
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  editable={
                    !sendingOtp &&
                    !verifyingOtp
                  }
                />

              </View>

              {/* MOBILE */}

              <View style={styles.inputGroup}>

                <AppText
                  style={styles.inputLabel}>
                  Mobile Number
                </AppText>

                <TextInput
                  style={styles.input}
                  placeholder="Enter mobile number"
                  placeholderTextColor={
                    Colors.neutral400
                  }
                  value={mobileNumber}
                  onChangeText={text =>
                    setMobileNumber(
                      text
                        .replace(/\D/g, '')
                        .slice(0, 10),
                    )
                  }
                  keyboardType="number-pad"
                  maxLength={10}
                  editable={
                    !sendingOtp &&
                    !verifyingOtp
                  }
                />

              </View>

              {/* OTP */}

              <View style={styles.inputGroup}>

                <View
                  style={
                    styles.otpLabelRow
                  }>

                  <AppText
                    style={styles.inputLabel}>
                    OTP
                  </AppText>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSendOtp}
                    disabled={
                      sendingOtp ||
                      verifyingOtp
                    }>

                    {sendingOtp ? (
                      <ActivityIndicator
                        size="small"
                        color={
                          Colors.orangePrimary
                        }
                      />
                    ) : (
                      <AppText
                        style={[
                          styles.sendOtpText,
                          (!isValidName(
                            fullName.trim(),
                          ) ||
                            !isValidMobile(
                              mobileNumber.trim(),
                            )) &&
                            styles.disabledText,
                        ]}>
                        {otpSent
                          ? 'Resend OTP'
                          : 'Send OTP'}
                      </AppText>
                    )}

                  </TouchableOpacity>

                </View>

                <TextInput
                  style={[
                    styles.input,
                    !otpSent &&
                      styles.disabledInput,
                  ]}
                  placeholder="Enter the 4-digit OTP"
                  placeholderTextColor={
                    Colors.neutral400
                  }
                  value={otp}
                  onChangeText={
                    handleOtpChange
                  }
                  keyboardType="number-pad"
                  maxLength={4}
                  editable={
                    otpSent &&
                    !verifyingOtp
                  }
                />

              </View>

              {/* CREATE ACCOUNT */}

              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  (!otpSent ||
                    verifyingOtp) &&
                    styles.disabledButton,
                ]}
                activeOpacity={0.8}
                onPress={
                  handleCreateAccount
                }
                disabled={
                  !otpSent ||
                  verifyingOtp
                }>

                {verifyingOtp ? (
                  <ActivityIndicator
                    color={Colors.white}
                  />
                ) : (
                  <AppText
                    style={
                      styles.primaryButtonText
                    }>
                    Create account
                  </AppText>
                )}

              </TouchableOpacity>

              {/* LOGIN */}

              <AppText
                style={styles.loginText}>
                Already have an account?{' '}
                <AppText
                  style={styles.loginLink}
                  onPress={onLoginPress}>
                  Log in
                </AppText>
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
  },

  topBar: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },

  indicatorWrapper: {
    flexDirection: 'row',
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
    marginTop: Spacing.lg,
    backgroundColor: Colors.neutral50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButtonPlaceholder: {
    width: 48,
    height: 48,
    marginTop: Spacing.lg,
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
  backButtonIcon: {
    fontSize: 22,
    color: Colors.black,
    fontFamily: Fonts.interBold,
  },

  screenContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
  },

  locationCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },

  permissionCircle: {
    width: 120,
    height: 120,
    borderRadius: Radius.round,
    backgroundColor: Colors.primary50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
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
    fontSize: Typography.caption,
    fontFamily: Fonts.interMedium,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },

  actions: {
    width: '100%',
    paddingBottom: Spacing.xl,
  },

  stepHeader: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },

  formContent: {
    flex: 1,
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
    textDecorationLine: 'underline',
  },

  disabledText: {
    color: Colors.neutral400,
  },

  disabledInput: {
    backgroundColor: Colors.neutral100,
    opacity: 0.7,
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

  disabledButton: {
    opacity: 0.5,
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
});

// import React, {useState} from 'react';
// import {
//   Alert,
//   Image,
//   KeyboardAvoidingView,
//   Linking,
//   Platform,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import AppText from '../component/AppText';
// import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
// import {Colors, Fonts, Radius, Spacing, Typography} from '../theme';
// import Geolocation, {GeolocationResponse} from '@react-native-community/geolocation';
// // Change this import - use Image instead of importing SVG directly
// import LocationIcon from '../assets/icons/ic_location.svg';

// type PermissionStatus = 'idle' | 'checking' | 'granted' | 'denied' | 'blocked' | 'limited';

// type SignUpScreenProps = {
//   onSignedIn: () => void;
// };

// const SignUpScreen = ({onSignedIn}: SignUpScreenProps) => {
//   const insets = useSafeAreaInsets();
//   const [step, setStep] = useState<'location' | 'registration'>('location');
//   const [fullName, setFullName] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('idle');
//   const [permissionMessage, setPermissionMessage] = useState('');

//   const openAppSettings = async () => {
//     try {
//       await Linking.openSettings();
//     } catch {
//       Alert.alert('Unable to open settings', 'Please open Settings manually to update location permissions.');
//     }
//   };

//   const getCurrentLocation = (): Promise<GeolocationResponse> => {
//   return new Promise((resolve, reject) => {
//     Geolocation.getCurrentPosition(
//       resolve,
//       reject,
//       {
//         enableHighAccuracy: true,
//         timeout: 15000,
//         maximumAge: 1000,
//       },
//     );
//   });
// };

//   const requestLocationPermission = async (): Promise<PermissionStatus> => {
//     // For iOS, permission is requested automatically when getCurrentPosition is called.
//     // This function keeps the flow consistent and can be extended later if a dedicated
//     // permission library is added.
//     if (Platform.OS === 'ios') {
//       return 'granted';
//     }

//     return 'granted';
//   };

//   const handleLocationError = (error: any) => {
//     const code = error?.code;
//     const message = error?.message ?? 'Unable to access location.';

//     if (code === 1) {
//       setPermissionStatus('denied');
//       setPermissionMessage('Location permission was denied.');
//       Alert.alert(
//         'Location permission denied',
//         'Please allow location access so we can find nearby restaurants.',
//         [
//           {text: 'Open Settings', onPress: openAppSettings},
//           {text: 'Cancel', style: 'cancel'},
//         ],
//       );
//       return;
//     }

//     if (code === 2) {
//       setPermissionStatus('blocked');
//       setPermissionMessage('Location services are blocked or disabled. Please enable GPS.');
//       Alert.alert(
//         'Location blocked',
//         'GPS appears to be disabled or blocked. Open Settings to enable location services.',
//         [
//           {text: 'Open Settings', onPress: openAppSettings},
//           {text: 'Cancel', style: 'cancel'},
//         ],
//       );
//       return;
//     }

//     if (code === 3) {
//       setPermissionStatus('limited');
//       setPermissionMessage('Location request timed out. Please try again.');
//       return;
//     }

//     setPermissionStatus('denied');
//     setPermissionMessage(message);
//   };

//   const handleAllowAccess = async () => {
//     setPermissionStatus('checking');
//     setPermissionMessage('Checking current location permission...');

//     const status = await requestLocationPermission();

//     if (status === 'blocked') {
//       setPermissionMessage('Location permission is blocked. Open Settings to continue.');
//       Alert.alert(
//         'Location blocked',
//         'Please open the device Settings and allow location access for this app.',
//         [
//           {text: 'Open Settings', onPress: openAppSettings},
//           {text: 'Cancel', style: 'cancel'},
//         ],
//       );
//       return;
//     }

//     if (status === 'denied') {
//       setPermissionMessage('Location permission denied.');
//       return;
//     }

//     try {
//       const position = await getCurrentLocation();
//       console.log(position.coords.latitude);
//     console.log(position.coords.longitude);
//       setPermissionStatus('granted');
//       setPermissionMessage('Location found. Continue to registration');
//       setStep('registration');
//     } catch (error) {
//       handleLocationError(error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         style={styles.content}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

//         <View style={[styles.topBar, {paddingTop: insets.top + Spacing.md}]}> 
          
//         <View style={styles.indicatorContainer}>

//             <View style={styles.indicatorWrapper}>
//                 <View
//                 style={[
//                 styles.indicator,
//                 step === 'location' && styles.activeIndicator,
//                 ]}
//                 />
//             <View
//             style={[
//                 styles.indicator,
//                 step === 'registration' && styles.activeIndicator,
//             ]}
//             />
//         </View>

    
//         </View>
//         {step === 'registration' ? (
//             <TouchableOpacity style={styles.backButton} activeOpacity={0.8} onPress={() => setStep('location')}>
//               <AppText style={styles.backButtonIcon}>←</AppText>
//             </TouchableOpacity>
//           ) : (
//             <View style={styles.backButtonPlaceholder} />
//           )}
//         </View>

//         {step === 'location' ? (
//           <View style={styles.screenContent}>
//             <View style={styles.centerBlock}>
//               <View style={styles.permissionCircle}>
//                 <LocationIcon />
//               </View>
//               <AppText style={styles.permissionTitle}>Find what’s near you</AppText>
//               <AppText style={styles.permissionDescription}>
//                 Allow access to your location so we can show you the best restaurants and hidden culinary gems.
//               </AppText>
//             </View>

//             {permissionMessage ? (
//               <AppText style={styles.permissionStatusText}>{permissionMessage}</AppText>
//             ) : null}

//             <View style={styles.actions}>
//               <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={handleAllowAccess}>
//                 <AppText style={styles.primaryButtonText}>Allow Access</AppText>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8} onPress={() => setStep('registration')}>
//                 <AppText style={styles.secondaryButtonText}>Maybe Later</AppText>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ) : (
//           <View style={styles.screenContent}>
//             <View style={styles.stepHeader}>
//               <AppText style={styles.stepTitle}>Create account</AppText>
//               <AppText style={styles.stepSubtitle}>Just a few details and you’re in.</AppText>
//             </View>

//             <View style={styles.formContent}>
//               <View style={styles.inputGroup}>
//                 <AppText style={styles.inputLabel}>Full Name</AppText>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter full name"
//                   placeholderTextColor={Colors.neutral400}
//                   value={fullName}
//                   onChangeText={setFullName}
//                 />
//               </View>
//               <View style={styles.inputGroup}>
//                 <AppText style={styles.inputLabel}>Mobile Number</AppText>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter mobile number"
//                   placeholderTextColor={Colors.neutral400}
//                   value={mobileNumber}
//                   onChangeText={setMobileNumber}
//                   keyboardType="phone-pad"
//                 />
//               </View>
//               <View style={styles.inputGroup}>
//                 <View style={styles.otpLabelRow}>
//                   <AppText style={styles.inputLabel}>OTP</AppText>
//                   <TouchableOpacity activeOpacity={0.8}>
//                     <AppText style={styles.sendOtpText}>Send OTP</AppText>
//                   </TouchableOpacity>
//                 </View>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter the 6-digit OTP"
//                   placeholderTextColor={Colors.neutral400}
//                   value={otp}
//                   onChangeText={setOtp}
//                   keyboardType="number-pad"
//                 />
//               </View>
//               <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={onSignedIn}>
//                 <AppText style={styles.primaryButtonText}>Create account</AppText>
//               </TouchableOpacity>
//               <AppText style={styles.loginText}>
//                 Already have an account?{' '}
//                 <AppText style={styles.loginLink}>Log in</AppText>
//               </AppText>
//             </View>
//           </View>
//         )}
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default SignUpScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background50,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: Spacing.lg,
//     justifyContent: 'center',
//   },
//   header: {
//     marginBottom: Spacing.xl,
//   },
//   backButtonIcon: {
//   fontSize: 22,
//   color: Colors.black,
//   fontFamily: Fonts.interBold,
// },
//   stepTitle: {
//     color: Colors.black,
//     fontSize: Typography.h1,
//     fontFamily: Fonts.interBold,
//     marginBottom: Spacing.sm,
//   },
//   stepSubtitle: {
//     color: Colors.neutral600,
//     fontSize: Typography.body,
//     fontFamily: Fonts.interRegular,
//     lineHeight: 22,
//   },
//   topBar: {
//     paddingHorizontal: Spacing.lg,
//     marginBottom: Spacing.xl,
//   },
//   indicatorContainer: {
//     width: '100%',
//   alignItems: 'center',
//   marginTop: Spacing.lg,
//   marginBottom: Spacing.xxl,
// },

// indicatorWrapper: {
//   flexDirection: 'row',
//   justifyContent: 'center',
//   alignItems: 'center',
//   width: '100%',
//   gap: Spacing.sm,
// },

// indicator: {
//   flex: 1,
//   height: 6,
//   borderRadius: 3,
//   backgroundColor: Colors.neutral200,
// },

// activeIndicator: {
//   backgroundColor: Colors.orangePrimary,
// },
//   backButton: {
//   width: 48,
//   height: 48,
//   borderRadius: 24,
//   marginTop: Spacing.xs,
//   alignSelf: 'flex-start',
//   backgroundColor: Colors.neutral50,
//   justifyContent: 'center',
//   alignItems: 'center',

//   shadowColor: Colors.black,
//   shadowOpacity: 0.08,
//   shadowRadius: 10,
//   shadowOffset: {width: 0, height: 4},
//   elevation: 4,
// },
//   backButtonPlaceholder: {
//     width: 40,
//     height: 40,
//   },
//   screenContent: {
//     flex: 1,
//     justifyContent: 'space-between',
//     paddingHorizontal: Spacing.lg,
//   },
//   centerBlock: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: Spacing.lg,
//   },
//   stepHeader: {
//     paddingHorizontal: Spacing.lg,
//     paddingBottom: Spacing.lg,
//   },
//   formContent: {
//     flex: 1,
//     justifyContent: 'flex-start',
//   },
//   permissionCircle: {
//     width: 120,
//     height: 120,
//     borderRadius: Radius.round,
//     backgroundColor: Colors.primary50,
//     alignSelf: 'center',
//     marginBottom: Spacing.lg,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   locationIcon: {
//     width: 44,
//     height: 44,
//   },
//   locationIconEmoji: {
//     fontSize: 44,
//   },
//   permissionTitle: {
//     color: Colors.black,
//     fontSize: Typography.h2,
//     fontFamily: Fonts.interBold,
//     textAlign: 'center',
//     marginBottom: Spacing.sm,
//   },
//   permissionDescription: {
//     color: Colors.neutral500,
//     fontSize: Typography.body,
//     fontFamily: Fonts.interRegular,
//     textAlign: 'center',
//     lineHeight: 22,
//     marginBottom: Spacing.xl,
//   },
//   permissionStatusText: {
//     color: Colors.neutral600,
//     fontSize: Typography.body,
//     fontFamily: Fonts.interMedium,
//     textAlign: 'center',
//     marginBottom: Spacing.md,
//   },
//   primaryButton: {
//     width: '100%',
//     backgroundColor: Colors.orangePrimary,
//     borderRadius: Radius.xl,
//     paddingVertical: Spacing.md,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: Spacing.sm,
//   },
//   primaryButtonText: {
//     color: Colors.white,
//     fontSize: Typography.title,
//     fontFamily: Fonts.interBold,
//   },
//   secondaryButton: {
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: Spacing.md,
//   },
//   secondaryButtonText: {
//     color: Colors.neutral600,
//     fontSize: Typography.body,
//     fontFamily: Fonts.interMedium,
//   },
//   inputGroup: {
//     marginBottom: Spacing.md,
//   },
//   inputLabel: {
//     color: Colors.black,
//     fontSize: Typography.caption,
//     fontFamily: Fonts.interSemiBold,
//     marginBottom: Spacing.xs,
//   },
//   input: {
//     width: '100%',
//     borderRadius: Radius.xl,
//     backgroundColor: Colors.background100,
//     paddingHorizontal: Spacing.md,
//     paddingVertical: Spacing.md,
//     color: Colors.black,
//     fontSize: Typography.body,
//     fontFamily: Fonts.interRegular,
//   },
//   otpLabelRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: Spacing.xs,
//   },
//   sendOtpText: {
//     color: Colors.orangePrimary,
//     fontSize: Typography.body,
//     fontFamily: Fonts.interSemiBold,
//   },
//   loginText: {
//     color: Colors.neutral600,
//     textAlign: 'center',
//     fontSize: Typography.body,
//     fontFamily: Fonts.interRegular,
//     marginTop: Spacing.md,
//   },
//   loginLink: {
//     color: Colors.orangePrimary,
//     fontFamily: Fonts.interSemiBold,
//   },
//   actions: {
//   width: '100%',
//   marginTop: 'auto',
//   paddingHorizontal: Spacing.lg,
//   paddingBottom: Spacing.xl,
// },
// });
