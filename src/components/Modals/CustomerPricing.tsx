//import liraries
import React, { Component, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';
import { COLORS, FONTS, SIZES, icons, styles } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  CLEAR_CUSTOMER_ORDER,
  SET_CUSTOMER_BASKETS,
  SET_CUSTOMER_ORDER,
} from '../../redux/actions/type';
import { setCustomerBaskets } from '../../utils/AsyncStorage';
import {
  createBasket,
} from '../../redux/actions/customer.actions';
import { groupPricing } from '../../utils/helpers';

// create a component
const CustomerPricing = ({ active, onClose, service, onSelect }) => {

  const modalAnimatedValue = useRef(new Animated.Value(0)).current;


  const handleSelect = item => {
      console.log(item)
     };

  useEffect(() => {
    if (!active) {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [active]);
  
  const renderPrices = () => {
  let prices = groupPricing(service && service.cloths ? service.cloths : []);
        console.log(prices, 'PRICES')
      return(
      <>
      {prices.length !== 0 ? prices.map((a, index) => {
        return(
          <TouchableOpacity
          onPress={() => onSelect(a)}
          disabled={a.price === 'Unavailable'}
          key={index}
          style={{
            flex: 1,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: SIZES.padding
          }}
        >
        <View
          style={{width: '70%'}}
        >
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.black,
              fontWeight: 'bold'
            }}
          >{a.name}</Text>
          <Text
           style={{
            ...FONTS.body5,
            color: COLORS.transparentBlack7
          }}
          >{a.description}</Text>
          </View>
          <View
            style={{width: '30%'}}
          >
          
          <Text
            style={{
            ...FONTS.body4,
            color: COLORS.black,
            // fontWeight: 'bold',
            textAlign: 'right'
            }}
          >{a.subTitle}</Text>
          </View>

        </TouchableOpacity>
        )
      })
      : 
      <Text
        style={{
        ...FONTS.h3
        }}
      >No Pricing Available</Text>
      }
            
            </>
        )
  
  
  }

  
  // console.log(Object.keys(service))

  return (
    <Modal
      // animationType="fade" 
      transparent={true} visible={active}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.transparentBlack7,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableWithoutFeedback onPress={() => onClose()}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            flex: 1,
            position: 'absolute',
            left: 0,
            // top: 0,
            // minHeight: Dimensions.get('window').height * 0.3,
            right: 0,
            bottom: 0,
            paddingBottom: SIZES.padding * 3,
            width: '100%',
            justifyContent: 'space-between',
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white3,
          }}>
         
          <View
            style={{
              flex: 1,
              borderTopRightRadius: SIZES.padding,
              borderTopLeftRadius: SIZES.padding,
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingTop: SIZES.base,
              paddingHorizontal: SIZES.padding * 2
              // backgroundColor: COLORS.white3,
            }}>
              <View 
                style={{marginHorizontal: 'auto', width: 50, height: 8, borderRadius: SIZES.radius, backgroundColor: COLORS.gray}}
              ></View>
            <View 
              style={{
              // width: '100%', 
              marginTop: SIZES.base,
              padding: SIZES.padding}}
            >
              <Text style={{
                ...FONTS.h3,
                // textAlign: 'left',
                color: COLORS.primary
              }}> 
                  {service && String(service.name).toUpperCase()}
              </Text>
            </View>
            {renderPrices()}
          </View>
      
        </Animated.View>
      </View>
    </Modal>
  );
};

//make this component available to the app
export default CustomerPricing;
