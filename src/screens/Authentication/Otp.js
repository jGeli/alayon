import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  NativeSyntheticEvent,
} from 'react-native';

import OTPInputView from '@twotalltotems/react-native-otp-input';
import { FONTS, SIZES, COLORS, images, styles } from '../../constants';
// import { TextButton } from '../../components';
import TextButton from '../../components/TextButton.js';
import { useDispatch, useSelector } from 'react-redux';
import { requestSignin, verifyOTP } from '../../redux/actions/auth.actions.js';
import { CLEAR_ERROR, SET_ERROR } from '../../redux/actions/type.js';

import Clipboard from '@react-native-clipboard/clipboard';
import OtpAutoFillViewManager from 'react-native-otp-auto-fill';

const Otp = ({ navigation, route }) => {
  const { redirection, param, user } = route.params ? route.params : {};

  // const { user } = useSelector(({ auth }) => auth);
  const { errors } = useSelector(({ ui }) => ui);
  const dispatch = useDispatch();

  const [timer, setTimer] = React.useState(300);
  const [otpCode, setCode] = React.useState('');
  const [hash, setHash] = React.useState('');
  const [resend, setResend] = useState(3);

  const handleVerify = code => {
    dispatch(verifyOTP({ code, id: user.id }, null))
      .then(res => {
        console.log(res)
        let { screen } = res;
        navigation.navigate(screen ? screen : redirection, param)
      })
      ;
  };

  const copyText = () => {
    if (!hash) return;

    let text = `Your code is: ${user.code} \n \n \n ref: ${hash}`;

    Clipboard.setString(text);
  };

  const handleComplete = ({
    nativeEvent: { code },
  }: NativeSyntheticEvent<{ code: string }>) => {
    setCode(code);
    handleVerify(code);

    // Alert.alert('OTP Code Received!', code);
  };

  // This is only needed once to get the Android Signature key for SMS body
  const handleOnAndroidSignature = ({
    nativeEvent: { code },
  }: NativeSyntheticEvent<{ code: string }>) => {
    setHash(code);

    console.log('Android Signature Key for SMS body:', code);
  };

  const handleResend = code => {
    dispatch({ type: CLEAR_ERROR });
    if (resend > 5) {
      dispatch({ type: SET_ERROR, payload: { otp: 'Maximum resend attemp.' } });
      return;
    }

    let rsnd = resend;
    rsnd++;
    setResend(rsnd);
    dispatch(
      requestSignin(
        {
          providerId: user.providerId,
          provider: user.provider,
          type: user.type,
          hash,
        },
        navigation,
      ),
    );
    // dispatch(verifyOTP({code, id: user.id}, navigation));
  };

  React.useEffect(() => {
    setCode('');
    dispatch({ type: CLEAR_ERROR });
    let interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          return prevTimer;
        }
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);



  return (
    <SafeAreaView
      style={{
        // flexGrow: 1,
        // flex: 1,
        backgroundColor: COLORS.white2,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
      {/* OTP Inputs */}
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          width: '100%',
          // padding: SIZES.padding * 2,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            // margin: SIZES.padding * 2,
            backgroundColor: COLORS.darkGray2,
            padding: SIZES.padding,
            borderRadius: SIZES.semiRadius,
          }}
          onPress={copyText}>
          <Text>COPY OTP MESSAGE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCode(user.code);
            handleVerify(user.code);
          }}
          style={{
            borderWidth: 1,
            borderColor: COLORS.black,
            padding: SIZES.padding,
            borderRadius: SIZES.semiRadius,
          }}>
          <Text style={{ ...FONTS.body5, color: COLORS.black }}>{user.code}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-around',
          flexGrow: 1,
        }}>
        <View style={{ height: 100 }}>
          <Image
            resizeMode="contain"
            source={images.logo}
            style={{
              height: 50,
              alignSelf: 'center',
            }}></Image>
        </View>
        <View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: SIZES.padding,
              // borderWidth: 1,
              backgroundColor: '#F1F9FF',
            }}>
            <Text
              style={{
                ...FONTS.h3,
                // fontSize: SIZES.font * 2,
                color: COLORS.darkGray,
                fontWeight: 'bold',
              }}>
              One Time Password (OTP)
            </Text>
            <Text
              style={{
                fontSize: SIZES.base * 2,
                padding: SIZES.padding,
                color: COLORS.black,
              }}>
              Enter the 6-digit code sent to your number.
            </Text>
            <OtpAutoFillViewManager
              onComplete={handleComplete}
              onAndroidSignature={handleOnAndroidSignature}
              style={styles.box}
              length={6} // Define the length of OTP code. This is a must.
            />
            <OTPInputView
              // code={user.code}
              code={otpCode}
              pinCount={6}
              style={{
                width: '90%',
                height: 50,
              }}
              secureTextEntry={false}
              codeInputFieldStyle={{
                width: 45,
                height: 45,
                borderRadius: SIZES.base,
                // color: COLORS.red,
                backgroundColor: COLORS.lightGray2,
                // ...FONTS.h3,
                borderWidth: 1,
                borderColor: COLORS.primary,
                ...styles.textInput,
              }}
              codeInputHighlightStyle={{
                color: COLORS.primary,
              }}
              onCodeFilled={code => {
                handleVerify(code);
              }}
              onCodeChanged={e => {
                console.log(e);
                setCode(e);
                dispatch({ type: CLEAR_ERROR });
              }}
            />
            {/* Countdown Timer */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: SIZES.padding,
              }}>
              <Text
                style={{
                  color: COLORS.darkGray,
                  ...FONTS.body3,
                }}>
                Didn't get the code?
              </Text>
              <TextButton
                label={`Resend (${timer}s)`}
                disabled={timer < 290 ? false : true}
                buttonContainerStyle={{
                  marginLeft: SIZES.base,
                  backgroundColor: null,
                }}
                labelStyle={{
                  color: COLORS.primaryColor,
                  ...FONTS.h3,
                }}
                onPress={() => {
                  setTimer(300);
                  handleResend();
                }}
              />
            </View>
          </View>
          {errors.otp && (
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.danger,
                textAlign: 'center',
                margin: SIZES.padding,
              }}>
              {errors.otp}
            </Text>
          )}
        </View>
      </View>
      <View
        style={{
          // flex: 1,
          // flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: 200,
        }}>
        <View style={{ alignItems: 'center' }}>
          <Text>Copyright @ Bugtech Solutions 2023.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Otp;
