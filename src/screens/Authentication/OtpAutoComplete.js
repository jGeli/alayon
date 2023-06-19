import * as React from 'react';

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  getHash,
  requestHint,
  startOtpListener,
  useOtpVerify,
  removeListener,
} from 'react-native-otp-verify';
import OtpScreen from './OtpAutoComplete1';
import Clipboard from '@react-native-clipboard/clipboard';
import {COLORS, SIZES} from '../../constants';

export default function App() {
  const [hashFromMethod, setHashFromMethod] = React.useState();
  const [otpFromMethod, setOtpFromMethod] = React.useState();
  const [hint, setHint] = React.useState();
  const [listening, setIsListening] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [msg, setMsg] = React.useState('');

  // using hook - you can use the startListener and stopListener to manually trigger listeners again.
  const {hash, otp, timeoutError, stopListener, startListener, message} =
    useOtpVerify();

  const handleListener = val => {
    if (val) {
      startListener();
    } else {
      stopListener();
    }
    setIsListening(val);
  };

  const copyText = () => {
    if (!hash) return;

    let text = `Your ExampleApp code is: [SampleCode] \n \n \n ref#: ${hash}`;

    Clipboard.setString(text);
  };

  // using methods
  React.useEffect(() => {
    getHash().then(setHashFromMethod).catch(console.log);
    requestHint().then(setHint).catch(console.log);
    startOtpListener(setOtpFromMethod);

    startOtpListener(message => {
      // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
      console.log(message);
      setMsg(message);
      const otp = /(\d{4})/g.exec(message)[1];
      setCode(otp);
    });

    return () => removeListener();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.resultView}>
        <Text style={styles.resultHeader}>Using Methods</Text>
        <Text>Your Hash is: {hashFromMethod}</Text>
        <Text>Your message is: {otpFromMethod}</Text>
        <Text>Selected Mobile Number is: {hint}</Text>
      </View>
      <View style={styles.resultView}>
        <Text style={styles.resultHeader}>Using Hook</Text>
        <Text>Your Hash is: {hash}</Text>
        <Text>Your otp is: {otp}</Text>
        <Text>Timeout Error: {String(timeoutError)}</Text>
      </View>
      <View style={styles.resultView}>
        <Text style={styles.resultHeader}>Using Own</Text>
        <Text>OTP Message: {message}</Text>
        <Text>Your otp Code is: {code}</Text>
        <Text>Timeout Error: {String(timeoutError)}</Text>
      </View>
      <Text>{message}</Text>
      <Text>
        {listening ? 'OTP Listener started' : 'OTP Listener not started.'}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
          margin: SIZES.padding2,
        }}>
        <Button
          title="Start"
          style={{margin: SIZES.padding}}
          onPress={() => handleListener(true)}
        />
        <Button
          title="Stop"
          style={{margin: SIZES.padding}}
          onPress={() => handleListener(false)}
        />
      </View>
      <TouchableOpacity
        style={{
          margin: SIZES.padding * 2,
          backgroundColor: COLORS.darkGray2,
          padding: SIZES.padding,
          borderRadius: SIZES.semiRadius,
        }}
        onPress={copyText}>
        <Text>COPY OTP MESSAGE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultView: {
    margin: 10,
  },
  resultHeader: {
    fontSize: 18,
    marginBottom: 5,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
