import React, { useState, useEffect } from 'react';
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
import { requestOTP, requestSignin, verifyOTP } from '../../redux/actions/auth.actions.js';
import { CLEAR_ERROR, SET_ERROR } from '../../redux/actions/type.js';

import Clipboard from '@react-native-clipboard/clipboard';
import OtpAutoFillViewManager from 'react-native-otp-auto-fill';
import { createBulkBasket } from '../../redux/actions/customer.actions';

const Otp = ({ navigation, route }) => {
  const { redirection, param, user } = route.params ? route.params : {};

  // const { user } = useSelector(({ auth }) => auth);
  const { errors } = useSelector(({ ui }) => ui);
  const dispatch = useDispatch();

  const [timer, setTimer] = React.useState(300);
  const [otpCode, setCode] = React.useState('');
  const [hash, setHash] = React.useState('');
  const [resend, setResend] = useState(0);
  const [countdown, setCountdown] = useState(0);

  const handleVerify = code => {
    let { baskets } = param ? param : { baskets: [] }
    dispatch(verifyOTP({ code, id: user.id }, null))
      .then(res => {
        if (redirection === 'OrderSummary') {
          navigation.navigate(redirection, { ...param })
        } else {
          navigation.navigate('MainCustomer', route.params)
        }
      })
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
        navigation, route.params
      ),
    );
  };
  
  const handleSendOTP = async () => {
    dispatch({ type: CLEAR_ERROR });
    if (resend > 5) {
      dispatch({ type: SET_ERROR, payload: { otp: 'Maximum Attemp Reached!' } });
      return;
    }

    let rsnd = resend;
    rsnd++;
    setResend(rsnd);
    setCountdown(30)

    dispatch(requestOTP({ providerId: user.providerId, providerType: user.type, hash }))
  }

  function renderSendOTPButton() {
    return (
      <View style={{ width: SIZES.width, alignItems: 'center', justifyContent: 'center' }}>
        <TextButton
          label={resend ? `RESEND ${countdown === 0 ? 'OTP' : `(${countdown})`}` : 'SEND OTP'}
          buttonContainerStyle={{
            height: 40,
            width: '80%',
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius2,
            backgroundColor: countdown === 0 ? COLORS.primary : COLORS.info500,
          }}
          labelStyle={{
            color: COLORS.white,
            fontWeight: '600',
          }}

          onPress={() => {
            if (countdown === 0) {
              handleSendOTP();
            }
          }}
        />
      </View>
    )
  }

  useEffect(() => {
    let interval;
      
      interval = setInterval(() => {
        // Update the countdown
        setCountdown((prevCountdown) => {
          if(prevCountdown > 0) {
            return prevCountdown - 1;
          } else {
            return prevCountdown
          }
        });

       console.log(resend, "RESEND COUNT:", resend)
      }, 1000);
    // Clean up the interval on component unmount
    return () => {
    clearInterval(interval)
    }
  }, []);

  useEffect(() => {
    setCode('');
    dispatch({ type: CLEAR_ERROR });
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
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: 15,
          height: 200,
        }}>
      {renderSendOTPButton()}

        <View style={{ alignItems: 'center' }}>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Otp;
