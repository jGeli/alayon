import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

import {
  FONTS,
  SIZES,
  COLORS,
  icons,
  images,
  styles,
  constants,
} from '../../constants';

import { getHash, requestHint } from 'react-native-otp-verify';
import axios from 'axios';
// import { FormInput, CustomSwitch, TextButton, TextIconButton } from '../../components';
import FormInput from '../../components/FormInput.js';
import TextButton from '../../components/TextButton.js';
import TextIconButton from '../../components/TextIconButton.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser, requestSignin } from '../../redux/actions/auth.actions.js';
import { getFormattedPhone, validatePhone } from '../../utils/helpers.js';
import { getToken } from '../../redux/auth-header';

const SignIn = ({ navigation, route }) => {
  const { redirection, param } = route.params ? route.params : {};
  const dispatch = useDispatch();

  const [phone, setPhone] = React.useState('');
  const [hash, setHash] = React.useState('');
  const [phoneError, setPhoneError] = React.useState('');

  const handleSignInRequest = () => {
    let { isValid, errorMsg } = validatePhone(phone);
    if (!isValid) {
      console.log(errorMsg);
      setPhoneError(errorMsg);
      return;
    }
    dispatch(
      requestSignin(
        {
          providerId: phone,
          provider: 'SMS',
          type: 'customer',
          hash,
        },
        navigation, route.params
      ),
    );
  };



  const handleHome = () => {
    console.log('SET HOME')
    if (redirection === 'CustomerAccount') {
      navigation.navigate('MainCustomer', {})
    } else {
      navigation.navigate(redirection, param ? param : {})
    }

  }

  useEffect(() => {
    getHash()
      .then(e => setHash(e))
      .catch(console.log);

    requestHint()
      .then(e => {
        setPhone(getFormattedPhone(e));
      })
      .catch(console.log);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: SIZES.padding
        }}>
        <TouchableOpacity
          style={{
            // position: 'absolute',
            // top: 10,
            // right: 30,
            zIndex: 10
          }}
          onPress={() => handleHome()}>
          <Image
            source={icons.back}
            style={{ height: 25, width: 25, tintColor: COLORS.primary }}
          />
        </TouchableOpacity>

      </View>
      <View
        style={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
        <Image
          resizeMode="contain"
          source={images.logo}
          style={{
            height: 50,
            alignSelf: 'center',
          }}></Image>
      </View>
      <View
        style={{
          padding: SIZES.padding * 2,
          flexGrow: 1,
          // flex: 1,
          width: '100%',
        }}>
        <FormInput
          keyboardType="phone-pad"
          autoCompleteType="phone"
          onChange={value => {
            setPhoneError('');
            setPhone(value);
          }}
          value={phone}
          containerStyle={embeddedStyles.container}
          inputStyle={styles.textInput}
          maxLength={10}
          errorMsg={phoneError}
          prependComponent={
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.black,
                }}>
                +63 |
              </Text>
            </View>
          }
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Image
                source={
                  validatePhone(phone).isValid ? icons.correct : icons.cross
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    phone == '' && phone.length < 10
                      ? COLORS.gray
                      : validatePhone(phone).isValid
                        ? COLORS.green
                        : COLORS.red,
                }}
              />
            </View>
          }
        />
        <TextButton
          label="Sign In"
          buttonContainerStyle={{
            height: 40,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius2,
            backgroundColor: COLORS.primary,
          }}
          labelStyle={{
            color: COLORS.white,
            fontWeight: '700',
          }}
          onPress={() => handleSignInRequest()}
        />
        <View>
          <View
            style={{
              flexDirection: 'row',
              margin: 10,
              justifyContent: 'center',
              // alignItems: 'center'
            }}>
            <Text style={{ ...FONTS.h4, color: COLORS.black }}> OR </Text>
          </View>
          <TextIconButton
            containerStyle={{
              height: 40,
              alignItems: 'center',
              // marginTop: SIZES.radius2,
              borderRadius: SIZES.radius2,
              // borderWidth: 1,
              backgroundColor: COLORS.blue,
            }}
            icon={icons.fb}
            iconPosition="LEFT"
            iconStyle={{
              tintColor: COLORS.white,
            }}
            label="Sign In with Facebook"
            labelStyle={{
              marginLeft: SIZES.radius,
              color: COLORS.white,
              fontWeight: '700',
            }}
            onPress={() => console.log('FB')}
          />
          {/* Google */}
          <TextIconButton
            containerStyle={{
              height: 40,
              alignItems: 'center',
              marginTop: SIZES.base,
              borderRadius: SIZES.radius2,
              borderWidth: 1,
              backgroundColor: COLORS.lightGray2,
            }}
            icon={icons.google}
            iconPosition="LEFT"
            iconStyle={{
              tintColor: null,
            }}
            label="Sign In with Google"
            labelStyle={{
              marginLeft: SIZES.radius,
              fontWeight: '700',
            }}
            onPress={async () => {
              console.log(await getToken());
              console.log('GET TOKEN');
            }}
          />
        </View>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="cover"
          style={{ width: 300, height: 150 }}
          source={images.chariot}></Image>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const embeddedStyles = StyleSheet.create({
  container: {
    // backgroundColor: COLORS.red
  },
  // textInput: {
  //   color: COLORS.black,
  //   fontSize: SIZES.padding * 2,
  // },
  // linearGradient: {
  //   flex: 1,
  //   paddingLeft: 15,
  //   paddingRight: 15,
  //   borderRadius: 5,
  // },
});
