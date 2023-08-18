import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ScrollView,
  Button,
  BackHandler,
  Alert
} from 'react-native';
import {
  icons,
  images,
  SIZES,
  COLORS,
  FONTS,
  constants,
  styles,
} from '../../constants';
import Clipboard from '@react-native-clipboard/clipboard';

import { useDispatch, useSelector } from 'react-redux';
import LabeledText from '../../components/LabeledText';
import DashLine from '../../components/DashedLine';
import CheckoutOrderCard from '../../components/Cards/CheckoutOrderCard';
import { groupShopOrders, totalOrders } from '../../utils/helpers';
import { CLEAR_ERROR, SET_CUSTOMER_BASKET, SET_ERROR } from '../../redux/actions/type';
import { createOrder } from '../../redux/actions/customer.actions';
import LoadingScreen from '../LoadingScreen';


const { addressLabels } = constants;


export default function OrderSummary({ navigation, route }) {
  const dispatch = useDispatch();
  const { shopId, rnd, selectedBaskets } = route.params;
  const { errors } = useSelector(({ ui }) => ui);
  const { basket, baskets, customer: { locations } } = useSelector(({ customer }) => customer)
  const { selectedShop } = useSelector(({ data }) => data)
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [loading, setLoading] = useState(true)

  const handleBookNow = (val) => {
    let { orders } = val;
    let hasDelOpt = true;
    if (!val.pickupDelivery) {
      dispatch({ type: SET_ERROR, payload: { locations: 'Set Pickup and Delivery Address' } })
      return;
    }

    for (let order of orders) {
      if (!order.deliveryOption) {
        hasDelOpt = false;
        // return;
      }
    }

    if (!hasDelOpt) {
      dispatch({ type: SET_ERROR, payload: { deliveryOption: 'Set Pickup and Delivery Address' } })
      return;
    }

    dispatch(createOrder({ ...val, shop: shopId }))
      .then(({ d }) => {
        navigation.navigate('OrderStatus', { order: d })
      })


  }

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: COLORS.white,
          elevation: 5,
          // height: 40,
        }}>
        <TouchableOpacity
          style={{ margin: SIZES.padding, marginRight: SIZES.padding * 2 }}
          onPress={() =>
            navigation.navigate('ShopServices', { shopId: selectedShop._id })
          }>
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
          Checkout
        </Text>
        <View></View>
      </View>
    );
  }


  function customerDetails() {
    let label = null;
    let { pickupDelivery, returnDelivery } = basket;
    let hasReturn = returnDelivery && returnDelivery._id != pickupDelivery._id;


    if (pickupDelivery && pickupDelivery.label) {
      label = addressLabels.find(ab => ab._id === pickupDelivery.label);
    }

    return (
      <View
        style={{
          width: '100%',
          elevation: 5,
          backgroundColor: COLORS.white,
          elevation: 3

          // opacity: .5
        }}>
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: COLORS.gray,
            borderBottomWidth: 1,
            // elevation: 3
          }}
          onPress={() => {
            dispatch({ type: CLEAR_ERROR })
            navigation.navigate('AddressLocationScreen', { basket, locations, navType: 'pickupDelivery', shopId })
          }}
        >
          <View style={{ flexGrow: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'space-between',
                // marginBottom: SIZES.padding,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Image
                  source={icons.myLocation}
                  resizeMode="contain"
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.primary,
                    marginRight: 5,
                  }}
                />
                <Text
                  style={{
                    fontSize: SIZES.h4,
                    color: COLORS.black,
                  }}>
                  {hasReturn ? 'Pick-up Address Details' :
                    'Pick-up & Return Address Details'}
                </Text>
              </View>
            </View>
            {pickupDelivery ?
              <View
              >
                <View
                  style={{ flexDirection: 'row', marginTop: SIZES.padding }}
                >
                  <Text
                    style={{ ...FONTS.body3, color: COLORS.black }}
                  >{pickupDelivery.name}</Text>
                  <Text style={{ marginLeft: SIZES.padding, marginRight: SIZES.padding }}>|</Text>
                  <Text
                    style={{ ...FONTS.body3, color: COLORS.darkGray }}
                  >(+63) {pickupDelivery.mobile}</Text>
                </View>
                <Text style={{ ...FONTS.body4 }}>{pickupDelivery.address}</Text>
                {/* <Text style={{ ...FONTS.body4 }}>Barangay, City Municipality, Province, Region, {pickupDelivery.postalCode}</Text> */}
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  {label && <Text style={{ ...FONTS.body3, color: COLORS.transparentBlack7 }}>{label.name}</Text>}
                  {pickupDelivery.isDefault && <Text style={{ ...FONTS.body4, color: COLORS.primary, marginTop: 5, borderRadius: 5, borderColor: COLORS.primary, borderWidth: 1, paddingLeft: 5, paddingRight: 5, width: 60, marginLeft: SIZES.padding }}>Default</Text>}
                </View>
              </View>
              :
              <Text style={{ ...FONTS.body3, color: errors.locations ? COLORS.red : COLORS.darkGray, marginLeft: SIZES.padding * 3 }}>{errors.locations ? errors.locations : 'No default address'}</Text>
            }
          </View>
          <Image
            source={icons.arrow_right}
            style={{ height: 25, width: 25, tintColor: COLORS.darkGray }}
          />
        </TouchableOpacity>

        <View
          style={{
            padding: hasReturn ? SIZES.padding : 0,
            // flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            borderBottomColor: COLORS.gray,
            backgroundColor: COLORS.white3
            // borderBottomWidth: 1,
          }}

        >
          {hasReturn &&

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'space-between',
                // marginBottom: SIZES.padding,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Image
                  source={icons.myLocation}
                  resizeMode="contain"
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.primary,
                    marginRight: 5,
                  }}
                />
                <Text
                  style={{
                    fontSize: SIZES.h4,
                    color: COLORS.black,
                  }}>
                  Return Address Details
                </Text>
              </View>
            </View>
          }
          {hasReturn ?
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => {

                navigation.navigate('AddressLocationScreen', { basket, locations, navType: 'returnDelivery' })
              }}
            >

              <View style={{ flexGrow: 1 }}>
                <View
                  style={{ flexDirection: 'row', marginTop: SIZES.padding }}
                >
                  <Text
                    style={{ ...FONTS.body3, color: COLORS.black }}
                  >{returnDelivery.name}</Text>
                  <Text style={{ marginLeft: SIZES.padding, marginRight: SIZES.padding }}>|</Text>
                  <Text
                    style={{ ...FONTS.body3, color: COLORS.darkGray }}
                  >(+63) {returnDelivery.mobile}</Text>
                </View>
                <Text style={{ ...FONTS.body4 }}>{returnDelivery.address}</Text>
                {/* <Text style={{ ...FONTS.body4 }}>Barangay, City Municipality, Province, Region, {returnDelivery.postalCode}</Text> */}
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  {label && <Text style={{ ...FONTS.body3, color: COLORS.transparentBlack7 }}>{label.name}</Text>}
                  {returnDelivery.isDefault && <Text style={{ ...FONTS.body4, color: COLORS.primary, marginTop: 5, borderRadius: 5, borderColor: COLORS.primary, borderWidth: 1, paddingLeft: 5, paddingRight: 5, width: 60, marginLeft: SIZES.padding }}>Default</Text>}
                </View>
              </View>
              <Image
                source={icons.arrow_right}
                style={{ height: 25, width: 25, tintColor: COLORS.darkGray }}
              />
            </TouchableOpacity>

            :

            <TouchableOpacity
              style={{
                flexGrow: 1,
                margin: 5,
                flexDirection: 'row',
                paddingRight: 5,
                paddingLeft: SIZES.padding,
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
              onPress={() => {

                navigation.navigate('AddressLocationScreen', { basket, locations, navType: 'returnDelivery' })
              }}
            >
              <Image
                source={icons.add}
                style={{
                  height: 10,
                  width: 10,
                  tintColor: COLORS.primary,
                  marginRight: SIZES.padding,
                }}
              />
              <Text style={{ ...FONTS.body4 }}>
                Separate Return Delivery
              </Text>
            </TouchableOpacity>
          }
        </View>
      </View >
    );
  }



  const listOrders = () => {
    return (
      <ScrollView
        style={{
          flexGrow: 1,
          // paddingTop: SIZES.padding,
          paddingBottom: SIZES.padding,
        }}>
        {checkoutItems.map((a, index) => {
          return (
            <View key={index}>
              <CheckoutOrderCard shopData={a} navigation={navigation} key={a._id} param={{ shopId, basket }} />
            </View>
          )
        })}
      </ScrollView>
    );
  }

  function renderFooter() {

    let total = totalOrders(checkoutItems);
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          // height: 50,
          backgroundColor: COLORS.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexGrow: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: SIZES.padding
          }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
          >
            <Text
              style={{ ...FONTS.body2, marginLeft: SIZES.padding }}
            >Total Payment</Text>
          </View>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.primary,
              fontSize: SIZES.body2,
              margin: SIZES.padding,
              fontWeight: 'bold'
            }}>
            ₱{total}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: '35%',
            opacity: errors.locations || errors.deliveryOption ? .5 : 1,
            backgroundColor: COLORS.primary,
            borderLeftColor: COLORS.gray,
            borderLeftWidth: 1,
            height: '100%',
          }}
          onPress={() => handleBookNow(basket)}
        >
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
              // fontWeight: '700',
              margin: SIZES.padding,
            }}>
            Book Now
          </Text>
          <Image
            source={icons.bookNow}
            resizeMode="contain"
            style={{
              height: 30,
              width: 30,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  const handleSelectedBaskets = () => {
    let orders = [];
    let pickupDelivery = basket['pickupDelivery'];
    if (selectedBaskets.length !== 0) {
      selectedBaskets.map(a => {
        let basket = baskets.find(ab => ab._id == a);
        if (basket) {
          orders.push(basket)
        }
      })
    }
    let nOrders = groupShopOrders(orders);

    if (!pickupDelivery && locations.length !== 0) {
      let defLoc = locations.find(a => a.isDefault);
      if (defLoc) {
        pickupDelivery = defLoc
      }
    }
    setCheckoutItems(nOrders)

    dispatch({ type: SET_CUSTOMER_BASKET, payload: { pickupDelivery, orders: orders } })
    setTimeout(() => {
      setLoading(false)

    }, 2000)
  }



  useEffect(() => {
    handleSelectedBaskets()
   

  }, [selectedBaskets, baskets])


  return (
    <SafeAreaView
      style={{
        flexGrow: 1,
        flex: 1,
        // backgroundColor: COLORS.gray2
      }}>
      {loading && <LoadingScreen
        // style={{ backgroundColor: COLORS.white, opacity: .8 }}
        source={images.setLoading}
      />}
      {renderHeader()}

      <View
        style={{
          backgroundColor: COLORS.white,
          marginTop: 5
          // paddingBottom: 1,
        }}>
        {customerDetails()}
        <DashLine color={errors.locations ? COLORS.redTransparent : COLORS.primary} />
      </View>


      {/* Customer Address and Details */}

      {/* List of Orders */}
      <View style={{ flexGrow: 1, width: '100%', backgroundColor: COLORS.gray3 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            width: '100%',
            // backgroundColor: COLORS.gray2
          }}>
          {listOrders()}
        </ScrollView>
        {/* {swipeableList()} */}
        {/* Total and Checkout Button */}
      </View>

      {renderFooter()}
    </SafeAreaView >
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  cardContentLeft: {
    // flex: 1,
    width: '100%',
    // height: '100%',
    // flexGrow: 1,
    paddingBottom: SIZES.padding,
    paddingLeft: SIZES.padding * 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexBasis: "80%",
  },

});
