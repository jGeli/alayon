import React, { Fragment, useEffect, useState } from "react";
import PushNotification, {Importance} from "react-native-push-notification";
import {
  StyleSheet,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import socket from "./socket";
import { showNotification, handleScheduleNotification, handleCancel } from './notification.android'

export default function PushController() {
  
  const handleConfigure = () => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        // process the notification
        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "403718726191",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true
    });
    
    PushNotification.createChannel(
      {
        channelId:  '420', // (required)
        channelName: "ALAYON NOTIFICATIONS", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        soundName: 'default',
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }
  
 
  useEffect(() => {
        handleConfigure()
        socket.on('newMessage', (notification) => {
        console.log('NEW NOTIF', notification.threads[0].message)
          showNotification({title: "New Message", message: notification.threads[0].message})
        })
        socket.on('newNotification', (notification) => {
            showNotification(notification)
          })
  }, [])


    return (
      <Fragment>
      
      </Fragment>
    );
}
