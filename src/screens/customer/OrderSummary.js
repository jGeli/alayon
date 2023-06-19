import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
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
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';

import { useSelector } from 'react-redux';
import LabeledText from '../../components/LabeledText';
import Tooltip from 'react-native-walkthrough-tooltip';
import DashLine from '../../components/DashedLine';
import CheckoutOrderCard from '../../components/Cards/CheckoutOrderCard';
import { groupShopOrders, totalOrders } from '../../utils/helpers';


const { addressLabels } = constants;


export default function OrderSummary({ navigation, route }) {
  const { basket, rnd } = route.params;
  const { pickupAddress } = basket;
  const { user: { locations } } = useSelector(({ user }) => user)
  const [toolTip, setToolTip] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]);

  let newOrders = groupShopOrders(basket.orders)


  const handleOpenToolTip = () => {
    setToolTip(true);
  };

  const handleCloseTooltip = () => {
    setToolTip(false);
    // setToolTip(false)
  };

  const handleBookNow = () => {
    console.log('ORDERS')

    Clipboard.setString(JSON.stringify(basket.orders));
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
          onPress={() => navigation.goBack()}>
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

    if (pickupAddress && pickupAddress.label) {
      label = addressLabels.find(ab => ab._id === pickupAddress.label);
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
          onPress={() => navigation.navigate('AddressLocationScreen', { basket, locations, navType: 'checkout' })}>
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
                  Pick-up & Delivery Details
                </Text>
              </View>
            </View>
            {pickupAddress ?
              <View
                onPress={() => setSelected(pickupAddress._id)}

              >
                <View
                  style={{ flexDirection: 'row', marginTop: SIZES.padding }}
                >
                  <Text
                    style={{ ...FONTS.body3, color: COLORS.black }}
                  >{pickupAddress.name}</Text>
                  <Text style={{ marginLeft: SIZES.padding, marginRight: SIZES.padding }}>|</Text>
                  <Text
                    style={{ ...FONTS.body3, color: COLORS.darkGray }}
                  >(+63) {pickupAddress.mobile}</Text>
                </View>
                <Text style={{ ...FONTS.body4 }}>{pickupAddress.address}</Text>
                {/* <Text style={{ ...FONTS.body4 }}>Barangay, City Municipality, Province, Region, {pickupAddress.postalCode}</Text> */}
                {label && <Text style={{ ...FONTS.body3, color: COLORS.transparentBlack7 }}>{label.name}</Text>}
                {pickupAddress.isDefault && <Text style={{ ...FONTS.body4, color: COLORS.primary, marginTop: 5, borderRadius: 5, borderColor: COLORS.primary, borderWidth: 1, paddingLeft: 5, paddingRight: 5, width: 60 }}>Default</Text>}
              </View>
              :
              <Text style={{ ...FONTS.body3, color: COLORS.darkGray, marginLeft: SIZES.padding * 3 }}>No default address</Text>
            }
          </View>
          <Image
            source={icons.arrow_right}
            style={{ height: 25, width: 25, tintColor: COLORS.darkGray }}
          />
        </TouchableOpacity>
        {pickupAddress &&
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomColor: COLORS.gray,
              backgroundColor: COLORS.white3
              // borderBottomWidth: 1,
            }}
            onPress={() => navigation.navigate('SchedulePickup')}>
            <View
              style={{
                flexGrow: 1,
                margin: 5,
                flexDirection: 'row',
                paddingRight: 5,
                paddingLeft: SIZES.padding,
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
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
                Separate Pickup & Return Details
              </Text>
            </View>
          </TouchableOpacity>
        }
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
        {newOrders.map((a, index) => {
          return (
            <CheckoutOrderCard shop={a} navigation={navigation} key={index} />
          )
        })}
      </ScrollView>
    );
  }

  function renderFooter() {

    let total = totalOrders(newOrders);
    console.log(total)
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
            <Tooltip
              isVisible={toolTip}
              content={
                <LabeledText
                  label={'NOTE:'}
                  labelStyle={{
                    color: 'red',
                  }}
                  textValue={
                    'Appraisal rate is just estimated amount, Actual Amounts payable will be provided after Merchant confirmation.'
                  }
                  textStyle={{
                    fontSize: SIZES.font,
                    color: COLORS.black,
                  }}
                />
              }
              // onClose={() => {setToolTip}}
              onClose={handleCloseTooltip}>
              <TouchableOpacity
                style={{
                  // padding: SIZES.base,
                  height: SIZES.padding,
                  // marginLeft: SIZES.base,
                  paddingLeft: SIZES.base,
                  flexGrow: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => handleOpenToolTip()}>
                <Image
                  source={icons.info}
                  resizeMode="contain"
                  style={{
                    height: 15,
                    width: 15,
                    // bottom: 10,
                  }}
                />
              </TouchableOpacity>
            </Tooltip>
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
            backgroundColor: COLORS.primary,
            borderLeftColor: COLORS.gray,
            borderLeftWidth: 1,
            height: '100%',
          }}
          onPress={() => handleBookNow()}>
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

  useEffect(() => {

    let newOrders = groupShopOrders(basket.orders)
    console.log('New Orders')
    console.log(newOrders)
    setCheckoutItems(newOrders)

  }, [basket, rnd])


  return (
    <SafeAreaView
      style={{
        flexGrow: 1,
        flex: 1,
        backgroundColor: COLORS.gray2
      }}>
      {renderHeader()}

      <View
        style={{
          backgroundColor: COLORS.white,
          marginTop: 5
          // paddingBottom: 1,
        }}>
        {customerDetails()}
        <DashLine />
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
