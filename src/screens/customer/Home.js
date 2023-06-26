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
import { icons, SIZES, COLORS, FONTS, constants } from '../../constants';
import { cutString } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { getShops } from '../../redux/actions/data.actions';
import moment from 'moment/moment';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SET_LAUNDRY_SHOPS, SET_SELECTED_SHOP } from '../../redux/actions/type';

const varEnv = constants.varEnv;

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const { user: { locations } } = useSelector(({ auth }) => auth);
  const { shops, location } = useSelector(({ data }) => data);
  const [useLocation, setUseLocation] = useState(false);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        setUseLocation(false)
        return true;
      } else {
        setUseLocation(true)
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };


  const onShopSelect = item => {
    if (item.services && item.services.length !== 0) {
      navigation.navigate('ShopServices', { shopId: item._id });
      dispatch({ type: SET_SELECTED_SHOP, payload: item })
    }
  };


  let defaultLoaction = locations && locations.find(a => a.isDefault);

  console.log(useLocation)
  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          disabled={useLocation}
          onPress={() => navigation.navigate('Map', { navType: 'findLocation' })}
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
                tintColor: COLORS.black,
              }}
            />
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              // flex: 1,
              width: '80%',
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.primary,
                // fontWeight: 'bold',
              }}>
              {location && location.address ? cutString(location.address, 25) : 'Find your location?'}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Chats", {})}
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
              width: 20,
              height: 20,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
    );
  }

  function renderFeaturedList() {
    const renderItem = ({ item }) => {
      return shops.length === 0 ? (
        <SkeletonPlaceholder>
          <TouchableOpacity
            style={{
              width: 100,
              height: 150,
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
            width: 100,
            height: 150,
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
              width: 100,
              height: 150,
              position: 'absolute',
              borderRadius: SIZES.semiRadius,
            }}
          />

          <View style={styles.bannerStyle}>
            <Text
              style={{
                color: COLORS.white,
                fontWeight: 'bold',
                // ...FONTS.body5
                // position: 'absolute',
              }}>
              {cutString(item.shop_name, 20)}
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
        <Text style={{ ...FONTS.h3, color: COLORS.black, fontWeight: 'bold' }}>
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
        // onPress={() => onSelectCategory(item)}
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
                {item.ratings ? item.ratings : 1.2}
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
                {item.ratings ? item.ratings : 1.1} Km away
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
            color: COLORS.black,
            fontWeight: 'bold',
          }}>
          Nearby
        </Text>
        <FlatList
          data={shops.length !== 0 ? shops : constants.ShopSkeleton}
          showsVerticalScrollIndicator={false}
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

  useEffect(() => {
    dispatch(getShops());
    requestLocationPermission()
    return () => {
      dispatch({ type: SET_LAUNDRY_SHOPS, payload: [] });
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}

      {renderFeaturedList()}

      {renderNearbyList()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: COLORS.lightGray3,
  },
  headerContainer: {
    flexDirection: 'row',
    margin: 5,
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
  bannerStyle: {
    padding: 3,
    paddingLeft: 5,
    backgroundColor: COLORS.primary,
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomLeftRadius: SIZES.semiRadius,
    borderBottomRightRadius: SIZES.semiRadius,
  },
});
