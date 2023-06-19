import * as React from 'react';
import {
  Alert,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import OtpAutoFillViewManager from 'react-native-otp-auto-fill';
import {COLORS} from '../../constants';

export default function App() {
  const [otp, setOtp] = React.useState('');
  const [signature, setSignature] = React.useState('');

  const handleComplete = ({
    nativeEvent: {code},
  }: NativeSyntheticEvent<{code: string}>) => {
    setOtp(code);
    Alert.alert('OTP Code Received!', code);
  };

  // This is only needed once to get the Android Signature key for SMS body
  const handleOnAndroidSignature = ({
    nativeEvent: {code},
  }: NativeSyntheticEvent<{code: string}>) => {
    setSignature(code);
    console.log('Android Signature Key for SMS body:', code);
  };

  return (
    <View style={styles.container}>
      <OtpAutoFillViewManager
        onComplete={handleComplete}
        onAndroidSignature={handleOnAndroidSignature}
        style={styles.box}
        length={4} // Define the length of OTP code. This is a must.
      />
      <Text>OTP CODE</Text>
      <Text style={{color: COLORS.black}}>{otp}</Text>
      <Text>SIGNATURE CODE</Text>
      <Text style={{color: COLORS.black}}>{signature}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 300,
    height: 55,
    marginVertical: 20,
    borderColor: 'red',
    borderWidth: 1,
  },
});
