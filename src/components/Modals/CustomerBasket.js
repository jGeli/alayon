//import liraries
import React, { Component, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  Animated,
  TextInput,
  SafeAreaView,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import { COLORS, FONTS, SIZES, icons, styles } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getCloths } from '../../redux/actions/data.actions';
import { createClothType, deleteCloths } from '../../redux/actions/admin.actions';
import {
  createShopAddOns,
  updateServiceClothPricing,
} from '../../redux/actions/merchant.actions';
import {
  CLEAR_CUSTOMER_ORDER,
  SET_CUSTOMER_BASKET,
  SET_CUSTOMER_BASKETS,
  SET_CUSTOMER_ORDER,
} from '../../redux/actions/type';
import { getCustomerLocations, setCustomerBasket, setCustomerBaskets } from '../../utils/AsyncStorage';
import { createBasket, getCustomerShopBaskets } from '../../redux/actions/customer.actions';

const PRICING = ['Piece', 'Kilo', 'Batch'];

// create a component
const CustomerBasket = ({ active, onClose }) => {
  const { order, baskets, customer: { locations } } = useSelector(({ customer }) => customer);
  const { selectedShop } = useSelector(({ data }) => data);
  const { isAuthenticated } = useSelector(({ auth }) => auth);

  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('Piece');
  const [serviceOpen, setServiceOpen] = useState(true);
  const [addOnsOpen, setAddOnsOpen] = useState(false);

  const handleCounter = type => {
    let newQty = order.qty;
    if (type === 'less') {
      newQty -= newQty <= 1 ? 0 : 1;
    } else {
      newQty++;
    }

    dispatch({ type: SET_CUSTOMER_ORDER, payload: { qty: newQty } });
  };

  const handleSelect = item => {
    setSelected(item);
    dispatch({ type: SET_CUSTOMER_ORDER, payload: { qty: 1, pricing: item } });
  };

  const handleSave = async () => {
    let newBaskets = []
    newBaskets = baskets;

    if (!isAuthenticated) {
      newBaskets = await setCustomerBaskets({ ...order, shop: selectedShop, _id: Math.random() })
    } else {

      newBaskets.push({
        ...order,
        shop: selectedShop,
      });
      await dispatch(createBasket({ ...order, shop: selectedShop }))
    }


    newBaskets = newBaskets.filter(a => a.shop._id === selectedShop._id);

    dispatch({ type: SET_CUSTOMER_BASKETS, payload: newBaskets })
    onClose(newBaskets);
    dispatch({ type: CLEAR_CUSTOMER_ORDER });

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

  useEffect(() => {
    let totalService = 0;
    let totalAddons = 0;
    if (order.service) {
      let service = selectedShop.services.find(a => a.service === order.service);

      if (selected === 'Kilo') {
        totalService +=
          (service.priceKilo
            ? service.priceKilo
            : service.cloths[0].priceKilo) * order.qty;
      }
      if (selected === 'Batch') {
        totalService +=
          (service.priceBatch
            ? service.priceBatch
            : service.cloths[0].priceBatch) * order.qty;
      }

      if (selected === 'Piece') {
        order.cloths.map((a, index) => {
          totalService += a.pricePiece * a.qty;
        });
      }

      order.addons.map((a, index) => {
        totalAddons += a.price * a.qty;
      });

      dispatch({
        type: SET_CUSTOMER_ORDER,
        payload: { totalService, totalAddons },
      });
    }
  }, [selected, active, order.qty]);

  function renderPricing() {
    let service = selectedShop.services.find(a => a.service === order.service);
    let { isPerBatch, isPerKilo, isPerPiece } = service ? service : {};
    return (
      <>
        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: 'column',
            padding: 5,
            paddingTop: SIZES.padding,
            borderTopColor: COLORS.gray,
            borderTopWidth: 2,

            // backgroundColor: COLORS.white,
          }}>
          <View
            style={{
              flexGrow: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexGrow: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Image
                source={icons.pricing}
                style={{ height: 25, width: 25, tintColor: COLORS.gold }}
              />
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.black,
                  marginLeft: 5,
                  fontWeight: 'bold',
                }}>
                PRICING
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            height: 50,
            marginTop: SIZES.padding,
          }}>
          {isPerPiece && (
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: COLORS.primary,
                backgroundColor:
                  selected === 'Piece' ? COLORS.primary : COLORS.white,
                borderRadius: SIZES.semiRadius,
                paddingLeft: SIZES.radius,
                paddingRight: SIZES.radius,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 35,
                elevation: 5,
              }}
              onPress={() => {
                handleSelect('Piece');
              }}>
              <Text
                style={{
                  // ...FONTS.h3,
                  fontSize: SIZES.h4,
                  fontWeight: 'bold',
                  color: selected === 'Piece' ? COLORS.white : COLORS.black,
                }}>
                Piece
              </Text>
            </TouchableOpacity>
          )}
          {isPerKilo && (
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: COLORS.primary,
                backgroundColor:
                  selected === 'Kilo' ? COLORS.primary : COLORS.white,
                borderRadius: SIZES.semiRadius,
                paddingLeft: SIZES.radius,
                paddingRight: SIZES.radius,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 35,
                elevation: 5,
              }}
              onPress={() => {
                handleSelect('Kilo');
              }}>
              <Text
                style={{
                  // ...FONTS.h3,
                  fontSize: SIZES.h4,
                  fontWeight: 'bold',
                  color: selected === 'Kilo' ? COLORS.white : COLORS.black,
                }}>
                Kilo
              </Text>
            </TouchableOpacity>
          )}
          {isPerBatch && (
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: COLORS.primary,
                backgroundColor:
                  selected === 'Batch' ? COLORS.primary : COLORS.white,
                borderRadius: SIZES.semiRadius,
                paddingLeft: SIZES.radius,
                paddingRight: SIZES.radius,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 35,
                elevation: 5,
              }}
              onPress={() => {
                handleSelect('Batch');
              }}>
              <Text
                style={{
                  // ...FONTS.h3,
                  fontSize: SIZES.h4,
                  fontWeight: 'bold',
                  color: selected === 'Batch' ? COLORS.white : COLORS.black,
                }}>
                BATCH
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {selected !== 'Piece' && (
          <View
            style={{
              // flex: 1,
              // backgroundColor: COLORS.lightGray3,

              marginBottom: SIZES.padding,
              marginTop: 5,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingLeft: SIZES.padding,
            }}>
            <Text style={{ ...FONTS.body3, color: COLORS.black }}>
              NUMBER OF {String(selected).toUpperCase()}/s
            </Text>
            <View
              style={{
                marginRight: SIZES.padding * 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 30,
                  paddingLeft: SIZES.padding,
                  paddingRight: SIZES.padding,
                }}
                onPress={() => handleCounter('less')}>
                <Image
                  source={icons.minus1}
                  style={{
                    height: 15,
                    width: 15,
                    tintColor: COLORS.blue,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  // borderColor: COLORS.black,
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 30,
                  paddingLeft: SIZES.padding,
                  paddingRight: SIZES.padding,
                }}>
                <Text style={{ fontWeight: 'bold', color: COLORS.darkBlue }}>
                  {order.qty}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  padding: 5,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 30,
                  paddingLeft: SIZES.padding,
                  paddingRight: SIZES.padding,
                }}
                onPress={() => handleCounter('add')}>
                <Image
                  source={icons.plus}
                  style={{
                    height: 15,
                    width: 15,
                    tintColor: COLORS.blue,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>
    );
  }


  function renderOrderItems() {
    let service = selectedShop.services.find(a => a.service === order.service);
    return (
      <View
        style={{
          flexDirection: 'column',
          height: 'auto',
          backgroundColor: COLORS.lightGray4,
          marginBottom: 5,
          // marginTop: SIZES.padding,
          padding: 8,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomColor: COLORS.gray,
            borderBottomWidth: 1,
            width: '100%',
            marginBottom: 5,
          }}>
          <View
            style={{
              flexGrow: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            {serviceOpen ? (
              <TouchableOpacity onPress={() => setServiceOpen(false)}>
                <Image source={icons.minus} style={{ width: 25, height: 25 }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setServiceOpen(true)}>
                <Image source={icons.addbox} style={{ width: 25, height: 25 }} />
              </TouchableOpacity>
            )}
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.black,
                marginLeft: 5,
                fontWeight: 'bold',
              }}>
              {service && service.name}
            </Text>
          </View>
          <View
            style={{
              flexGrow: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.black,
                marginLeft: 5,
                fontWeight: 'bold',
              }}>
              ({order.cloths.length} items)
            </Text>
          </View>
        </View>
        {serviceOpen && (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomColor: COLORS.gray,
              borderBottomWidth: 1,
              marginBottom: 5,
            }}>
            {order.cloths.map(a => {
              return (
                <View
                  key={a.cloth}
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: SIZES.padding * 3,
                  }}>
                  <View style={{ flexBasis: '33%' }}>
                    <Text
                      style={{
                        ...FONTS.body4,
                        color: COLORS.black,
                      }}>
                      {a.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexBasis: '33%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        ...FONTS.body4,
                        color: COLORS.black,
                        width: 25,
                        textAlign: 'center',
                      }}>
                      {a.pricePiece}
                    </Text>
                    <Text
                      style={{
                        ...FONTS.body4,
                        color: COLORS.black,
                        width: 10,
                        textAlign: 'center',
                      }}>
                      x
                    </Text>
                    <Text
                      style={{
                        ...FONTS.body4,
                        color: COLORS.black,
                        width: 25,
                        textAlign: 'center',
                      }}>
                      {a.qty}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexBasis: '34%',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      paddingRight: SIZES.padding,
                    }}>
                    <Text
                      style={{
                        ...FONTS.body4,
                        color: COLORS.black,
                      }}>
                      {a.pricePiece * a.qty}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.black,
                fontWeight: 'bold',
                marginRight: 10,
              }}>
              ₱{order.totalService}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderAddons() {
    return (
      <View
        style={{
          flexDirection: 'column',
          height: 'auto',
          backgroundColor: COLORS.lightGray4,
          marginBottom: 5,
          // marginTop: SIZES.padding,
          padding: 8,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomColor: COLORS.gray,
            borderBottomWidth: 1,
            width: '100%',
            marginBottom: 5,
          }}>
          <View
            style={{
              flexGrow: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            {addOnsOpen ? (
              <TouchableOpacity onPress={() => setAddOnsOpen(false)}>
                <Image source={icons.minus} style={{ width: 25, height: 25 }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setAddOnsOpen(true)}>
                <Image source={icons.addbox} style={{ width: 25, height: 25 }} />
              </TouchableOpacity>
            )}
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.black,
                marginLeft: 5,
                fontWeight: 'bold',
              }}>
              ADD-ONS
            </Text>
          </View>
          <View
            style={{
              flexGrow: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.black,
                marginLeft: 5,
                fontWeight: 'bold',
              }}>
              ({order.addons.length} items)
            </Text>
          </View>
        </View>
        {addOnsOpen && (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomColor: COLORS.gray,
              borderBottomWidth: 1,
              marginBottom: 5,
            }}>
            {order.addons.map(a => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: SIZES.padding * 3,
                  }}>
                  <View style={{ flexBasis: '33%' }}>
                    <Text
                      style={{
                        ...FONTS.body4,
                        color: COLORS.black,
                      }}>
                      {a.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexBasis: '33%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        ...FONTS.body4,
                        color: COLORS.black,
                        width: 25,
                        textAlign: 'center',
                      }}>
                      {a.price}
                    </Text>
                    <Text
                      style={{
                        ...FONTS.body4,
                        color: COLORS.black,
                        width: 10,
                        textAlign: 'center',
                      }}>
                      x
                    </Text>
                    <Text
                      style={{
                        ...FONTS.body4,
                        color: COLORS.black,
                        width: 25,
                        textAlign: 'center',
                      }}>
                      {a.qty}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexBasis: '34%',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      paddingRight: SIZES.padding,
                    }}>
                    <Text
                      style={{
                        ...FONTS.body4,
                        color: COLORS.black,
                      }}>
                      {a.price * a.qty}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.black,
                fontWeight: 'bold',
                marginRight: 10,
              }}>
              ₱{order.totalAddons}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderTotal() {
    return (
      <View
        style={{
          flexDirection: 'column',
          height: 'auto',
          backgroundColor: COLORS.lightGray4,
          marginBottom: 5,
          marginTop: 5,
          borderTopColor: COLORS.gray,
          borderTopWidth: 1,
          // marginTop: SIZES.padding,
          padding: 8,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.black,
              marginLeft: 5,
              fontWeight: 'bold',
            }}>
            SUB-TOTAL
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.black,
                marginRight: 10,
              }}>
              ₱{order.totalService + order.totalAddons}
            </Text>
          </View>
        </View>
      </View>
    );
  }


  return (
    <Modal animationType="fade" transparent={true} visible={active}>
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
            height: Dimensions.get('window').height * 0.85,
            right: 0,
            bottom: 0,
            width: '100%',
            justifyContent: 'space-between',
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}>
          <View
            style={{
              paddingTop: SIZES.padding,
              paddingRight: SIZES.padding,
              paddingLeft: SIZES.padding,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: SIZES.padding,
            }}>
            <Text
              style={{
                flex: 1,
                ...FONTS.h3,
                fontSize: 18,
                textAlign: 'left',
                color: COLORS.black,
              }}>
              ADD TO BASKET
            </Text>
            <TouchableOpacity onPress={() => onClose()}>
              <Image
                source={icons.cross}
                resizeMode="contain"
                style={{
                  height: 25,
                  width: 25,
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.lightGray3,
            }}>
            <View
              style={{
                flex: 1,
                // borderBottomColor: COLORS.gray,
                // borderBottomWidth: 2,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingTop: SIZES.padding,
                // paddingBottom: SIZES.padding,
              }}>
              <ScrollView
                style={{
                  width: '100%',
                }}>
                {renderOrderItems()}
                {order.hasAddons && renderAddons()}
              </ScrollView>
            </View>

            {renderPricing()}

            {renderTotal()}
          </View>
          <View
            style={{
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
              padding: SIZES.padding,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: SIZES.radius,
                width: '50%',
              }}
              onPress={() => handleSave()}>
              <Text
                style={{
                  textAlign: 'center',
                  padding: SIZES.padding,
                  fontSize: SIZES.base * 2,
                  fontWeight: '700',
                  color: COLORS.white,
                }}>
                CONFIRM
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

//make this component available to the app
export default CustomerBasket;
