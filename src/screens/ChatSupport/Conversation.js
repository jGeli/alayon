import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import io from 'socket.io-client';
import socketServices from '../../utils/socketService';
import axios from 'axios';
import { constants } from '../../constants';
// import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Conversation ({navigation, route, }) {
const varEnv = constants.varEnv;
console.log(route)
// let Token = JSON.parse(AsyncStorage.getItem('token'))
const socket = io.connect('http://192.168.1.16:42005', {
  query: {token: varEnv.defaultToken}
}); // Replace with your server URL


  console.log("WAH")
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  console.log(inputText)
  
  
  useEffect(() => {
      socket.on('message', (data) => {
        console.log('Connected to server', data);
        setInputText(data)
      });

      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  let payload = {
    messages: inputText,
    receiverId: '649159721babd04be87588dd'
  }

  const handleSendMessage = (data) => {
    console.log(payload, "????")
    if (inputText) {
      socket.on('pong', { text: inputText })
      // socket.emit('ping', {token: varEnv.shopId})
      axios
      .post('http://192.168.1.16:42005/api/v1/support/649159721babd04be87588dd', payload,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTE1OTcyMWJhYmQwNGJlODc1ODhkZCIsImlhdCI6MTY4NzkxNDM4MiwiZXhwIjoxNjkwNTA2MzgyfQ.ri5Jm6-dbIdt_XFkY7zJSOjk8iBRzHtg8fU9JkvoPnk`
    }})   
      .then(a => console.log(a.data, "THEN"))
      .catch(err => console.log(err.response.data, "ERR"))
      setInputText('');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>
        {inputText}
      </Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
            <Text>{item.sender}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
        <TextInput
          style={{ flex: 1, marginRight: 8, paddingVertical: 4, paddingHorizontal: 8, borderWidth: 1 }}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};