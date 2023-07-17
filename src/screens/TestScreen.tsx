//import liraries
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Switch } from 'react-native';
import { COLORS, FONTS, SIZES, icons, constants } from '../constants';
import { showNotification, handleScheduleNotification, handleCancel } from '../utils/notification.android'

// create a component
export default function App({ navigation, route }) {




  function renderHeader() {
    return (
      <View
        style={styles.header}>
        <TouchableOpacity
          style={{ margin: SIZES.padding, marginRight: SIZES.padding * 2 }}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            style={{ height: 20, width: 20, tintColor: COLORS.primary }}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...FONTS.body2,
            color: COLORS.black,
            // fontWeight: 'bold',
          }}>
          Test Screen
        </Text>

        <View></View>
      </View>
    );
  }



  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <View style={styles.contentContainer}>
        <Text style={{ ...FONTS.h4 }}>Push Notification</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={() => showNotification('ORDER REQUEST SENT', 'Waiting for shop confirmation')}>
          <View style={styles.button}>
            <Text style={styles.buttonTitle}>Click me to get notification</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={() => handleScheduleNotification('ORDER SCHEDULE', 'SCHEDULED ORDER REQUEST!')}>
          <View style={styles.button}>
            <Text style={styles.buttonTitle}>Click me to get notification after 5 seconds</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={() => handleCancel()}>
          <View style={styles.button}>
            <Text style={styles.buttonTitle}>Click me to cancel all notifications</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // flex: 1,
    backgroundColor: COLORS.lightGray3,
    paddingBottom: SIZES.padding * 3,
    // alignItems: 'center'
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    elevation: 5,
    width: '100%'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    padding: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    marginTop: 16
  },
  buttonTitle: {
    color: COLORS.white
  }

});

