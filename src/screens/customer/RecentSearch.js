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
} from 'react-native';
import { COLORS, FONTS, SIZES, icons, images } from '../../constants';
import { nearbyList } from '../../globals/data';
import { cutString } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOADING, STOP_LOADING } from '../../redux/actions/type';
import LoadingScreen from '../LoadingScreen';
import { useEffect } from 'react';

export default function RecentSearch({ navigation }) {
  const dispatch = useDispatch()
  const { loading } = useSelector(({ auth }) => auth);
  const [values, setValues] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    console.log('SUBMITTED');
    console.log(e);
  };

  const handleClick = () => {
    dispatch({ type: SET_LOADING })
    setTimeout(() => {
      dispatch({ type: STOP_LOADING })
    }, 5000)
  }

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={icons.back} style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
        <View
          style={{ flexDirection: 'row' }}
        >
          <TouchableOpacity style={{ marginRight: SIZES.padding }} onPress={() => navigation.navigate('PermissionScreen', {})}>
            <Image source={icons.dotsetting} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleClick()}>
            <Image source={icons.filter} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>
        </View>
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
            value={values}
            onChangeText={e => setValues(e)}
            onSubmitEditing={handleSubmit}
            placeholder="Search"
            placeholderTextColor={'gray'}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    );
  }

  function renderRecentSearches() {
    const renderItem = ({ item }) => {
      return (
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
          <Image
            source={item.bannerUrl}
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
                {item.ratings}
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
                {item.range}
              </Text>
            </View>
            <View style={{ width: '90%' }}>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.black,
                  fontWeight: 'bold',
                }}>
                {item.name}
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
                {cutString(item.location.address, 30)}
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
                  30,
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
                Closed at {item.closeAt}
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
        <Text style={{ ...FONTS.body3, color: COLORS.black, fontWeight: 'bold' }}>
          Recent Searches
        </Text>
        <FlatList
          data={nearbyList}
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
    dispatch({ type: STOP_LOADING })
  }, [])


  console.log(loading, 'loading')
  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingScreen
        style={{ backgroundColor: COLORS.white, opacity: .8 }}
        source={images.setLoading}
      />}
      {/* HEADER */}
      {renderHeader()}
      {/* SEARCH INPUT FIELD */}
      {renderSearch()}

      {/* RECENT SEARCHES LIST */}
      {renderRecentSearches()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: '100%',
    flex: 1,
    // padding: 5,
    padding: SIZES.padding * 1,
    backgroundColor: COLORS.lightGray4,
  },
  headerContainer: {
    paddingHorizontal: SIZES.semiRadius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    marginVertical: SIZES.padding * 1,
  },
  searchListContainer: {
    marginVertical: SIZES.padding * 1,
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
