import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  TextInput
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
import { chatList, conversationHistory } from '../../globals/data';
import { Image } from 'react-native';
import { FormInput } from '../../components';

 export default function Conversation({route, navigation: {goBack}}) {
  let {shop} = route.params
  console.log(route.params, "ROUTE")
  const [conversations, setConversations] = useState([])
  const [value, setValue] = useState('')

  
  // let messages = chatList.find(a => {
  //   a.shop_name === shop

  //   let newObj = {
        
  //   }
    

  //   return a
  // })
   const handleGetConvoSummary = () => {

     console.log(shop)
     let shopConvos = conversationHistory.find(a => a.shopId === shop.id);

     if (shopConvos) {
       setConversations(shopConvos.thread)

     }


   }




  useEffect(() => {
    handleGetConvoSummary()
    // setConversation({ ...obj, message })
}, [shop])

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
          source={shop.bannerUrl}
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
        >{shop.shop_name}</Text>
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
    const renderItem = ({item}) => {
      return (
        <View
          style={{
            alignItems: item.role === 'user' ? 'flex-start' : 'flex-end',
          }}
        >
        <View
          style={{
            flex: 1,
            padding: SIZES.padding,
            width: '70%',
            // borderWidth: 1,
            borderColor: COLORS.lightGray,
            backgroundColor: item.role === 'shop' ? COLORS.white : COLORS.primaryTransparent,
            borderBottomRightRadius: item.role === 'user' ? SIZES.radius : 0,
            borderBottomLeftRadius: item.role === 'shop' ? SIZES.radius : 0,
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
              paddingVertical: SIZES.padding,
              justifyContent: 'space-between',
              alignItems: item.role === 'user' ? 'flex-start' : 'flex-end'

              
            }}
          >
            <View
              style={{
                width: '90%',
                height: '100%',
                // alignItems: item.role === 'user' ? 'flex-start' : 'flex-end'
                alignItems: 'flex-start'
              }}
            >
          <Text
            style={{...FONTS.body2, color: COLORS.black,}}
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
          // flex: 1,
          width: '100%',
          height: '10%',
          // borderWidth: 1,
          borderColor: COLORS.lightGray3,
          justifyContent: 'center',
          paddingHorizontal: SIZES.base,
          alignItems: 'flex-end',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // borderWidth: 1,
            width: '100%'
          }}
        >
          <View
            style={{
              width: '10%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              top: 10,
              right: 5,
              bottom: 0
            }}
          >
            <TouchableOpacity
              style={{
              padding: SIZES.base / 2,
              // borderWidth: 1,
              borderRadius: SIZES.radius,
              tintColor: COLORS.darkGray

              }}
            >
        <Image 
          source={icons.add}
          resizeMode='contain'
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.primary
          }}
        />
        </TouchableOpacity>
        </View>
        <FormInput 
          containerStyle={{
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          value={value}
          onChange={e => setValue(e)}
          
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