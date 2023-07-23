import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';

import {
  SIZES,
  FONTS,
  COLORS,
  constants,
  icons,
  images,
  styles
} from '../../constants';
import { chatList } from '../../globals/data';
import { cutString } from '../../utils/helpers';
import { Badge } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CONVERSATION } from '../../redux/actions/type';
import axios from 'axios';
// import Sound from 'react-native-sound';
import moment from 'moment';
import socket from '../../utils/socket';
import { getChatLists, getConversation } from '../../redux/actions/customer.actions';


export default function ChatList({ navigation }) {
  const dispatch = useDispatch();
  const [list, setList] = useState([])
  const { user } = useSelector(({ auth }) => auth);
  const [chats, setChats] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const soundRef = useRef();

  const varEnv = constants.varEnv;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchChatLists();
  }, []);


  // function playSound(testInfo) {
  //   soundRef.current = null;
  //     const callback = (error, sound) => {
  //         if (error) {
  //             Alert.alert('error', error.message);
  //             return;
  //         }

  //         sound.play(() => {
  //             // Success counts as getting to the end
  //             // Release when it's done so we're not using up resources
  //             sound.release();
  //         });
  //     };
  //     let sound = new Sound(testInfo.url, testInfo.basePath, error => callback(error, sound));
  // }

  const fetchChatLists = async () => {
    let chatLists = await dispatch(getChatLists())

    let newChats = chatLists.map(a => {
      let newObj = {
        ...a,
        date: a.updatedAt,
        name: a.sender._id == user._id ? a.receiver.providerId : a.sender.providerId,
        latestChat: a.threads[a.threads.length - 1].message,
        imgUrl: a.sender._id == user._id ? a.receiver.imgUrl : a.sender.imgUrl
      }
      return newObj
    })

    console.log('NEW CHATS', newChats)
    setChats(newChats)

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }


  useEffect(() => {
    console.log("first")
    fetchChatLists()
    socket.on('newMessage', (data) => {
      console.log('NEW MESSAGE LIVE', data)
      // playSound(
      //   {
      //     title: 'mp3 in bundle',
      //     url: 'ring1.mp3',
      //     basePath: Sound.MAIN_BUNDLE
      // }
      // )
      fetchChatLists()

    })

  }, [])



  function renderChatList() {
    const renderItem = ({ item }) => {
      // console.log(data)
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('Conversation', { conversation: item })}
        >
          <View
            style={{
              // borderWidth: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              width: '100%',
              paddingVertical: SIZES.padding,
              backgroundColor: COLORS.white
            }}
          >
            <Image
              // source={images.defaultBanner}
              source={{ uri: item.bannerUrl }}
              resizeMode='contain'
              style={{
                height: 50,
                width: 50,
                // borderWidth: 1,
                borderRadius: SIZES.radius,
                marginRight: SIZES.padding
              }}
            />
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '70%',
                padding: SIZES.base,
                borderBottomWidth: 1,
                borderColor: COLORS.lightGray

              }}
            >
              <View
                style={{
                  flexDirection: 'column',
                  flexGrow: 1,
                }}
              >
                <Text
                  style={{
                    ...FONTS.body2,
                    // fontSize: SIZES.font,
                    fontWeight: 'bold',
                    color: COLORS.black,

                    // textAlign: 'center',
                  }}
                >
                  {/* [Chat Name Test Name long] */}
                  {/* {item.senderId?.fistName + ' ' + item.senderId?.lastName} */}
                  {item.name}
                </Text>
                <Text
                  style={{
                    ...FONTS.h5,
                    color: COLORS.darkGray,
                  }}
                >
                  {/* [Last Message in Conversation] */}
                  {/* {cutString(String(item.thread[-0].messages), 40)} */}
                  {item.latestChat}
                </Text>
              </View>

            </View>

            <Text
              style={{
                width: '30%',
                textAlign: 'left'
              }}
            >{moment(item.createdAt).format('MM/DD/YY')}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <View
        style={{
          flex: 1,
        }}
      >

        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item, index) => `${index}`}
          data={chats}
          vertical
          scrollEnabled={true}
          renderItem={renderItem}
        />
      </View>
    )

  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: SIZES.width,
          height: '100%',
          // margin: SIZES.padding,
          paddingHorizontal: SIZES.padding
        }}
      >

        {chats.length !== 0 ? renderChatList() :
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text>
              No Conversation to display.
            </Text>
          </View>}
      </View>

    </SafeAreaView>
  )
}