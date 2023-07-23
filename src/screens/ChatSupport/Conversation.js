import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  TextInput,
  Image
} from 'react-native';
// import Sound from 'react-native-sound';

import {
  SIZES,
  FONTS,
  COLORS,
  constants,
  icons,
  images,
  styles
} from '../../constants';
import { chatList, conversationHistory } from '../../globals/data';
import { FormInput } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_CONVERSATION } from '../../redux/actions/type';
import socket from '../../utils/socket';
import { createChat, getConversation } from '../../redux/actions/customer.actions';

export default function Conversation({ route, navigation: { goBack } }) {
  const { conversation } = route.params;
  console.log(route.params)
  // console.log(conversation.sender.bannerUrl, "SESSION")
  const dispatch = useDispatch();
  const { user } = useSelector(({ auth }) => auth);

  console.log(route.params, "ROUTE")
  const [conversations, setConversations] = useState([])
  const [convo, setConvo] = useState({
    sender: {},
    receiver: {}
  })
  const [value, setValue] = useState('')


  const handleSubmit = async (e) => {
    const otherUser = conversation.receiver;

    e.preventDefault();
    console.log('THIS IS MESSAGE', value)
    console.log('THIS IS OTHER USER', otherUser)
    let newConvo = await dispatch(createChat(otherUser._id, { message: value }))
    if (newConvo) {
      handleGetConvoSummary();
    }
    setValue("")
  }


  const handleGetConvoSummary = async () => {
    const otherUser = conversation.receiver
    console.log('OTHER USER', otherUser)
    console.log(convo)
    let newConvo = await dispatch(getConversation(otherUser._id))
    console.log('INIT CONVO', newConvo)
    if (newConvo) {
      setConversations(newConvo.threads)
      setConvo(newConvo)
    }


  }





  useEffect(() => {

    if (conversation) {
      handleGetConvoSummary(conversation)


      socket.on('newMessage', (data) => {
        handleGetConvoSummary(data)
        // playSound(
        //   {
        //     title: 'mp3 in bundle',
        //     url: 'ring1.mp3',
        //     basePath: Sound.MAIN_BUNDLE
        // }
        // )
      })
    }


  }, [conversation])

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          borderBottomWidth: 1,
          borderColor: COLORS.lightGray3,
          padding: SIZES.padding
        }}
      >
        <TouchableOpacity
          onPress={() => goBack()}
        >
          <Image
            source={icons.back}
            resizeMode='contain'
            style={{
              height: 20,
              width: 20,
              marginRight: SIZES.padding2
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Image
            source={{ uri: convo.receiver.bannerUrl ? convo.receiver.bannerUrl : convo.receiver.imgUrl }}
            resizeMode='contain'
            style={{
              height: 40,
              width: 40,
              marginRight: SIZES.padding2,
              borderRadius: SIZES.radius
            }}
          />
          <View>
            <Text
              style={{
                ...FONTS.body2,
                color: COLORS.black,
                fontWeight: 'bold'
              }}
            >{convo.name}</Text>
            <Text
              style={{
                color: COLORS.gray
              }}
            >Active 1 hour ago</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'flex-end'
          }}
        >
          <TouchableOpacity>
            <Image
              source={icons.more_vertical}
              resizeMode='contain'
              style={{
                height: 25,
                width: 25
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  function renderConversation() {
    const renderItem = ({ item }) => {
      console.log('USERSOCK', item.sender == user._id)
      console.log(item.sender)
      console.log(user._id)

      return (
        <View
          style={{
            width: '100%',
            alignItems: item.sender == user._id ? 'flex-end' : 'flex-start',
          }}
        >
          <View
            style={{
              flex: 1,
              paddingTop: SIZES.base,
              width: item.message?.length <= 5 ? '15%' : 'auto',
              paddingHorizontal: SIZES.padding,
              borderWidth: 1,
              borderColor: COLORS.lightGray,
              backgroundColor: item.sender == user._id ? COLORS.primaryTransparent : COLORS.white,
              borderBottomRightRadius: item.sender == user._id ? 0 : SIZES.radius,
              borderBottomLeftRadius: item.sender == user._id ? SIZES.radius : 0,
              borderTopLeftRadius: SIZES.radius,
              borderTopRightRadius: SIZES.radius,
              margin: SIZES.padding2,
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flex: 1,
                flexGrow: 1,
                alignItems: 'center',
                height: '100%',
                // paddingVertical: SIZES.padding,
                justifyContent: 'space-between',
                alignItems: item.sender == user._id ? 'flex-end' : 'flex-start'


              }}
            >
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  // alignItems: item.role === 'user' ? 'flex-start' : 'flex-end'
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{ ...FONTS.body3, color: item.sender == user._id ? COLORS.white : COLORS.black }}
                >
                  {item.message}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: SIZES.padding2,
                }}
              >
                {item.time}
              </Text>
            </View>
          </View>
        </View>

      )
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.lightGray3,
          width: SIZES.width,
        }}
      >
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          data={conversations}
          renderItem={renderItem}
          vertical
          scrollEnabled={true}
        />
      </View>
    )
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      {renderHeader()}


      {renderConversation()}
      <View
        style={{
          paddingVertical: SIZES.base,
          // height: '10%',
          flexDirection: 'column'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around'

          }}
        >
          <TouchableOpacity
            style={{
              padding: SIZES.base,
              borderColor: COLORS.lightGray,
              borderWidth: 2,
              borderRadius: SIZES.padding
            }}
            onPress={() => setValue('ANY VACANCY?')}
          >
            <Text>
              ANY VACANCY?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: SIZES.base,
              borderColor: COLORS.lightGray,
              borderWidth: 2,
              borderRadius: SIZES.padding
            }}
            onPress={() => setValue('PICK-UP & DELIVERY')}
          >
            <Text>
              PICK-UP & DELIVERY.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: SIZES.base,
              borderColor: COLORS.lightGray,
              borderWidth: 2,
              borderRadius: SIZES.padding
            }}
            onPress={() => setValue('THANK YOU!')}
          >
            <Text>
              THANK YOU!
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            // flex: 1,
            width: '100%',
            justifyContent: 'flex-end'
          }}
        >
          <FormInput
            containerStyle={{
              bottom: 10,
              borderColor: COLORS.lightGray,
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            value={value}
            onChange={e => setValue(e)}
            onSubmitEditing={handleSubmit}
            appendComponent={
              <TouchableOpacity
                style={{
                  // flex: 1,
                  justifyContent: "center",
                  alignItems: 'center'
                }}
              >
                <Image
                  source={icons.emojis}
                  resizeMode='contain'
                  style={{
                    height: 25,
                    width: 25,
                  }}
                />
              </TouchableOpacity>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  )
}