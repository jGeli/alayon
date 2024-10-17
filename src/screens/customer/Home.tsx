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
import { icons, SIZES, COLORS, FONTS, constants, images, Icons } from '../../constants';
import { cutString } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';

import { getShops } from '../../redux/actions/data.actions';
import moment from 'moment/moment';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { CLEAR_FILTER, CLEAR_SELECTED_SHOP, CLOSE_MODALS, SET_ALLOW_LOCATION, SET_ALLOW_LOCATION_MODAL, SET_CUSTOMER_BASKET, SET_CUSTOMER_DATA, SET_LAUNDRY_SHOPS, SET_SELECTED_SHOP } from '../../redux/actions/type';
import { distanceMultiplier } from '../../globals/env';
import AllowLocationModal from '../../components/Modals/AllowLocationModal';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';
import Popover, { PopoverPlacement } from 'react-native-popover-view';


const varEnv = constants.varEnv;

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  // const useNavigate = useNavigation();  
  const { filter } = useSelector(({ui}) => ui)
  const { isLocationAllow, location: {cityMun, _id }} = useSelector(({ data }) => data);
  const {user: { location} } = useSelector(({auth}) => auth)
  const [refreshing, setRefreshing] = useState(false);
  const [shops, setShops] = useState([])
  const onRefresh = React.useCallback(() => {
    dispatch({type: CLEAR_FILTER})
    setRefreshing(true);
    handleGetShops();
    
    setTimeout(() => {
      setRefreshing(false)
    }, 30000);
  }, []);


  const handleGetShops = async () => {
    setShops([])
    let fltr = filter ? filter : {}
    await dispatch(getShops({areaLocation: _id, ...fltr}))
      .then(a => {
        if (a && a.length !== 0) {
          setShops(a)
        }
        setTimeout(() => {
          setRefreshing(false)
        }, 2000);
      }).catch(err => {
        console.log(err)
        setTimeout(() => {
          setRefreshing(false)
        }, 2000);
      })


  }

  const onShopSelect = item => {
    console.log("SELECTED", item)
    if (item.services && item.services.length !== 0) {
      dispatch({ type: CLEAR_SELECTED_SHOP })
      dispatch({
        type: SET_SELECTED_SHOP,
        payload:  item,
      });
      navigation.navigate('ShopServices', { shopId: item._id});
    }
  };

  const handleLocation = () => {
    console.log('IS ALLOW LOCATION', isLocationAllow)
    
    // if (!isLocationAllow ) {
    //   dispatch({ type: SET_ALLOW_LOCATION_MODAL })
    // } else {
      navigation.navigate('AreaLocations', {})
    // }
  }



  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // borderWidth: 1
        }}
      >
      <TouchableOpacity
          onPress={() => handleLocation()}
          // onPress={() => navigation.openDrawer()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              // padding: 4,
              // borderRadius: SIZES.radius,
              // paddingHorizontal: SIZES.padding * 2,
              // paddingLeft: SIZES.padding * 2,
              // backgroundColor: COLORS.info400,
              // marginVertical: 4,
              paddingHorizontal: SIZES.base / 2,
              // borderWidth: .5,
              // borderColor: COLORS.info400,

              // marginLeft: 10,
              // flex: 1,
              // width: '60%',
            }}>
              <Image
              source={icons.location}
              resizeMode="contain"
              style={{
                width: 25,
                marginRight: 8,

                height: 25,
                tintColor: COLORS.lightOrange,
                // marginRight: 10
              }}
            />
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.white,
                fontSize: 16,
                fontWeight: '500',
                // marginTop: 8,
                // marginLeft: 4,
                paddingRight: 4,

                
                // paddingHorizontal: 10
              }}>
              {cityMun  ? ` ${cutString(cityMun, 25)}` : 'Select Location'}
            </Text>
          </View>
         
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Search', {})}
          style={{
            justifyContent: 'center',
            paddingHorizontal: SIZES.base,
          }}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={{
              width: 25,
              // margin: SIZES.base,
              height: 25,
              tintColor: COLORS.white
            }}
          />
        </TouchableOpacity>
        </View>
    </>
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
                textAlign: 'left',
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
  
  // function renderAddIconButton() {
  //   return (
  //     <Popover
  //       key={'left'} 
  //       placement={PopoverPlacement.TOP} 
  //       popoverStyle={{ 
  //         backgroundColor: 'rgba(255,255,255, 0)', 
  //         alignItems: 'center', 
  //         justifyContent: 'center' 
  //       }} 
  //       backgroundStyle={{ backgroundColor: 'transparent' }}
  //       from={(
  //         <TouchableOpacity 
  //           // onPress={() => { setShowPopover(true), setPressed('Popover')}} 
  //           style={{ 
  //             // elevation: 5, 
  //             // backgroundColor: COLORS.white, 
  //             // borderColor: COLORS.white, 
  //             // borderWidth: 1, 
  //             // borderRadius: 25, 
  //             // paddingHorizontal: 10, 
  //             alignItems: 'center', 
  //             justifyContent: 'flex-end' 
  //           }}>
  //             <Image 
  //               source={icons.dotsetting}
  //               style={{
  //                 height: 25,
  //                 width: 45,
  //                 tintColor: COLORS.primary
  //               }}
  //             />
  //         </TouchableOpacity>
  //       )}
  //     >
  //       <View style={{ width: '100%', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
  //         <View style={{ height: 60, width: 60, alignItems: 'center', justifyContent: 'center' }}>
  //           <TouchableOpacity
  //             style={{
  //               borderColor: COLORS.white,
  //               elevation: 3,
  //               borderRadius: 30,
  //               padding: 10,
  //               alignItems: 'center',
  //               justifyContent: 'center',
  //               backgroundColor: COLORS.info500
  //             }}>
  //             {/* <Icon style={{ paddingTop: 10, height: 65, width: 35, flex: 1 }} name='barcode-scan' size={30}>
  //             </Icon> */}
  //             <Image
  //               source={icons.star}
  //               resizeMode='contain'
  //               style={{
  //                 height: 34,
  //                 width: 34
  //               }}
  //             />
  //           </TouchableOpacity>
  //         </View>
  //         <View style={{ height: 60, width: 60, alignItems: 'center', justifyContent: 'center', }}>
  //           <TouchableOpacity
  //             style={{ backgroundColor: COLORS.white, borderColor: COLORS.white, elevation: 3, borderRadius: 30, padding: 4, alignItems: 'center', justifyContent: 'center' }}>
  //             <Image
  //               source={icons.star}
  //               resizeMode='contain'
  //               style={{
  //                 height: 46,
  //                 width: 46
  //               }}
  //             />
  //           </TouchableOpacity>
  //         </View>
  //         <View style={{ height: 60, width: 60, alignItems: 'center', justifyContent: 'center', }}>
  //           <TouchableOpacity 
  //             // onPress={() => {toggleModal(); setPressed('create')}} 
  //             style={{ elevation: 3, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
  //             {/* <IonIcons style={{ height: 30, width: 30, color: COLORS.white, }} name='create-outline' size={30}>

  //             </IonIcons> */}
  //             <Image
  //               source={icons.star}
  //               resizeMode='contain'
  //               style={{
  //                 height: 43,
  //                 width: 43
  //               }}
  //             />
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </Popover >
  //   )
  // }


  function renderNearbyList() {
    const renderItem = ({ item }) => {
      let itemLoc = item.location ? item.location : location && location?.latitude ? { latitude: location?.latitude, longitude: location?.longitude } : null;
      
      let distance = itemLoc && location ? haversine({ latitude: location?.latitude, longitude: location?.longitude }, { latitude: itemLoc?.latitude, longitude: itemLoc?.longitude }) || 0 : 0
      // console.log("DISTANCEC", distance)
      
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
            {
            item.shop_name === 'Alayon' ? 
              <View style={{
                position: 'absolute',
                left: '60%',
                top: '30%'
              }}>
              <Image 
                source={icons.certifiedBadge}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: COLORS.primary,
                  // backgroundColor: COLORS.primary,
                  // borderRadius: 40
                }}
              />
            </View>
            :
            null
              
            }
            
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
                {location && (location.latitude && location.longitude) ? `${parseFloat(distance * distanceMultiplier).toFixed(2)} Km away` : 'Not in range'}
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
          // paddingTop: SIZES.padding * 1,
          paddingRight: SIZES.padding * 0.5,
          paddingLeft: SIZES.padding * 0.5,
        }}>
        {/* <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        > */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.secondary,
            fontWeight: 'bold',
          }}>
          Nearby
        </Text>
        <TouchableOpacity
         style={{
          // paddingHorizontal: SIZES.base,
          // borderWidth: 1,
          height: 'auto',
          justifyContent: 'center',
        }}
        onPress={() => {navigation.navigate('Filter', {})}}>
            <Image source={icons.filter} style={{ 
            height: 22, width: 22, tintColor: COLORS.secondary, marginRight: 6
            }} />
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            flexDirection: 'row'
          }}
        >
          <Image 
            source={icons.location}
            resizeMode='contain'
            style={{
              height: 25,
              width: 25,
            }}
          />
          <Text>
            Find your location?
          </Text>
        </View> */}

        {/* </View> */}
        
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


  function renderFilteredList() {
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
              {location && (location.latitude && location.longitude) ? `${parseFloat(distance * distanceMultiplier).toFixed(2)} Km away` : 'Not in range'}
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.secondary,
            fontWeight: 'bold',
          }}>
          Filtered
        </Text>
        <TouchableOpacity
          onPress={() => {
            dispatch({type: CLEAR_FILTER})
          }}
        >
        <Text
            style={{
              ...FONTS.body3,
              color: COLORS.darkBlue,
              letterSpacing: 0,
              marginTop: SIZES.base,
              marginRight: SIZES.base,
              // fontWeight: 'bold',
            }}>
            Clear
          </Text>
          </TouchableOpacity>
        </View>
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





  useEffect(() => {
  
  
        handleGetShops()


    return () => {
      // dispatch({ type: SET_LAUNDRY_SHOPS, payload: [] });
      // dispatch({ type: CLOSE_MODALS });
      // dispatch({ type: CLEAR_FILTER });
    };
  }, [cityMun, filter]);

  


  return (
    <SafeAreaView style={styles.container}>
      <AllowLocationModal navigation={navigation} />
      {renderHeader()}

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
      {!filter ?
      <>
      {renderFeaturedList()}

      {renderNearbyList()}
      </>
      : 
      <>
      {renderFilteredList()}
      </>
      }
        
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
