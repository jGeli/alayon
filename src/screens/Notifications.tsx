import React, {useEffect, useState} from 'react';
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
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { nearbyList, notifications } from '../globals/data';
import { useSelector, useDispatch } from 'react-redux';
import { getNotifications } from '../redux/actions/customer.actions';

export default function Notification({ navigation }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(({ auth }) => auth);
  const [notifData, setNotifData] = useState([]);
    
  const handleUserNotification = async () => {
    let userNotifications = await dispatch(getNotifications())
    
    if(userNotifications.length != 0) {
      setNotifData(userNotifications)
    }

  }


  useEffect(() => {
    setNotifData([])
    handleUserNotification()
    
    
  }, [])

  console.log(notifData, "NOTIF IN NOTIF SCREEN!")
  

  function renderHeader() {
    return (
        <View
            style={styles.header}>
            <TouchableOpacity
                style={{  marginHorizontal: SIZES.padding, paddingBottom: 5, alignContent:'center', justifyContent: 'center' }}
                onPress={() => navigation.goBack()}>
                <Image
                    source={icons.back}
                    style={{ height: 20, width: 20, tintColor: COLORS.white }}
                />
            </TouchableOpacity>
            <Text
                style={{
                    ...FONTS.h3,
                    color: COLORS.white,
                    // fontWeight: 'bold',
                }}>
              NOTIFICATIONS
            </Text>

            <View
                style={{ margin: SIZES.padding, marginRight: SIZES.padding * 2, width: 20 }}
            ></View>
        </View>
    );
}

  function renderNotification() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 60,
            borderRadius: SIZES.semiRadius,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginBottom: SIZES.padding * 1,
            borderColor: COLORS.black,
            borderBottomWidth: 0.5,
          }}
        // onPress={() => onSelectCategory(item)}
        >
          <View style={styles.cardConatiner}>
            <View style={styles.rateBadge}>
              <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>
                {item.createdAt}
              </Text>
              <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>
                ID: {item.transactionId}
              </Text>
            </View>

            <View style={{ width: '90%' }}>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.black,
                  fontWeight: 'bold',
                }}>
                {item.title}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '90%',
              }}>
              <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>
                {item.content}
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
            style={{ color: COLORS.black900, fontSize: 18, fontWeight: 'bold'}}
          >{'Notification View?\nComing Soon..'}</Text>
        <FlatList
          data={notifData}
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

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      {renderHeader()}

      {renderNotification()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.lightGray3,
    // paddingBottom: SIZES.padding * 3,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: COLORS.primary,
    elevation: 3,
    paddingBottom: SIZES.padding,
    width: '100%'
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
    flexDirection: 'column',
    top: 10,
    right: 10,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  locationRange: {
    flexDirection: 'row',
    bottom: -5,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
