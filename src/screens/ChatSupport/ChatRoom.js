import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { styles, COLORS, FONTS, SIZES, icons, images } from '../../constants';
import { io } from 'socket.io-client';

export default function chatRoom ({ match }) {
  const chatRoomId = match.params.id;
  const socket = io('http://localhost:8000', {
    query: {
      token: AsyncStorage.getItem('token')
    }
  })


  return (
    <SafeAreaView style={styles.container}>

    </SafeAreaView>
  )
}
