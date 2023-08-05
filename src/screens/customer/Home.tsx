import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  PermissionsAndroid,

} from 'react-native';
import haversine from "haversine";
import { icons, SIZES, COLORS, FONTS, constants, images } from '../../constants';
import { cutString } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { getShops } from '../../redux/actions/data.actions';
import moment from 'moment/moment';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { CLEAR_SELECTED_SHOP, CLOSE_MODALS, SET_ALLOW_LOCATION, SET_ALLOW_LOCATION_MODAL, SET_CUSTOMER_BASKET, SET_CUSTOMER_DATA, SET_LAUNDRY_SHOPS, SET_SELECTED_SHOP } from '../../redux/actions/type';
import { distanceMultiplier } from '../../globals/env';
import AllowLocationModal from '../../components/Modals/AllowLocationModal';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';

const varEnv = constants.varEnv;

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const { isLocationAllow, location: { cityMun } } = useSelector(({ data }) => data);
  const { isAuthenticated, user: { location, _id } } = useSelector(({auth}) => auth)
  const [refreshing, setRefreshing] = useState(false);
  const [shops, setShops] = useState([])
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setShops([]);
    handleGetShops()
    setTimeout(() => {
      setRefreshing(false)
    }, 30000);
  }, []);

  const handleGetShops = async () => {
    await dispatch(getShops())
      .then(a => {
        if (a && a.length !== 0) {
          setShops(a)
        }
        setTimeout(() => {
          setRefreshing(false)
        }, 2000);
      }).catch(err => {
        console.log(err)
        // setTimeout(() => {
        //   setRefreshing(false)
        // }, 2000);
      })


  }

  const onShopSelect = item => {
    console.log("SELECTED")
    if (item.services && item.services.length !== 0) {
      dispatch({ type: CLEAR_SELECTED_SHOP })
      dispatch({
        type: SET_SELECTED_SHOP,
        payload: {_id: item._id},
      });
      navigation.navigate('ShopServices', { shopId: item._id });
    }
  };

  const handleLocation = () => {
    console.log('IS ALLOW LOCATION', isLocationAllow)
    
    if (!isLocationAllow ) {
      dispatch({ type: SET_ALLOW_LOCATION_MODAL })
    } else {
      navigation.navigate('SelectRegion', { navType: 'current', location })
    }
  }



  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => handleLocation()}
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: SIZES.padding * 1,
            }}>
            <Image
              source={icons.nearby}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.white,
              }}
            />
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              // backgroundColor: COLORS.black,
              paddingRight: SIZES.padding,
              flex: 1,
              // width: '80%',
            }}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.lightGray2
              }}>
              {cityMun  ? cutString(cityMun, 25) : 'Find your location?'}
            </Text>
          </View>
        </TouchableOpacity>
        {/* {isAuthenticated &&
        <TouchableOpacity
          onPress={() => navigation.navigate("Chats", { shops })}
          style={{
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}
        >
          <Image
            source={icons.chat}
            resizeMode='contain'
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.black
            }}
          />
        </TouchableOpacity>
        } */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Search', {})}
          style={{
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.white
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
         style={{
          paddingRight: SIZES.padding * 2,
          justifyContent: 'center',
        }}
        onPress={() => {navigation.navigate('Filter', {})}}>
            <Image source={icons.filter} style={{ height: 25, width: 25, tintColor: COLORS.white }} />
          </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Filter', {})}
          style={{
            justifyContent: 'center',
            paddingRight: SIZES.padding * 1,
          }}>
          <Image
            source={icons.filter}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity> */}
      </View>
    );
  }

  function renderFeaturedList() {
    const renderItem = ({ item }) => {
      return shops.length === 0 ? (
        <SkeletonPlaceholder>
          <TouchableOpacity
            style={{
              width: 150,
              height: 200,
              borderRadius: SIZES.semiRadius,
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              marginRight: SIZES.padding * 1,
            }}
          // onPress={() => onSelectCategory(item)}
          ></TouchableOpacity>
        </SkeletonPlaceholder>
      ) : (
        <TouchableOpacity
          style={{
            width: 150,
            height: 200,
            borderRadius: SIZES.semiRadius,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            marginRight: SIZES.padding,
          }}
          onPress={() => onShopSelect(item)}>
          <Image
            source={{ uri: `${item.bannerUrl}` }}
            resizeMode="cover"
            style={{
              width: 150,
            height: 200,
              position: 'absolute',
              borderRadius: SIZES.semiRadius,
            }}
          />
        <Image
            source={images.featureOverlay}
            style={styles.bannerOverlay}
          />

          <View style={styles.bannerStyle}>
  
            <Text
              style={{
                fontWeight: 'bold',
                // ...FONTS.body5,
                color: COLORS.white,
                // position: 'absolute',
                textAlign: 'left'
              }}>
              {cutString(item.shop_name, 25)}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View
        style={{
          // margin: 3,
          paddingTop: SIZES.padding * 1,
          paddingRight: SIZES.padding * 0.5,
          paddingLeft: SIZES.padding * 0.5,
        }}>
        <Text style={{ ...FONTS.h3, color: COLORS.secondary, fontWeight: 'bold' }}>
          Featured
        </Text>
        <FlatList
          data={shops.length !== 0 ? shops : constants.featuredSkeleton}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingVertical: SIZES.padding * 1,
          }}
        />
      </View>
    );
  }


  function renderNearbyList() {
    const renderItem = ({ item }) => {
      let itemLoc = item.location ? item.location : location && location?.latitude ? { latitude: location?.latitude, longitude: location?.longitude } : null;
      
      let distance = itemLoc && location ? haversine({ latitude: location?.latitude, longitude: location?.longitude }, { latitude: itemLoc?.latitude, longitude: itemLoc?.longitude }) || 0 : 0
      return shops.length === 0 ? (
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 120,
            borderRadius: SIZES.semiRadius,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginBottom: SIZES.padding * 1,
            borderColor: COLORS.black,
            borderWidth: 0.5,
          }}
        // onPress={() => console.log(item)}
        >

          <SkeletonPlaceholder>
            <View
              style={{
                width: 100,
                height: 120,
                borderTopLeftRadius: SIZES.semiRadius,
                borderBottomLeftRadius: SIZES.semiRadius,
                // position: 'absolute',
              }}></View>
          </SkeletonPlaceholder>
          <View style={styles.cardConatiner}>
            <View style={{ width: '90%', margin: SIZES.semiRadius }}>
              <SkeletonPlaceholder>
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.black,
                    fontWeight: 'bold',
                  }}></Text>
              </SkeletonPlaceholder>
            </View>

            <View style={{ width: '90%', margin: SIZES.semiRadius }}>
              <SkeletonPlaceholder>
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.black,
                    fontWeight: 'bold',
                  }}></Text>
              </SkeletonPlaceholder>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 120,
            borderRadius: SIZES.semiRadius,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginBottom: SIZES.padding,
            backgroundColor: COLORS.lightGray4,
            elevation: 4,
            // borderColor: COLORS.gray,
            // borderWidth: 0.5,
          }}
          onPress={() => onShopSelect(item)}>
          <Image
            source={{ uri: `${item.bannerUrl}` }}
            // source={ {/}`${varEnv.apiUrl}/static/banners/${item.bannerUrl}`}
            resizeMode="cover"
            style={{
              width: 100,
              height: 120,
              borderTopLeftRadius: SIZES.semiRadius,
              borderBottomLeftRadius: SIZES.semiRadius,
              // position: 'absolute',
            }}
          />

          <View style={styles.cardConatiner}>
            <View style={styles.rateBadge}>
              <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>
                {item.avgRate}
              </Text>
            </View>

            <View style={styles.locationRange}>
              <Image
                source={icons.pin}
                resizeMode="contain"
                style={{
                  width: 15,
                  height: 20,
                  tintColor: COLORS.primary,
                  marginRight: SIZES.padding * 0.2,
                }}
              />
              <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>
                {location?.address ? `${parseFloat(distance * distanceMultiplier).toFixed(2)} Km away` : 'Not in range'}
              </Text>
            </View>
            <View style={{ width: '90%' }}>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.black,
                  fontWeight: 'bold',
                }}>
                {cutString(item.shop_name, 23)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '90%',
              }}>
              <Image
                source={icons.pin}
                resizeMode="contain"
                style={{
                  width: 15,
                  height: 20,
                  tintColor: COLORS.black,
                  marginRight: SIZES.padding * 0.5,
                }}
              />
              <Text style={{ color: COLORS.black, flex: 1 }}>
                {cutString(item.location.address, 25)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '90%',
              }}>
              <Image
                source={icons.washing}
                resizeMode="contain"
                style={{
                  width: 15,
                  height: 20,
                  tintColor: COLORS.black,
                  marginRight: SIZES.padding * 0.5,
                }}
              />
              <Text style={{ color: COLORS.black }}>
                {cutString(
                  item.services
                    .map(a => {
                      return a.name;
                    })
                    .join(', '),
                  25,
                )}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '90%',
              }}>
              <Text style={{ color: COLORS.danger, fontWeight: 'bold' }}>
                Closed at {moment(item.closing).format('LT')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View
        style={{
          flex: 1,
          paddingTop: SIZES.padding * 1,
          paddingRight: SIZES.padding * 0.5,
          paddingLeft: SIZES.padding * 0.5,
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.secondary,
            fontWeight: 'bold',
          }}>
          Nearby
        </Text>
        <FlatList
          data={shops.length !== 0 ? shops : constants.ShopSkeleton}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={renderItem}
          contentContainerStyle={{
            // marginTop: 10,
            paddingVertical: SIZES.padding * 1,
          }}
        />
      </View>
    );

  }

  async function checkPermission() {
    const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    // if (!granted) {
    //   setTimeout(() => {
    //     dispatch({ type: SET_ALLOW_LOCATION_MODAL })
    //   }, 3000)
    // }
    dispatch({ type: SET_ALLOW_LOCATION, payload: granted })
  }



  useEffect(() => {
    handleGetShops()
    checkPermission()

    return () => {
      // dispatch({ type: SET_LAUNDRY_SHOPS, payload: [] });
      // dispatch({ type: CLOSE_MODALS });
    };
  }, []);

  console.log(_id, 'USERID')
  return (
    <SafeAreaView style={styles.container}>
      <AllowLocationModal navigation={navigation} />
      {renderHeader()}

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderFeaturedList()}

        {renderNearbyList()}
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray3,
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding
  },
  bodyContainer: {
    margin: 5,
    flex: 1,
  },
  cardConatiner: {
    width: '100%',
    flex: 1,
    padding: SIZES.padding * 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rateBadge: {
    top: 10,
    right: 10,
    height: 20,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#317A49',
    borderRadius: 5,
  },
  locationRange: {
    flexDirection: 'row',
    bottom: -10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  bannerOverlay: {
    position: 'absolute',
    width: 150,
    height: 100,
    borderRadius: SIZES.semiRadius
  },
  bannerStyle: {
    padding: 5,
    paddingLeft: 5,
    // backgroundColor: COLORS.primary,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: SIZES.semiRadius,
    // borderBottomRightRadius: SIZES.semiRadius,
  },
});
