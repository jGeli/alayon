import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  RefreshControl,
} from 'react-native';
import haversine from "haversine";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { COLORS, FONTS, SIZES, constants, icons, images } from '../../constants';
import { nearbyList } from '../../globals/data';
import { cutString } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_SELECTED_SHOP, SET_LOADING, SET_SELECTED_SHOP, STOP_LOADING } from '../../redux/actions/type';
import LoadingScreen from '../LoadingScreen';
import { useEffect } from 'react';
import { addSearches, getRecentSearches } from '../../redux/actions/customer.actions';
import { getShops } from '../../redux/actions/data.actions';
import { distanceMultiplier } from '../../globals/env';
import moment from 'moment';

export default function RecentSearch({ navigation }) {
  const dispatch = useDispatch()
  const { loading,  user: { location }  } = useSelector(({ auth }) => auth);
  const [searchType, setSearchType] = useState('recent');
  const [searchList, setSearchList] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [refreshing, setRefreshing] = useState(false);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setSearchList([]);
    handleGetRecentSearches()
    setTimeout(() => {
      setRefreshing(false)
    }, 10000);
  }, []);


  const handleSubmit = async e => {
    e.preventDefault();
    setRefreshing(true);
    setSearchType('search')
    if(searchString && searchString.length !== 0){
      handleGetShops()
    } else {
      handleGetRecentSearches()
    }
    console.log('SUBMITTED');
    console.log(e);
  };
  
  
  const handleGetShops = async () => {

    await dispatch(getShops({searchString}))
    .then(a => {
      if (a && a.length !== 0) {
        setSearchList(a)
      } else {
        setSearchList([])
      }
      setSearchType('search')
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
  


  const handleGetRecentSearches = async () => {
      let recentSearches = await dispatch(getRecentSearches());
      console.log('RECEENTS', recentSearches)
      if(recentSearches){
      
        setSearchList(recentSearches);
        setSearchType('recent')
        setTimeout(() => {
          setRefreshing(false)
        }, 3000);
      } else {
        setSearchType('recent')
      }
      console.log(recentSearches, 'RECENT SEARCHES')
  }

  const onShopSelect = item => {
    console.log("SELECTED", item)
    if (item.services && item.services.length !== 0) {
      dispatch({ type: CLEAR_SELECTED_SHOP })
      dispatch({
        type: SET_SELECTED_SHOP,
        payload:  item,
      });
      dispatch(addSearches(item._id))
      navigation.navigate('ShopServices', { shopId: item._id});
    }
  };

  
  

  useEffect(() => {
    handleGetRecentSearches();
    dispatch({ type: STOP_LOADING })
    
  }, [])
  
  function renderHeader() {
    return (
        <View
            style={styles.header}>
            <TouchableOpacity
                style={{ margin: SIZES.padding }}
                onPress={() => navigation.goBack()}>
                <Image
                    source={icons.back}
                    style={{ height: 25, width: 25, tintColor: COLORS.white }}
                />
            </TouchableOpacity>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1
                }}
            >
                <Text
                    style={{
                        ...FONTS.body2,
                        color: COLORS.white,
                        letterSpacing: 0,
                        // marginTop: SIZES.base,
                        // fontWeight: 'bold',
                    }}>
                  Search
                </Text>
            </View>

            <View
                style={{ margin: SIZES.padding, height: 25, width: 25 }}
            ></View>
        </View>
    );
}
  
  function renderSearch() {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.SectionStyle}>
          <Image
            source={icons.search} //Change your icon image here
            style={styles.ImageStyle}
          />
          <TextInput
            style={{
              fontSize: 18,
              flexGrow: 1,
              color: COLORS.black,
            }}
            value={searchString}
            onChangeText={e => setSearchString(e)}
            onSubmitEditing={handleSubmit}
            placeholder="Enter Search Details..."
            placeholderTextColor={'gray'}
            underlineColorAndroid="transparent"
          />
          {searchString.length !== 0 &&
            <TouchableOpacity
              onPress={() => { 
                
                  setRefreshing(true)
                  setSearchString('');
                  handleGetRecentSearches();
                
              }}
            >
                    <Image
            source={icons.cross} //Change your icon image here
            style={styles.ImageStyle}
          />
          </TouchableOpacity>}
        </View>
      </View>
    );
  }
  
  
  function renderNearbyList() {
    const renderItem = ({ item }) => {
      let itemLoc = item.location ? item.location : location && location?.latitude ? { latitude: location?.latitude, longitude: location?.longitude } : null;
      
      let distance = itemLoc && location ? haversine({ latitude: location?.latitude, longitude: location?.longitude }, { latitude: itemLoc?.latitude, longitude: itemLoc?.longitude }) || 0 : 0
      return searchList.length === 0 ? (
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
          paddingHorizontal: SIZES.padding
        }}>
        <Text style={{ ...FONTS.body3, color: COLORS.secondary, fontWeight: 'bold' }}>
         {searchType === 'recent' ? 'Recent Search' : 'Search Results'} 
        </Text>
        <FlatList
          data={searchList.length !== 0 ? searchList : constants.ShopSkeleton}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            // marginTop: 10,
            paddingVertical: SIZES.padding * 1,
          }}
        />
      </View>
    );

  }


  return (
    <SafeAreaView style={styles.container}>
      {loading ? <LoadingScreen
        style={{ backgroundColor: COLORS.white, opacity: .8 }}
        source={images.setLoading}
      /> : <>
      {/* HEADER */}
      {renderHeader()}
      {/* SEARCH INPUT FIELD */}
      {renderSearch()}

      
      {/* RECENT SEARCHES LIST */}
      {searchList.length !== 0 && renderNearbyList()}
      {/* {renderRecentSearches()} */}
      </>
    }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: COLORS.lightGray3,
    paddingBottom: SIZES.padding * 3,
    // alignItems: 'center'
  },
header: {
    // height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.primary,
    elevation: 5,
    width: '100%'
},
  searchContainer: {
    padding: SIZES.padding,
    marginVertical: SIZES.padding,
  },
  searchListContainer: {
    marginVertical: SIZES.padding,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    marginHorizontal: SIZES.base,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
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
});
