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
import {
  createShopAddOns,
  updateServiceClothPricing,
} from '../../redux/actions/merchant.actions';

// create a component
const AddOnsModal = ({active, onClose}) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: '',
    price: 0,
    description: '',
  });

  const handleChange = prop => e => {
    setValues({...values, [prop]: e});
  };

  const handleSave = () => {
    dispatch(createShopAddOns(values));
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
            height: 280,
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
                  textAlign: 'center',
                }}>
                CREATE ADD-ONS
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
                  fontWeight: 'bold',
                  color: COLORS.black,
                }}>
                Details
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{flexGrow: 1}}>
                  <TextInput
                    value={values.name}
                    onChangeText={handleChange('name')}
                    placeholder="Addons Name"
                    placeholderTextColor={'gray'}
                    style={{
                      fontSize: 18,
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1,
                      width: 200,
                      color: COLORS.darkGray,
                    }}
                  />
                </View>
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
                  placeholder="Price"
                  keyboardType="numeric"
                  placeholderTextColor={'gray'}
                  style={{
                    fontSize: 18,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    width: 100,
                    color: COLORS.darkGray,
                  }}
                />
              </View>

              <View style={{flexGrow: 1, width: '100%'}}>
                <TextInput
                  value={values.description}
                  onChangeText={handleChange('description')}
                  placeholder="Addons Description"
                  placeholderTextColor={'gray'}
                  style={{
                    fontSize: 18,
                    width: '100%',
                    marginTop: SIZES.padding,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    color: COLORS.darkGray,
                  }}
                />
              </View>
            </View>
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
export default AddOnsModal;
