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
} from 'react-native';
import { COLORS, FONTS, SIZES, icons, styles } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getCloths } from '../../redux/actions/data.actions';
import { createClothType, deleteCloths } from '../../redux/actions/admin.actions';
import {
  createShopAddOns,
  updateServiceClothPricing,
} from '../../redux/actions/merchant.actions';
import { SET_CUSTOMER_ORDER } from '../../redux/actions/type';

// create a component
const CustomerAddOns = ({ active, onClose }) => {
  const { shop, order } = useSelector(({ customer }) => customer);
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const [selected, setSelected] = useState({});
  const [adds, setAdds] = useState([]);
  const [rnd, setRnd] = useState(0);

  const handleCounter = (item, type) => {
    let newAddOns = [];
    let orderAddOns = adds;

    newAddOns = orderAddOns;

    if (type === 'less') {
      let ind = orderAddOns
        .map(a => {
          return a._id;
        })
        .indexOf(item._id);

      if (ind >= 0) {
        let addons = orderAddOns[ind];

        if (addons.qty > 1) {
          orderAddOns[ind].qty--;
          newAddOns = orderAddOns;
        } else {
          newAddOns = orderAddOns.filter(a => a._id !== item._id);
        }
      }
    }

    if (type === 'add') {
      let addons = orderAddOns.find(a => a._id === item._id);
      if (!addons) {
        orderAddOns.push({
          ...item,
          qty: 1,
        });
        newAddOns = orderAddOns;
      } else {
        newAddOns = orderAddOns.map(a => {
          if (a._id === item._id) {
            a.qty++;
            return a;
          }
          return a;
        });
      }
    }
    setAdds(newAddOns);
    setRnd(Math.random());
    // dispatch({type: SET_CUSTOMER_ORDER, payload: {addons: newAddOns}});
  };

  const handleSelect = item => {
    if (item._id === selected._id) {
      setSelected({});
    } else {
      setSelected(item);
    }
  };

  const handleSave = () => {
    dispatch({
      type: SET_CUSTOMER_ORDER,
      payload: { addons: adds, hasAddons: adds.length !== 0 },
    });
    onClose();
  };

  useEffect(() => {
    if (!active) {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
      setAdds([]);
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
    if (order && order.addons && order.addons.length !== 0) {
      setAdds(order.addons);
    }
    if (shop.addons[0]) {
      setSelected(shop.addons[0]);
    }
  }, [active]);

  function renderServicesTab() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: 50,
        }}>
        <FlatList
          horizontal
          contentContainerStyle={{
            justifyContent: 'center',
            paddingRight: 20,
            alignItems: 'center',
          }}
          data={shop.addons}
          keyExtractor={item => `${item._id}`}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            let addons = adds.find(a => a._id === item._id);

            return (
              <TouchableOpacity
                style={{
                  marginLeft: SIZES.padding,
                  borderWidth: 1,
                  borderColor: COLORS.primary,
                  backgroundColor:
                    selected._id === item._id ? COLORS.primary : COLORS.white,
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
                  handleSelect(item);
                }}>
                <Text
                  style={{
                    // ...FONTS.h3,
                    fontSize: SIZES.h4,
                    fontWeight: 'bold',
                    color:
                      selected._id === item._id ? COLORS.white : COLORS.black,
                  }}>
                  {item.name}
                </Text>
                {addons && (
                  <Text
                    style={{
                      marginLeft: 3,
                      fontSize: SIZES.h4,
                      fontWeight: 'bold',
                      color:
                        selected._id === item._id
                          ? COLORS.white
                          : COLORS.primary,
                    }}>
                    ({addons.qty})
                  </Text>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  let selectedCount = adds.find(a => a._id === selected._id);

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
            height: 330,
            right: 0,
            bottom: 0,
            width: '100%',
            justifyContent: 'space-between',
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}>
          <View>
            <View
              style={{
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
                ADD-ONS
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
          </View>
          <View
            style={{
              flex: 1,
              borderBottomColor: COLORS.gray,
              borderBottomWidth: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingLeft: SIZES.padding,
              paddingRight: SIZES.padding,
              paddingBottom: SIZES.padding,
            }}>
            {selected._id ? (
              <>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-around',
                    marginRight: SIZES.padding * 2,
                  }}>
                  <Text style={{ ...FONTS.body3, color: COLORS.black }}>
                    Name:
                  </Text>
                  <Text style={{ ...FONTS.body3, color: COLORS.black }}>
                    Description:
                  </Text>
                  <Text style={{ ...FONTS.body3, color: COLORS.black }}>
                    Price:
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-around',
                  }}>
                  <Text
                    style={{
                      ...FONTS.body3,
                      fontWeight: 'bold',
                      color: COLORS.primary,
                    }}>
                    {selected.name}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.body3,
                      fontWeight: 'bold',
                      color: COLORS.primary,
                    }}>
                    {selected.description}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.primary,
                      fontWeight: 'bold',
                    }}>
                    ₱{selected.price}
                  </Text>
                </View>
              </>
            ) : (
              <Text style={{ ...FONTS.h3, color: COLORS.black }}>
                No Add-ons Selected
              </Text>
            )}
          </View>
          <View
            style={{
              flex: 1,
              // borderBottomColor: COLORS.gray,
              // borderBottomWidth: 1,
              padding: 5,
              flexDirection: 'column',
            }}>
            <Text style={{ ...FONTS.body3, color: COLORS.black }}>Select</Text>
            {renderServicesTab()}
          </View>
          {selected._id &&
            <View
              style={{
                // flex: 1,
                height: 50,
                // backgroundColor: COLORS.lightGray3,
                borderBottomColor: COLORS.gray,
                borderBottomWidth: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingLeft: SIZES.padding,
              }}>
              <Text style={{ ...FONTS.body3, color: COLORS.black }}>Qty</Text>
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
                  onPress={() => handleCounter(selected, 'less')}>
                  <Image
                    source={icons.minus1}
                    style={{ height: 15, width: 15, tintColor: COLORS.blue }}
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
                    {selectedCount ? selectedCount.qty : 0}
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
                  onPress={() => handleCounter(selected, 'add')}>
                  <Image
                    source={icons.plus}
                    style={{ height: 15, width: 15, tintColor: COLORS.blue }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          }
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
export default CustomerAddOns;
