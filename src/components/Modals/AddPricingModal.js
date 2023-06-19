//import liraries
import React, {Component, useEffect, useState, useRef} from 'react';
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
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, styles} from '../../constants';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getCloths} from '../../redux/actions/data.actions';
import {createClothType, deleteCloths} from '../../redux/actions/admin.actions';
import {updateServiceClothPricing} from '../../redux/actions/merchant.actions';

// create a component
const AddPricingModal = ({type, title, onSubmit, onClose}) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    price: 0,
    qty: 0,
    unit: 'kilo',
  });

  const handleChange = prop => e => {
    setValues({...values, [prop]: e});
  };

  const handleSave = () => {
    let newObj = {};
    let pk =
      title === 'Piece'
        ? 'pricePiece'
        : title === 'Kilo'
        ? 'priceKilo'
        : 'priceBatch';

    newObj =
      title !== 'Batch'
        ? {_id: type._id, [pk]: values.price}
        : {
            _id: type._id,
            [pk]: values.price,
            batchUnit: values.unit,
            batchQty: values.qty,
          };

    dispatch(updateServiceClothPricing(newObj));
    setValues({
      price: 0,
      qty: 0,
      unit: 'kilo',
    });
  };

  useEffect(() => {
    if (!title) {
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
  }, [title]);

  console.log('CLOTH TYPE');
  console.log(type);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={title ? true : false}>
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
            height: title !== 'Batch' ? 'auto' : 280,
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
              {String(type && type.name).toUpperCase()} PRICING
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
              PRICE PER {String(title).toUpperCase()}
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
                value={values.price}
                onChangeText={handleChange('price')}
                placeholder="Enter Amount"
                placeholderTextColor={'gray'}
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
                {title === 'Piece'
                  ? `/ (1) Piece.`
                  : title === 'Kilo'
                  ? '/ (1) kilo or 1000g'
                  : '/ (1) Batch OR Load'}
              </Text>
            </View>
            {title === 'Batch' && (
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
                    value={values.qty}
                    onChangeText={handleChange('qty')}
                    placeholder="Qty"
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
                    value={values.unit}
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
export default AddPricingModal;
