//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, RefreshControl, TouchableOpacity, SafeAreaView, Image, Switch, TextInput, ScrollView, Modal, TouchableWithoutFeedback, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, FONTS, SIZES, icons, constants } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { CLEAR_CUSTOMER_BASKET, CLEAR_CUSTOMER_ORDER, CLEAR_ERROR, SET_CUSTOMER_BASKET, SET_SELECTED_SHOP } from '../../redux/actions/type';
import moment from 'moment-timezone'
import { cancelOrder, createOrder, getCustomerShopById, getOrderById } from '../../redux/actions/customer.actions';
import { useEffect } from 'react';
import socket from '../../utils/socket';
import { statusIndexing } from '../../utils/helpers';

// create a component
export default function DefaultScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(({ auth }) => auth);
  const { orderId, shopId, navType } = route.params;
  const { basket } = useSelector(({ customer }) => customer);
  const { selectedShop } = useSelector(({ data }) => data);
  const [orderData, setOrderData] = useState({
    orders: [],
    pickupDelivery: null,
    returnDelivery: null,
    shop: {
      services: []
    }
  });
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState('')

  let totalOrder = 0;
  let addonsTotal = 0;
  let totalItem = 0;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (basket._id) {
      handleGetOrder()
    }
    setTimeout(() => {
      setRefreshing(false)
    }, 3000);
  }, []);

  const handleGetOrder = async (id) => {
    let myOrder = await dispatch(getOrderById(id ? id : basket._id));
    if (myOrder) {
      let statInd = statusIndexing(myOrder.activeStatus);
      setOrderData({ ...orderData, ...myOrder, statusIndex: statInd })
      dispatch({ type: SET_CUSTOMER_BASKET, payload: { ...myOrder, statusIndex: statInd } })
      setRefreshing(false)
    }
  }

  const handleCheckout = async () => {
    setLoading(true);
    // Alert.alert('CHECKOUT!')
    // let val = [];
    // if (!isAuthenticated) {
    //   val = await setCustomerBaskets({ ...order, shop: selectedShop, _id: Math.random() });
    //   dispatch({ type: SET_CUSTOMER_BASKETS, payload: val })
    // } else {
    //   val = await dispatch(createBasket({ ...order, shop: selectedShop }));
    // }

    // if (val.length !== 0) {
    //   let pickupDelivery = null;

    //   if (pickupLocation) {
    //     pickupDelivery = pickupLocation;
    //   } 
    if (isAuthenticated) {
      dispatch(createOrder({ ...orderData, shop: selectedShop }))
        .then((res) => {
          navigation.push('OrderCompleteScreen', { order: res, navType: 'track' })
          dispatch({ type: CLEAR_CUSTOMER_ORDER })
          dispatch({ type: CLEAR_CUSTOMER_BASKET })
          setLoading(false)
        })
      // navigation.navigate('OrderSummary', { shopId, rnd: Math.random() });
    } else {
      setLoading(false)
      navigation.navigate('SignIn', { redirection: 'OrderSummary', ...route.params });
    }
  };

  const handleAddService = () => {
    dispatch({ type: CLEAR_CUSTOMER_ORDER });
    navigation.navigate('ShopServices', { shopId, newAddress: orderData.pickupDelivery })
  }

  function renderHeader() {
    return (
      <View
        style={styles.header}>
        <TouchableOpacity
          style={{ margin: SIZES.padding }}
          onPress={() => {
            if (navType === 'checkout') {
              let newOrders = orderData.orders.filter(a => a.orderId !== orderId)
              dispatch({ type: SET_CUSTOMER_BASKET, payload: { orders: newOrders } })
            }
            navigation.goBack()
          }}>
          <Image
            source={icons.back}
            style={{ height: 20, width: 20, tintColor: COLORS.white }}
          />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexGrow: 1
          }}
        >
          <Text
            style={{
              ...FONTS.body2,
              color: COLORS.white,
              letterSpacing: 0,
              marginTop: SIZES.base,
            }}>
            {orderData?._id ? 'Order Details' : 'Order Summary'}
          </Text>
        </View>
        <View
          style={{ margin: SIZES.padding, height: 20, width: 20 }}
        ></View>
      </View>
    );
  }
  
  const handleCancelOrder = (data) => {
    dispatch({ type: CLEAR_ERROR });
    dispatch(cancelOrder({ ...data, cancelReason: cancelReason }))
    setVisible(false)
    // navigation.goBack()
  }

  const openCancelReasonModal = async () => {
    setCancelReason('')
    setVisible(true)
  }
  
  const handleReason = async (text) => {
    setCancelReason(text)
  }
  
  const renderShopDetails = (mapVal) => {
    let shop = selectedShop;
    return (
      <View
        style={styles.shopDetails}
      >
        {/* Info Container */}
        <Image
          source={{ uri: shop.bannerUrl }}
          style={styles.shopBanner}
        />
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.black,
            }}
          >
            {shop.shop_name}
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.transparentBlack7,
            }}
          >
            {shop.location.address}
          </Text>
        </View>
        <View style={styles.rateBadge}>
          <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>
            {shop.avgRate}
          </Text>
        </View>
        {/* {renderFooter()} */}
      </View>
    )
  }

  function renderServiceItems(order) {
    let { shop } = orderData;
    let { pricing, qty, service, addons, cloths } = order;
    let subTotal = 0;
    let totalService = 0;
    let totalAddons = 0;

    let shopService = shop.services.find(a => (a.service == service._id || a.service == service));
    const orderService = shopService;

    let price = 0
    if (orderService) {

      if (pricing === 'Kilo') {
        price = (orderService?.priceKilo
          ? orderService?.priceKilo
          : orderService?.cloths[0].priceKilo)
        totalService += price * order.qty;

      }
      if (pricing === 'Batch') {
        price = (orderService?.priceBatch
          ? orderService?.priceBatch
          : orderService?.cloths[0].priceBatch)
        totalService +=
          (orderService?.priceBatch
            ? orderService?.priceBatch
            : orderService?.cloths[0].priceBatch) * order.qty;
      }

      if (pricing === 'Piece') {
        cloths.map((a, index) => {
          price = a?.pricePiece;
          totalItem += a?.qty;
          totalService += a?.pricePiece * a?.qty;
        });
      }

      cloths?.map((a, index) => {
        totalItem += a?.qty;
      });

      addons?.map((a, index) => {
        totalAddons += a?.price * a?.qty;
      });
      addonsTotal += totalAddons;
      subTotal = totalService + addonsTotal;
      totalOrder += subTotal;
    }

    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: SIZES.padding * 2,
          width: '100%',
        }}
      >
        <View style={{
          width: '100%',
          paddingHorizontal: 5,
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: COLORS.gray2
        }}>
          <Text style={{ ...FONTS.body3, fontWeight: 'bold', color: COLORS.black, marginBottom: 5 }}>{orderService.name}</Text>
        </View>
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            borderBottomColor: COLORS.gray,
            borderBottomWidth: 1,
            marginBottom: 5,
            paddingVertical: 5,
            width: '100%'
          }}>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            // paddingHorizontal: 3,
            borderBottomColor: COLORS.gray,
          }}>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                textAlign: 'left',
                // fontWeight: 'bold',
                width: '40%'
                // marginLeft: 5,
                // fontWeight: 'bold',
              }}>
              No. of Items
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                textAlign: 'center',
                // fontWeight: 'bold',
                width: '40%'
                // marginLeft: 5,
                // fontWeight: 'bold',
              }}>
              Rate Per Item
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                textAlign: 'right',
                // fontWeight: 'bold',
                width: '20%'
                // marginLeft: 5,
                // fontWeight: 'bold',
              }}>
              Total
            </Text>
          </View>

          {cloths.map((a, index) => {
            let clothTotal = a.qty * a.pricePiece
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingTop: SIZES.base,
                  // paddingHorizontal: SIZES.padding
                }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // width: '100%',
                  // flexGrow: 1

                }}>
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.transparentBlack7,
                      textAlign: 'left',
                      // fontWeight: 'bold',
                      width: '40%'
                    }}>
                    {a.qty} x {a.name}
                  </Text>

                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.transparentBlack7,
                      textAlign: 'center',
                      // fontWeight: 'bold'
                      width: '40%'

                    }}>
                    {pricing === 'Piece' ? ` ₱${a.pricePiece}/${pricing}` : index === (Math.floor(cloths.length / 2)) && `${qty} x ₱${order.price}/${pricing}`}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.transparentBlack7,
                      textAlign: 'right',
                      // fontWeight: 'bold'
                      width: '20%'
                    }}>
                    {pricing === 'Piece' ? `₱${clothTotal}` : index === (Math.floor(cloths.length / 2)) && `₱${pricing === 'Kilo' ? qty * order.price : qty * order.price} `}
                  </Text>
                </View>

              </View>

            );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
            width: '100%',
            paddingHorizontal: SIZES.padding


            // flexGrow: 1
          }}
        >
          <View
            style={{

              flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
              flexGrow: 1,
            }}
          >
            {/* <Text
                          style={{
                          ...FONTS.body3,
                          color: COLORS.black
                          }}
                        >
                      Sub-Total
                        </Text> */}

          </View>
          {/* <Text style={{ ...FONTS.body3, color: COLORS.black, marginRight: SIZES.base }}>₱{totalService}</Text> */}
        </View>
        {order.addons.length !== 0 && renderAddOns({ totalAddons, addons })}
        <View
          style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
            width: '100%',
          }}
        >
          <View
            style={{

              flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.black900,
                fontWeight: '700'
              }}
            >
              Sub-Total
            </Text>

          </View>
          <Text style={{ ...FONTS.body3, color: COLORS.black, marginRight: SIZES.base }}>₱{subTotal}</Text>
        </View>
      </View >
    )
  }

  function renderAddOns(prop) {
    let { totalAddons, addons } = prop;
    return (
      <>
        <View style={{
          width: '100%',
          paddingHorizontal: 5,
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: COLORS.gray2
        }}>
          <Text style={{ ...FONTS.body3, fontWeight: 'bold', color: COLORS.transparentBlack7, marginBottom: 5 }}>Addons</Text>
        </View>
        <View
          style={{
            // paddingHorizontal: SIZES.padding, 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            borderBottomColor: COLORS.gray,
            borderBottomWidth: 1,
            marginBottom: 5,
            paddingVertical: 5,
            width: '100%'
          }}>

          {/* <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            alignItems: 'center',
                            // paddingHorizontal: 3,
                            borderBottomColor: COLORS.gray,
                        }}>
                            <Text
                            style={{
                                ...FONTS.body4,
                                color: COLORS.black,
                                textAlign: 'left',
                                // fontWeight: 'bold',
                                width: '40%'
                                // marginLeft: 5,
                                // fontWeight: 'bold',
                            }}>
                          No. of items
                        </Text>
                        <Text
                            style={{
                                ...FONTS.body4,
                                color: COLORS.black,
                                textAlign: 'center',
                                // fontWeight: 'bold',
                                width: '40%'
                                // marginLeft: 5,
                                // fontWeight: 'bold',
                            }}>
                            Rate Per item
                        </Text>
                        <Text
                            style={{
                                ...FONTS.body4,
                                color: COLORS.black,
                                textAlign: 'right',
                                // fontWeight: 'bold',
                                width: '20%'
                                // marginLeft: 5,
                                // fontWeight: 'bold',
                            }}>
                           Total Price
                        </Text>
                            </View> */}

          {addons.map((a, index) => {
            let onsTotal = a.qty * a.price
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingTop: SIZES.base,
                  paddingHorizontal: SIZES.padding
                }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.transparentBlack7,
                      textAlign: 'left',
                      width: '40%'
                    }}>
                    {a.qty} x {a.name}
                  </Text>

                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.transparentBlack7,
                      textAlign: 'center',
                      width: '40%'

                    }}>
                    ₱{a.price}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.transparentBlack7,
                      textAlign: 'right',
                      width: '20%'
                    }}>
                    ₱{onsTotal}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </>
    )
  }

  const renderServiceDetails = (mapVal) => {
    let { orders } = orderData;
    return (
      <>
        <View
          style={{
            width: '100%',
            paddingHorizontal: SIZES.padding,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.black,
              fontWeight: 'bold'
            }}
          >Selected Services</Text>
          {!orderData._id &&
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: SIZES.padding
              }}
              onPress={() => handleAddService()}
            >
              <Image
                source={icons.addBasket}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: COLORS.primary,
                  marginRight: SIZES.padding
                }}
              />
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.primary,
                }}
              >Add Service</Text>
            </TouchableOpacity>}
        </View>
        <View
          style={styles.cardContainer}
        >
          {/* Info Container */}


          {orders.map((a, index) => {
            return <View
              key={index}
              style={{
                // borderBottomColor: COLORS.white,
                // borderBottomWidth: 1,
                // borderTopColor: COLORS.gray2,
                // borderTopWidth: 1,
                // width: '100%',
                // marginTop: 3,
                // elevation: 1,
                // backgroundColor: COLORS.white
                // height: '100%'
              }
              }
            >{renderServiceItems(a)}</View>
          })}

        </View>
        {/* {renderFooter()} */}
      </>
    )
  }

  const renderBillingDetails = () => {
    let { pickupDate, deliveryDate } = orderData;
    let diff = moment(deliveryDate).diff(pickupDate, 'd');
    let title = `${diff}-${diff + 1} Days`;
    return (
      <>
        <View
          style={{
            width: '100%',
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding
          }}
        >
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.black,
              fontWeight: 'bold'
            }}
          >Billing Details</Text>
        </View>
        <View
          style={styles.cardContainer}
        >
          {/* Info Container */}
          <View
            style={{
              borderBottomColor: COLORS.darkGray,
              width: '100%',
              borderBottomWidth: 1,
              paddingBottom: 5
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: SIZES.padding
              }}
            >
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.black900
                }}
              >Service Total {totalItem >= 1 ? `(${totalItem} items)` : ''}</Text>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.black
                }}
              >₱{totalOrder}</Text>


            </View>
            {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: SIZES.padding
            }}
          >
           <Text
            style={{
              ...FONTS.body3,
              color: COLORS.transparentBlack7
            }}
           >Addons Total</Text>
               <Text
            style={{
              ...FONTS.body3,
              color: COLORS.black
            }}
           >₱{addonsTotal}</Text>
  
         
          </View> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: SIZES.padding
              }}
            >
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.black900
                }}
              >Delivery Fee | 1.2 Km</Text>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.primary
                }}
              >FREE</Text>


            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: SIZES.padding
              }}
            >
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.gray
                }}
              >Free Delivery on Your order</Text>
              {/* <Text
            style={{
              ...FONTS.body3,
              color: COLORS.black
            }}
           >₱{totalOrder}</Text> */}


            </View>

          </View>
          <View
            style={{
              borderBottomColor: COLORS.darkGray,
              width: '100%',
              borderBottomWidth: 1,
              paddingVertical: SIZES.base
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: SIZES.padding
              }}
            >
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.black900
                }}
              >Selected Date</Text>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.primary
                }}
              >{moment(pickupDate).format('dddd, MMM D')}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: SIZES.padding
              }}
            >
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.black900
                }}
              >Selected Pick Up Time</Text>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.primary
                }}
              >{moment(pickupDate).format('hh:00 A')}</Text>


            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: SIZES.padding
              }}
            >

              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.black900
                }}
              >No Of Days</Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',

                }}
              >
                <View
                  style={{
                    paddingHorizontal: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    backgroundColor: orderData.deliveryOption === 1 ? COLORS.gray3 : COLORS.primary,
                    borderRadius: 5
                    // padding: 2
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.body4,
                      color: orderData.deliveryOption === 1 ? COLORS.transparentBlack7 : COLORS.white,

                    }}
                  >{orderData.deliveryOption === 1 ? 'STANDARD' : 'EXPRESS'}</Text></View>

                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.primary
                  }}
                >{title}</Text>
              </View>

            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: SIZES.padding
              }}
            >
              {orderData?.tip ?
                <>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.gold
                    }}
                  >Tip</Text>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.gold
                    }}
                  >₱{orderData.tip}</Text>
                </>
                :
                null
              }



            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: SIZES.padding
            }}
          >
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.black,
                fontWeight: 'bold'
              }}
            >Total</Text>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.black,
                fontWeight: 'bold'
              }}
            >₱{totalOrder + addonsTotal + orderData.tip}</Text>
          </View>
          {/* {renderFooter()} */}
        </View>
      </>

    )
  }

  const renderInfo = (mapVal) => {
    return (

      <View
        style={{
          // margin: SIZES.padding,
          backgroundColor: COLORS.transparent,
          // marginTop: SIZES.padding,
          // padding: SIZES.padding,
          // borderTopLeftRadius: 30,
          // borderTopRightRadius: 30,
          // backgroundColor: COLORS.white,
          // elevation: 5,
          // flexGrow: 1
          // flex: 1
        }}
      >



        {/* Delivery Man Details */}
        {orderData?._id ? orderData?.activeStatus === 'pending' ? 
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: 70,
              margin: SIZES.padding,
              borderRadius: SIZES.semiRadius,
              paddingHorizontal: SIZES.padding * 2,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: COLORS.secondary,
              borderWidth: 1,
              backgroundColor: COLORS.lightBlue,
              elevation: 5
            }}
           onPress={openCancelReasonModal}
          >

            <View
              style={{
                flex: 1,
                // marginLeft: SIZES.base
              }}
            >
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.darkBlue,
                }}
              >{totalItem} items | ₱{totalOrder + addonsTotal + orderData?.tip}</Text>
              <Text
                style={{
                  ...FONTS.body5s,
                  color: COLORS.darkBlue
                }}
              >Extra charges might apply</Text>

            </View>
            <View
              style={{
                height: 40,
                // width: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* <Image
                 source={icons.chat}
                 resizeMode='contain'
                 style={{
                   height: 25,
                   width: 25,
                   tintColor: COLORS.darkBlue
                 }}
               /> */}
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.darkBlue
                }}
              >Cancel</Text>
            </View>

          </TouchableOpacity> :
          orderData.activeStatus === 'completed' ?
            <TouchableOpacity
              style={{
                margin: SIZES.padding,
                elevation: 5,
                flexDirection: 'row',
                height: 70,
                marginTop: SIZES.padding,
                borderRadius: SIZES.semiRadius,
                paddingHorizontal: SIZES.padding * 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary
              }}
            // onPress={() => handleCheckout()}
            >

              <View
                style={{
                  flex: 1,
                  // marginLeft: SIZES.base
                }}
              >
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.white,
                  }}
                >{totalItem} items | ₱{totalOrder + addonsTotal + orderData?.tip}</Text>
                <Text
                  style={{
                    ...FONTS.body5s,
                    color: COLORS.white
                  }}
                >Extra charges might apply</Text>

              </View>
              <View
                style={{
                  height: 40,
                  // width: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={icons.reorder}
                  resizeMode='contain'
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: COLORS.white,
                    marginHorizontal: SIZES.padding
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.white
                  }}
                >Re-order</Text>

              </View>

            </TouchableOpacity>
            :
            <TouchableOpacity
              style={{
                margin: SIZES.padding,
                elevation: 5,
                flexDirection: 'row',
                height: 70,
                marginTop: SIZES.padding,
                borderRadius: SIZES.semiRadius,
                paddingHorizontal: SIZES.padding * 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary
              }}
              onPress={() => {
                navigation.navigate('TestScreen', { order: orderData, navType: 'track' })
              }}
            >

              <View
                style={{
                  flex: 1,
                  // marginLeft: SIZES.base
                }}
              >
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.white,
                  }}
                >{totalItem} items | ₱{totalOrder + addonsTotal + orderData?.tip}</Text>
                <Text
                  style={{
                    ...FONTS.body5s,
                    color: COLORS.white
                  }}
                >Extra charges might apply</Text>

              </View>
              <View
                style={{
                  height: 40,
                  // width: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >

                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.white,
                    marginRight: SIZES.padding
                  }}
                >Live Track</Text>

                <Image
                  source={icons.send}
                  resizeMode='contain'
                  style={{
                    // transform: [{rotate: '45deg'}],
                    height: 30,
                    width: 30,
                    tintColor: COLORS.white,
                    // marginLeft: SIZES.padding,
                    // marginHorizontal: SIZES.padding,
                    // marginBottom: SIZES.padding
                  }}
                />

              </View>

            </TouchableOpacity>
          :
          <TouchableOpacity
            disabled={loading}
            style={{
              margin: SIZES.padding,
              elevation: 5,
              flexDirection: 'row',
              height: 70,
              marginTop: SIZES.padding,
              borderRadius: SIZES.semiRadius,
              paddingHorizontal: SIZES.padding * 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: loading ? COLORS.primaryDisabled : COLORS.primary
            }}
            onPress={() => {
              setLoading(true);
              handleCheckout()

            }}
          >
            {
              loading &&
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute'
                }}
              >
                <Image
                  source={icons.loader}
                  style={{ height: 25, width: 25 }}
                />
              </View>

            }

            <View
              style={{
                flex: 1,
                // marginLeft: SIZES.base
              }}
            >
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.white,
                }}
              >{totalItem} items | ₱{totalOrder + addonsTotal + orderData?.tip}</Text>
              <Text
                style={{
                  ...FONTS.body5s,
                  color: COLORS.white
                }}
              >Extra charges might apply</Text>

            </View>
            <View
              style={{
                height: 40,
                // width: 40,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >

              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.white
                }}
              >Place Order</Text>
              <Image
                source={icons.delivery4}
                resizeMode='contain'
                style={{
                  height: 25,
                  width: 25,
                  tintColor: COLORS.white,
                  marginHorizontal: SIZES.padding
                }}
              />
            </View>

          </TouchableOpacity>
        }
      </View>
    )
  }
  
  function renderOrderStatus(){
    return (
      <View
        style={{
          paddingHorizontal: 10,
          marginBottom: SIZES.padding
        }}
      >
        <View
          style={{
            flex: 1,
            borderWidth: .5,
            backgroundColor: COLORS.white,
            borderColor: COLORS.white,
            flexDirection: 'column',
            padding: SIZES.padding,
            width: '100%',
            elevation: 2,
            borderRadius: 8
            // alignItems: 'center',
            // justifyContent: 'center'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 8,
              
            }}
          >
          <Image 
            source={icons.laundry_basket}
            style={{
              height: 12,
              width: 12,
              marginRight: 2.5
            }}
          />
            <Text
              style={{
                fontWeight: '500',
                color: COLORS.gray,
                
              }}
            >
              {orderData?.deliveryOption == 1 ? "Standard Delivery" : "Express Delivery"}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              // justifyContent: 'space-between',
              paddingHorizontal: 8,
              paddingTop: 6,
              flexDirection: 'column'
            }}
          >
            <Text
              style={{
                color: COLORS.black900,
                fontSize: 16,
                paddingRight: 2.5

              }}
            >
              Order {orderData?.transaction_id}
            </Text>
            <Text>
              Placed on {moment(orderData?.createdAt).format('DD MMM YYYY hh:mm:ss')}
            </Text>
            <Text
              style={{
                color: COLORS.black900
              }}
            >
              Paid on {moment(orderData.deliveryDate).format('DD MM YYYY hh:mm:ss')}
            </Text>
            <Text
              style={{
                color: COLORS.black900
              }}
            >
              Delivered on {moment(orderData?.deliveryDate).format('DD MM YYYY hh:mm:ss')}
            </Text>
            <Text
              style={{
                color: COLORS.black900
              }}
            >
              Completed on {moment(orderData?.updatedAt).format('DD MM YYYY hh:mm:ss')}
            </Text>
            <Text
              style={{
                color: COLORS.black900,
                marginTop: 10
                // fontSize: 16
              }}
            >
              Paid by Cash on Delivery
            </Text>
          </View>
        </View>
      </View>

    )
    
  }

  useEffect(() => {
    if (basket._id) {
      handleGetOrder(basket._id);
    } else {
      setOrderData({ ...orderData, ...basket })
    }

    socket.on('updateOrder', (id) => {
      if (id == basket._id) {
        handleGetOrder(id);
      }
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>

      {renderHeader()}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          
        }

        style={{
          width: '100%',
        }}
      >
      <View >
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
        >
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
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
            height: '12%',
            right: 0,
            bottom: 0,
            width: '100%',
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}>
            {/* <View 
                style={{
                  borderWidth: 1,
                  borderRadius: 12,
                  borderColor: COLORS.gray500
                }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 'auto',
            }}>
              
              <TextInput 
            placeholder='Add reason here..'
            value={cancelReason}
            onChange={handleReason}
            // onKeyPress={handleReason}
            
            enablesReturnKeyAutomatically={true}
            maxLength={maxLength}
            style={{
              padding: 10,
              color: COLORS.black900,

              // marginBottom: 10
            }}
          />
          <TouchableOpacity
            onPress={() => handleCancelOrder(orderData)}
          >
          <Image 
            source={icons.sendIcon}
            style={{
              height: 30,
              width: 30,
              margin: 10
            }}
          />
          </TouchableOpacity>

              </View>
          </View> */}
          <Text style={{ color: COLORS.black900, fontSize: 18, fontWeight: 'bold'}}>
            {'Cancel your Order?\nComing Soon..'}
          </Text>
          </Animated.View>
        </Modal>
      </View>
      
        {renderShopDetails()}
        {renderServiceDetails()}
        {renderBillingDetails()}
        {
        orderData?.activeStatus == 'completed' ||  orderData?.activeStatus == 'rejected' &&
        renderOrderStatus()
        }
      </ScrollView>
      {renderInfo()}

    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    // backgroundColor: COLORS.lightGray3,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    elevation: 5,
    width: '100%'
  },
  cardContainer: {
    flexGrow: 1,
    margin: SIZES.padding * 1,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.semiRadius,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding,
    elevation: 2
  },
  shopDetails: {
    bottom: 0,
    flexGrow: 1,
    margin: SIZES.padding * 1,
    marginVertical: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding,
    // width: '100%',
    borderRadius: SIZES.semiRadius,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shopBanner: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginHorizontal: SIZES.base
  },
  rateBadge: {
    height: 20,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#317A49',
    borderRadius: 5,
    marginHorizontal: SIZES.padding
  }

});

