//import liraries
import React, { Component, Fragment, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  SafeAreaView,
} from 'react-native';
import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  icons,
  images,
  styles,
} from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import { clothTypes } from '../../globals/data';
import { getShopById } from '../../redux/actions/merchant.actions';
import {
  CLEAR_CUSTOMER_BASKET,
  CLEAR_CUSTOMER_BASKETS,
  CLEAR_SELECTED_SHOP,
  CLOSE_MODALS,
  OPEN_BASKET_MODAL,
  OPEN_CUSTOMER_ADDONS_MODAL,
  SET_CUSTOMER_BASKET,
  SET_CUSTOMER_BASKETS,
  SET_CUSTOMER_ORDER,
  SET_SELECTED_SHOP,
} from '../../redux/actions/type';
import CustomerAddOns from '../../components/Modals/CustomerAddOns';
import CustomerBasket from '../../components/Modals/CustomerBasket';
import { userData5 } from '../../globals/data';
import { getCustomerShopBaskets, getCustomerShopById } from '../../redux/actions/customer.actions';
import Reviews from '../../components/Reviews';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCustomerBaskets, setCustomerBaskets } from '../../utils/AsyncStorage';
import LoadingScreen from '../LoadingScreen';

// create a component
export default ShopServices = ({ navigation, route }) => {
  const { shopId } = route.params;
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(({ auth }) => auth);
  const { order, baskets, basket, customer: { locations } } = useSelector(({ customer }) => customer);
  const { customerAddOns, basketModal } = useSelector(({ ui }) => ui);
  const [selectedShop, setSelectedShop] = useState({
    addons: []
  });
  const [cloths, setCloths] = useState();
  const [isAddonEnabled, setAddonEnabled] = useState(false);
  const [tab, setTab] = useState('services');
  const [loading, setLoading] = useState(true);

  const handleChat = async () => {
    // await AsyncStorage.removeItem('basket')
    // await AsyncStorage.removeItem('baskets')
    // dispatch({ type: CLEAR_CUSTOMER_BASKET })
    // dispatch({ type: CLEAR_CUSTOMER_BASKETS })
    console.log(selectedShop, 'SELECTED')
    let newChat = {
      sender: { _id: user._id},
      receiver: { _id: selectedShop.user }
    }
     navigation.navigate('Conversation', { conversation: newChat })
  }

  const toggleSwitch = () => {
    dispatch({
      type: SET_CUSTOMER_ORDER,
      payload: {
        hasAddons: order.addons.length === 0 ? false : !order.hasAddons,
      },
    });

    if (order.addons && order.addons.length === 0 && !customerAddOns) {
      dispatch({ type: OPEN_CUSTOMER_ADDONS_MODAL })
    }
    // setAddonEnabled(previousState => !previousState)
  };

  const handleCheckout = (val) => {
    if (val.length !== 0) {
      let pickupDelivery = null;

      if (!basket.pickupDelivery) {
        let defaultLocation = locations.find(a => a.isDefault)
        pickupDelivery = defaultLocation ? defaultLocation : null;
      } else {
        pickupDelivery = basket.pickupDelivery;
      }


      if (isAuthenticated) {
        navigation.navigate('OrderSummary', { shopId, rnd: Math.random(), selectedBaskets: val.map(a => a._id) });
      } else {
        navigation.navigate('SignIn', { redirection: 'OrderSummary', param: { shopId, rnd: Math.random(), baskets: val } });
      }
      dispatch({ type: CLOSE_MODALS });

      return
    } else {
      dispatch({ type: OPEN_BASKET_MODAL, payload: 'checkout_basket' });
      return
    }
  };


  const handleAddToBasket = () => {



    dispatch({ type: OPEN_BASKET_MODAL, payload: 'addbasket' });

  }

  const handleShop = async () => {
    let shopData = await dispatch(getCustomerShopById(shopId));
    if (isAuthenticated) {
      await dispatch(getCustomerShopBaskets(shopId));
    } else {
      let baskets = await getCustomerBaskets();
      let newBaskets = baskets.filter(a => a.shop._id === shopId);
      dispatch({ type: SET_CUSTOMER_BASKETS, payload: newBaskets })
    }


    if (shopData && shopData._id) {
      let { services } = shopData;
      if (services.length !== 0) {
        let service = services[0];
        if (service) {
          setCloths(service.cloths);
        }
      }
      setSelectedShop(shopData)
      
      dispatch({
        type: SET_SELECTED_SHOP,
        payload: shopData,
      });
      dispatch({
        type: SET_CUSTOMER_ORDER,
        payload: { service: shopData.services[0].service },
      });
    }
    setLoading(false)
  };

  const handleCounter = (item, type) => {
    let newCloths = [];
    let orderCloths = order.cloths;

    newCloths = orderCloths;

    if (type === 'less') {
      let ind = orderCloths
        .map(a => {
          return a.cloth;
        })
        .indexOf(item.cloth);

      if (ind >= 0) {
        let cloth = orderCloths[ind];

        if (cloth.qty > 1) {
          orderCloths[ind].qty--;
          newCloths = orderCloths;
        } else {
          newCloths = orderCloths.filter(a => a.cloth !== item.cloth);
        }
      }
    }

    if (type === 'add') {
      let cloth = orderCloths.find(a => a.cloth === item.cloth);
      if (!cloth) {
        let { service, cloth, batchQty,
          batchUnit,
          priceBatch,
          priceKilo,
          pricePiece } = item
        orderCloths.push({
          service,
          cloth,
          name: item.name,
          qty: 1,
          batchQty,
          batchUnit,
          priceBatch,
          priceKilo,
          pricePiece,
        });
        newCloths = orderCloths;
      } else {
        newCloths = orderCloths.map(a => {
          if (a.cloth === item.cloth) {
            a.qty++;
            return a;
          }
          return a;
        });
      }
    }

    dispatch({ type: SET_CUSTOMER_ORDER, payload: { cloths: newCloths } });
  };

  const handleChangeService = val => {
    dispatch({ type: SET_CUSTOMER_ORDER, payload: { service: val.service } });
    if (val) {
      setCloths(val.cloths);
    }
  };



  useEffect(() => {

    if (shopId) {
      dispatch({ type: CLEAR_CUSTOMER_BASKET })
      dispatch({ type: CLEAR_CUSTOMER_BASKETS })
      handleShop(shopId);
    }

    return () => {
      setCloths([]);
    };
  }, [shopId]);


  let totalItem = 0;
  order.cloths.forEach(a => (totalItem += a.qty));


  function renderHeader() {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: '25%',
          backgroundColor: COLORS.darkBlue,
        }}>
        <Image
          resizeMode="stretch"
          source={{ uri: selectedShop.bannerUrl }}
          // resizeMode="cover"
          style={{
            // top: 0,
            opacity: 0.3,
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        />

        <View
          style={{
            flex: 1,
            padding: 5,
            flexDirection: 'row',
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              // backgroundColor: COLORS.darkGray2,
              padding: 5,
            }}
            onPress={() => {
              navigation.goBack()
            }}>
            <Image
              source={icons.back}
              style={{ height: 20, width: 20, tintColor: COLORS.white }}
            />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', marginRight: SIZES.padding }}>
         

            <TouchableOpacity
              onPress={() => navigation.navigate('BasketsScreen', {})}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                height: 40,
                width: 40,
              }}>
              <Image
                source={icons.basket}
                resizeMode="contain"
                style={{ height: 25, width: 25, tintColor: COLORS.lightGray3 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            padding: SIZES.padding,
          }}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.white,
              fontWeight: 'bold',
            }}>
            {selectedShop.shop_name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: -1,
            zIndex: 10,
          }}>
          <View
            style={{
              flexBasis: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              // backgroundColor: COLORS.blue,
              borderBottomColor:
                tab === 'services' ? COLORS.primary : COLORS.darkGray,
              borderBottomWidth: 5,
              // borderTopColor: COLORS.primary,
              // borderTopWidth: 5,
            }}>
            <TouchableOpacity
              onPress={() => setTab('services')}
              style={{
                opacity: tab === 'services' ? 0.5 : 0.1,
                backgroundColor:
                  tab === 'services' ? COLORS.darkBlue : COLORS.gray,
                height: '100%',
                width: '100%',
              }}></TouchableOpacity>
            <Text
              onPress={() => setTab('services')}
              style={{
                ...FONTS.body4,
                position: 'absolute',
                fontWeight: tab === 'services' ? 'bold' : '600',
                color: tab === 'services' ? COLORS.white : COLORS.gray2,
              }}>
              Services
            </Text>
          </View>
          <View
            style={{
              flexBasis: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              // backgroundColor: COLORS.blue,
              borderBottomColor:
                tab === 'reviews' ? COLORS.primary : COLORS.darkGray,
              borderBottomWidth: 5,
              // borderTopColor: COLORS.primary,
              // borderTopWidth: 5,
              borderLeftColor: COLORS.gray,
              borderLeftWidth: 1,
            }}>
            <TouchableOpacity
              onPress={() => setTab('reviews')}
              style={{
                opacity: tab === 'reviews' ? 0.5 : 0.1,
                backgroundColor:
                  tab === 'reviews' ? COLORS.darkBlue : COLORS.gray,
                height: '100%',
                width: '100%',
              }}></TouchableOpacity>
            <Text
              onPress={() => setTab('reviews')}
              style={{
                ...FONTS.body4,
                position: 'absolute',
                fontWeight: tab === 'reviews' ? 'bold' : '600',
                color: tab === 'reviews' ? COLORS.white : COLORS.gray2,
              }}>
              Reviews
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderServicesTab() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: 70,
        }}>
        <FlatList
          horizontal
          contentContainerStyle={{
            justifyContent: 'center',
            paddingRight: 20,
            paddingLeft: 10,
            alignItems: 'center',
          }}
          data={selectedShop.services}
          keyExtractor={item => `${item._id}`}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              disabled={item.cloths.length === 0}
              style={{
                marginLeft: SIZES.padding,
                marginRight:
                  index == selectedShop.services.length - 1 ? SIZES.padding : 0,
                backgroundColor:
                  item.cloths.length === 0
                    ? COLORS.darkGray
                    : order.service == item.service
                      ? COLORS.primary
                      : COLORS.lightGray3,
                borderRadius: SIZES.semiRadius,
                paddingLeft: SIZES.radius,
                paddingRight: SIZES.radius,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 45,
                elevation: 5,
              }}
              onPress={() => {
                handleChangeService(item);
              }}>
              <Text
                style={{
                  // ...FONTS.h3,
                  fontSize: SIZES.h4,
                  fontWeight: 'bold',
                  color:
                    order.service == item.service ? COLORS.white : COLORS.black,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  function renderClothCountList() {
    const renderItem = ({ item, index }) => {
      let clothOrder = order.cloths.find(a => a.cloth === item.cloth);
      return (
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomColor: COLORS.gray,
            borderBottomWidth: 0.5,
            margin: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: COLORS.gray3,
                padding: SIZES.padding,
                borderRadius: 50,
                marginRight: SIZES.padding,
              }}>
              <Image
                source={icons.camera}
                resizeMode="contain"
                style={{ height: 20, width: 20, tintColor: COLORS.primary }}
              />
            </View>
            <View>
              <Text
                style={{
                  // ...FONTS.h3,
                  fontSize: SIZES.body3,
                  fontWeight: '700',
                  color: COLORS.black,
                }}>
                {item.name}
              </Text>
            </View>
          </View>
          <View style={{ ...style.counterContainer }}>
            <TouchableOpacity
              style={{ ...style.counterButton }}
              onPress={() => handleCounter(item, 'less')}>
              <Image
                source={icons.minus1}
                resizeMode="contain"
                style={{ height: 15, width: 15, tintColor: COLORS.white }}
              />
            </TouchableOpacity>
            <Text style={{ ...FONTS.h4, width: 25, textAlign: 'center' }}>
              {clothOrder && clothOrder.qty ? clothOrder.qty : 0}
            </Text>
            <TouchableOpacity
              style={{ ...style.counterButton }}
              onPress={() => handleCounter(item, 'add')}>
              <Image
                source={icons.plus}
                resizeMode="contain"
                style={{ height: 15, width: 15, tintColor: COLORS.white }}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    return (
      <FlatList
        contentContainerStyle={{
          // justifyContent: 'center',
          // paddingTop: 20,
          overflow: 'scroll',
          paddingBottom: SIZES.padding * 5,
        }}
        data={cloths}
        keyExtractor={(item, index) => `${index}-${Math.random()}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator
        renderItem={renderItem}
      />
    );
  }


  function renderAddons() {
    return (
      <View
        style={{
          flexDirection: 'column',
          height: 75,
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
            <Image
              source={icons.puzzle}
              style={{ height: 25, width: 25, tintColor: COLORS.primary }}
            />
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.black,
                marginLeft: 5,
              }}>
              ADD-ONS
            </Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: COLORS.primary }}
            thumbColor={isAddonEnabled ? COLORS.primary : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={order.hasAddons}
            disabled={selectedShop.addons && selectedShop.addons.length === 0}
          />
        </View>
        <TouchableOpacity
          onPress={() => dispatch({ type: OPEN_CUSTOMER_ADDONS_MODAL })}
          disabled={selectedShop.addons && selectedShop.addons.length === 0}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text
            style={{
              color: COLORS.black,
              marginLeft: SIZES.padding,
            }}>
            {order.addons.map((a, index) => {
              return `${a.name} (${a.qty})${index !== order.addons.length - 1 ? ', ' : ''
                }`;
            })}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.darkGray,
                marginLeft: 5,
              }}>
              {selectedShop.addons && selectedShop.addons.length === 0
                ? 'No Add-ons available'
                : 'Select'}
            </Text>
            <Image
              source={icons.arrow_right}
              style={{ height: 25, width: 25, tintColor: COLORS.darkGray }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }


  function renderFooter() {
    return (
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: COLORS.lightGray4,
          height: 50,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: '25%',
          }}
          onPress={() => handleChat(
          )}
        >
          <Image
            source={icons.chat}
            resizeMode="contain"
            style={{ height: 25, width: 25 }}
          />
          <Text style={{ ...FONTS.body5, color: COLORS.black }}>Chat Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: '25%',
            borderLeftColor: COLORS.gray,
            borderRightColor: COLORS.gray,
            // backgroundColor: COLORS.lightGray4,
            borderLeftWidth: 1,
            // padding: 3,
          }}
          onPress={() => handleAddToBasket()}>
          <Image
            source={icons.addBasket}
            resizeMode="contain"
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.primary,
            }}
          />
          <Text style={{ ...FONTS.body5, color: COLORS.black }}>
            Add to Basket
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: '50%',
            backgroundColor: COLORS.primary,
            borderLeftColor: COLORS.gray,
            borderLeftWidth: 1,
            height: '100%',
          }}
          onPress={() => handleCheckout(baskets)}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
              // fontWeight: 'bold',
              margin: SIZES.padding,
            }}>
            Checkout ({baskets.length})
          </Text>
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <Fragment>
      {loading && <LoadingScreen
        // style={{ backgroundColor: COLORS.white, opacity: .8 }}
        source={images.setLoading}
      />}
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <CustomerBasket
          active={
            basketModal === 'addbasket' || basketModal === 'checkout_basket'
          }
          onClose={e => {

            if (basketModal === 'checkout_basket' && e) {
              handleCheckout(e)
            } else {
              dispatch({ type: CLOSE_MODALS });
            }
          }}
        />
          < CustomerAddOns
            active={customerAddOns}
            onClose={() => dispatch({ type: CLOSE_MODALS })}
          />
        
        {renderHeader()}
        {tab === 'services' ? (
          <>
            <View
              style={{
                ...styles.container,
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: -10,
              }}>
              <View style={{ flex: 1, width: '100%' }}>
                {renderServicesTab()}
                <View
                  style={{
                    backgroundColor: COLORS.lightGray3,
                    // height: 300,
                    flexGrow: 1,
                    // marginTop: SIZES.padding,
                    paddingBottom: SIZES.padding * 3,
                  }}>
                  {renderClothCountList()}
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                backgroundColor: COLORS.lightGray3,
              }}>
        {selectedShop.addons.length !== 0 &&
              renderAddons()
        }
            </View>
            {renderFooter()}
          </>
        ) : (
          <Reviews shop={selectedShop._id} />
        )}

      </SafeAreaView>
    </Fragment>
  );
};

// define your styles
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  buttonSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.gray3,
  },
  buttonSelect: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    paddingLeft: SIZES.padding * 3,
    paddingRight: SIZES.padding * 3,
    backgroundColor: COLORS.gray3,
    opacity: 0.3,
  },
  selectedButton: {
    backgroundColor: COLORS.primary,
    elevation: 5,
    opacity: 1,
  },
  pricingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: SIZES.semiRadius,
    borderTopRightRadius: SIZES.semiRadius,
    backgroundColor: COLORS.gray3,
  },
  pricingButton: {
    padding: 5,
    paddingLeft: SIZES.padding * 1,
    paddingRight: SIZES.padding * 1,
    opacity: 0.3,
  },
  selectedPricing: {
    elevation: 5,
    opacity: 1,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counterButton: {
    borderRadius: 30,
    margin: SIZES.padding,
    height: 30,
    width: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardConatiner: {
    width: '80%',
    flex: 1,
    padding: SIZES.padding * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
