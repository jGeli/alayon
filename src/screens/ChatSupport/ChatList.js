import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList
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

 export default function ChatList({navigation}) {

  function renderChatList() {
    const renderItem = ({item}) => {
      console.log(item)
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('Conversation', {shop: item})}
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
            // source={chatList.bannerUrl}
            source={item.bannerUrl}
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
                {item.shop_name}
              </Text>
              <Text
                style={{
                  ...FONTS.h5,
                  color: COLORS.darkGray,
                }}
              >
                {/* [Last Message in Conversation] */}
                {cutString(String(item.latestChat), 40)}
                {/* {item.latestChat} */}
              </Text>
            </View>
           
          </View>
          
          <Text
              style={{
                width: '30%',
                textAlign: 'left'
              }}
            >{item.date}</Text>   
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
          keyExtractor={(item, index) => `${index}`}
          data={chatList}
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

        {renderChatList()}
      </View>
      
    </SafeAreaView>
  )
 }