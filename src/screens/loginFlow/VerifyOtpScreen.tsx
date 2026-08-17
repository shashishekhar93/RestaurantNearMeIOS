import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import AppText from '../../component/AppText';
import {
  Colors,
  Fonts,
  Radius,
  Spacing,
  Typography,
} from '../../theme';

import type {RootStackParamList} from '../../navigation/types';
import authRepository from '../../api/repository/authRepository';
import {SessionManager} from '../../utils/SessionManager';
import Geolocation from '@react-native-community/geolocation';
import OtpIcon from '../../assets/icons/ic_otp.svg';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'OTPScreen'
>;

const VerifyOtpScreen = ({navigation, route}: Props) => {
  const phoneNumber = route.params?.phoneNumber ?? '';

  const [otp, setOtp] = useState(['', '', '', '']);

  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(25);

  const input1 = useRef<TextInput>(null);
  const input2 = useRef<TextInput>(null);
  const input3 = useRef<TextInput>(null);
  const input4 = useRef<TextInput>(null);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (
    value: string,
    index: number,
  ) => {
    if (value.length > 1) return;

    const temp = [...otp];

    temp[index] = value;

    setOtp(temp);

    if (value !== '') {
      switch (index) {
        case 0:
          input2.current?.focus();
          break;

        case 1:
          input3.current?.focus();
          break;

        case 2:
          input4.current?.focus();
          break;

        case 3:
          Keyboard.dismiss();
          break;
      }
    }
  };

  const handleBackspace = (
    value: string,
    index: number,
  ) => {
    if (value !== '') return;

    switch (index) {
      case 1:
        input1.current?.focus();
        break;

      case 2:
        input2.current?.focus();
        break;

      case 3:
        input3.current?.focus();
        break;
    }
  };

  const verifyOtp = async () => {
    const enteredOtp = otp.join('');

    if (enteredOtp.length != 4) {
      Alert.alert('Please enter OTP');
      return;
    }

    try {
      setLoading(true);

      const response =
        await authRepository.verifyOtp(
          phoneNumber,
          enteredOtp,
          '',
        );

      setLoading(false);

      // if (response.status === 1) {
      //   await SessionManager.saveSession(response.data);

      //       Geolocation.getCurrentPosition(
      //           () => {
      //               navigation.reset({
      //               index: 0,
      //               routes: [
      //                 {
      //                   name: 'BottomTabs',
      //                 },
      //               ],
      //             });
      //           },
      //           () => {
      //               navigation.reset({
      //               index: 0,
      //               routes: [
      //                 {
      //                   name: 'LocationPermissionScreen',
      //                 },
      //               ],
      //             });
      //           },
      //       );
      // } 
      if (response.status === 1) {
          await SessionManager.saveSession(response.data);

          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'BottomTabs',
              },
            ],
          });
        }
      else {
        Alert.alert(
          'Error',
          response.error ?? 'Invalid OTP',
        );
      }
    } catch (e: any) {
      setLoading(false);

      Alert.alert(
        'Error',
        e?.response?.data?.error ??
          'Something went wrong',
      );
    }
  };

  const resendOtp = async () => {
    try {
      setTimer(25);

      await authRepository.generateOtp(phoneNumber);

      Alert.alert('OTP Sent');
    } catch {
      Alert.alert('Unable to resend OTP');
    }
  };

  return (
    <View style={styles.container}>

      <OtpIcon
        width={170}
        height={170}
        style={styles.image}
    />

      <AppText style={styles.title}>
        Enter the code
      </AppText>

      <AppText style={styles.subtitle}>
        A verification code was sent to
      </AppText>

      <AppText style={styles.mobile}>
        {phoneNumber}
      </AppText>

      <View style={styles.otpContainer}>

        <TextInput
          ref={input1}
          value={otp[0]}
          onChangeText={text =>
            handleOtpChange(text, 0)
          }
          keyboardType="number-pad"
          maxLength={1}
          style={styles.otp}
        />

        <TextInput
          ref={input2}
          value={otp[1]}
          onChangeText={text =>
            handleOtpChange(text, 1)
          }
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace')
              handleBackspace(otp[1], 1);
          }}
          keyboardType="number-pad"
          maxLength={1}
          style={styles.otp}
        />

        <TextInput
          ref={input3}
          value={otp[2]}
          onChangeText={text =>
            handleOtpChange(text, 2)
          }
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace')
              handleBackspace(otp[2], 2);
          }}
          keyboardType="number-pad"
          maxLength={1}
          style={styles.otp}
        />

        <TextInput
          ref={input4}
          value={otp[3]}
          onChangeText={text =>
            handleOtpChange(text, 3)
          }
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace')
              handleBackspace(otp[3], 3);
          }}
          keyboardType="number-pad"
          maxLength={1}
          style={styles.otp}
        />

      </View>

      {timer > 0 ? (
        <AppText style={styles.timer}>
          Resend code in {timer}s
        </AppText>
      ) : (
        <TouchableOpacity onPress={resendOtp}>
          <AppText style={styles.resend}>
            Resend OTP
          </AppText>
        </TouchableOpacity>
      )}

      <AppText style={styles.terms}>
        By clicking login you agree to our
        Terms & Conditions
      </AppText>

      <TouchableOpacity
        style={styles.button}
        onPress={verifyOtp}
        disabled={loading}>

        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <AppText style={styles.buttonText}>
            Login
          </AppText>
        )}

      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
    padding: Spacing.lg,
    justifyContent: 'center',
  },

  image: {
    width: 170,
    height: 170,
    alignSelf: 'center',
    marginBottom: 24,
  },

  title: {
    fontSize: Typography.h2,
    fontFamily: Fonts.interBold,
    color: Colors.black,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 12,
    fontSize: Typography.body,
    textAlign: 'center',
    color: Colors.neutral600,
  },

  mobile: {
    marginTop: 10,
    textAlign: 'center',
    fontFamily: Fonts.interBold,
    fontSize: Typography.body,
    color: Colors.orangePrimary,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 40,
  },

  otp: {
    width: 60,
    height: 60,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.neutral300,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: Fonts.interBold,
    backgroundColor: Colors.white,
  },

  timer: {
    marginTop: 24,
    textAlign: 'center',
    color: Colors.neutral600,
  },

  resend: {
    marginTop: 24,
    textAlign: 'center',
    color: Colors.orangePrimary,
    fontFamily: Fonts.interBold,
  },

  terms: {
    marginTop: 32,
    textAlign: 'center',
    color: Colors.neutral500,
    fontSize: 12,
  },

  button: {
    marginTop: 28,
    backgroundColor: Colors.orangePrimary,
    borderRadius: Radius.xl,
    paddingVertical: 18,
    alignItems: 'center',
  },

  buttonText: {
    color: Colors.white,
    fontFamily: Fonts.interBold,
    fontSize: Typography.title,
  },

});

export default VerifyOtpScreen;