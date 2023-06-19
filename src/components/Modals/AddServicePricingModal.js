//import liraries
import React, {Component, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, styles} from '../../constants';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getCloths} from '../../redux/actions/data.actions';
import {createClothType, deleteCloths} from '../../redux/actions/admin.actions';
import {updateServiceClothPricing} from '../../redux/actions/merchant.actions';
import {SET_SELECTED_LAUNDRY_SERVICE} from '../../redux/actions/type';

// create a component

const AddServicePricingModal = ({active, onSubmit, onClose}) => {
  const dispatch = useDispatch();
  const {selectedService} = useSelector(({data}) => data);
  const [val, setVal] = useState({
    price: 10,
    unit: 'kilo',
    qty: 0,
  });
  const [rnd, setRnd] = useState(0);
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  const handleChange = prop => e => {
    setVal({...val, [prop]: e});
    // dispatch({
    //   type: SET_SELECTED_LAUNDRY_SERVICE,
    //   payload: {...selectedService, [prop]: e},
    // });
  };

  const handleSave = () => {
    onSubmit(selectedService, val);
    dispatch({
      type: SET_SELECTED_LAUNDRY_SERVICE,
      payload: {
        price: 0,
        qty: 0,
        unit: 'kilo',
      },
    });
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
    setVal({
      ...val,
      price:
        active === 'Piece'
          ? selectedService.pricePiece
          : active === 'Kilo'
          ? selectedService.priceKilo
          : selectedService.priceBatch,
      qty: active !== 'Batch' ? 0 : selectedService.batchQty,
      unit: 'kilo',
    });

    setRnd(Math.random());
  }, [active]);

  console.log('valuess');
  console.log(val);
  let isActive =
    active === 'Piece' || active === 'Kilo' || active === 'Batch'
      ? true
      : false;
  console.log(active);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isActive ? true : false}>
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
            height: active !== 'Batch' ? 'auto' : 280,
            right: 0,
            bottom: 0,
            width: '100%',
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                ...FONTS.h3,
                fontSize: 18,
                textAlign: 'center',
              }}>
              EDIT PRICING
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
              justifyContent: 'center',
              alignItems: 'flex-start',
              // flexGrow: 1,
              padding: SIZES.padding,
              width: '100%',
            }}>
            <Text
              style={{
                ...FONTS.body4,
                textAlign: 'left',
                fontWeight: 'bold',
                color: COLORS.black,
              }}>
              PRICE PER {String(active).toUpperCase()}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -10,
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.black,
                  fontWeight: 'bold',
                  marginRight: SIZES.padding,
                }}>
                ₱
              </Text>

              <TextInput
                placeholder="Enter Amount"
                value={String(val.price)}
                onChangeText={handleChange('price')}
                placeholderTextColor={'gray'}
                keyboardType="numeric"
                style={{
                  fontSize: 18,
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                  width: 150,
                  color: COLORS.darkGray,
                }}
              />
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.black,
                  marginLeft: SIZES.padding,
                  marginTop: SIZES.padding * 2,
                }}>
                {active === 'Piece'
                  ? `/ (1) Piece.`
                  : active === 'Kilo'
                  ? '/ (1) kilo or 1000g'
                  : '/ (1) Batch OR Load'}
              </Text>
            </View>
            {active === 'Batch' && (
              <>
                <Text
                  style={{
                    ...FONTS.body4,
                    textAlign: 'left',
                    fontWeight: 'bold',
                    color: COLORS.black,
                    marginTop: SIZES.padding * 2,
                  }}>
                  QTY / UNIT PER BATCH
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    paddingLeft: SIZES.padding * 2,
                    paddingRight: SIZES.padding * 2,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginTop: -10,
                  }}>
                  <TextInput
                    value={String(val.qty)}
                    onChangeText={handleChange('qty')}
                    keyboardType="numeric"
                    placeholderTextColor={'gray'}
                    style={{
                      fontSize: 18,
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1,
                      flex: 1,
                      color: COLORS.darkGray,
                      marginRight: SIZES.padding * 2,
                    }}
                  />
                  <TextInput
                    value={val.unit}
                    // onChangeText={handleChange('qty')}
                    // onChangeText={handleChange('unit')}
                    placeholder="Unit"
                    placeholderTextColor={'gray'}
                    style={{
                      fontSize: 18,
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1,
                      flex: 1,
                      marginLeft: SIZES.padding * 2,
                      color: COLORS.darkGray,
                    }}
                  />
                </View>
              </>
            )}
          </View>

          <View
            style={{
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: SIZES.padding * 2,
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
                SAVE
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

//make this component available to the app
export default AddServicePricingModal;
