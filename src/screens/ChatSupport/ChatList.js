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
import { useDispatch, useSelector } from 'react-redux';
import { getConversation } from '../../redux/actions/data.actions';
import { SET_CONVERSATION } from '../../redux/actions/type';
import axios from 'axios';
import moment from 'moment';

 export default function ChatList({navigation}) {
  const dispatch = useDispatch();
  const [list, setList] = useState([])
  const { user: { locations } } = useSelector(({ auth }) => auth);
  const varEnv = constants.varEnv;
  // console.log(data)
  
  console.log("AAAAAAAAAAAAAAAAAAAAa")
  // console.log(dispatch({type: SET_CONVERSATION}, "DATA"))


  useEffect(() => {
    // const handleData = ({data}) => {
    //   console.log(data)
    // }
    // dispatch(getConversation());
    // dispatch(getConversation())
  // console.log(setList(data), "AASS")

    // dispatch({type: SET_CONVERSATION}, "DATA")
    axios
    .get(`${varEnv.apiUrl}/support`)
    .then(res => {
      console.log('MESSAGE');
      console.log(res.data);
      setList(res.data)
      // dispatch({type: SET_CONVERSATION, payload: res.data});
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    });
    
  }, []);

  console.log(list, 'letse')

  
  function renderChatList() {
    const renderItem = ({item}) => {
      // console.log(data)
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
            // source={images.defaultBanner}
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
                {item.senderId?.fistName + ' ' + item.senderId?.lastName}
              </Text>
              <Text
                style={{
                  ...FONTS.h5,
                  color: COLORS.darkGray,
                }}
              >
                {/* [Last Message in Conversation] */}
                {cutString(String(item.thread[-0].messages), 40)}
                {/* {item.latestChat} */}
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
          keyExtractor={(item, index) => `${index}`}
          data={list.d}
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