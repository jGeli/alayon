import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import React, { useEffect } from 'react';
import { COLORS, SIZES, FONTS, images, styles } from '../../constants';
import { myAccount } from '../../globals/data';
import UploadProfileImage from '../../components/UploadProfileImage';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/auth.actions';
import { clearData } from '../../utils/AsyncStorage';
export default function MyAccount({ navigation }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(({ auth }) => auth);
  const { name, imgUrl } = useSelector(({ customer }) => customer);

  const handleImage = (e) => {
    console.log(e)
  }


  function renderHeader() {




    return (
      <View
        style={{
          height: 40,
          flexGrow: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: SIZES.padding,
          // paddingBottom: SIZES.padding * 2,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: SIZES.font * 2,
              fontWeight: '600',
              color: COLORS.black,
            }}>
            {name}
          </Text>
          <Text
            style={{
              fontSize: SIZES.base * 2,
              color: COLORS.gray,
            }}>
            {user.email}
          </Text>
          <Text
            style={{
              fontSize: SIZES.base * 2,
              fontWeight: '600',
              color: COLORS.gray,
            }}>
            {user.mobile}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: SIZES.base,
          }}>
          <UploadProfileImage
            image={imgUrl}
            setImage={handleImage}
          />
        </View>
      </View>
    );
  }

  function renderList() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            borderColor: COLORS.black,
            borderTopWidth: 1,
            marginTop: SIZES.padding / 2,
          }}
          onPress={async () => {
            if (item.name === 'Logout') {
              await clearData();
              dispatch(logoutUser(navigation));

            } else {
              navigation.navigate(item.screen, {})
            }

          }}>
          <Image
            source={item.iconUrl}
            resizeMode="cover"
            style={{
              width: 25,
              height: 25,
              position: 'absolute',
            }}
          />
          <Text
            style={{
              fontSize: SIZES.base * 3,
              fontWeight: '600',
              color: COLORS.black,
              marginLeft: 50,
              padding: SIZES.padding,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ width: '100%', flexGrow: 1, padding: SIZES.padding }}>
        <FlatList
          data={myAccount}
          vertical
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingVertical: SIZES.padding * 1,
            // width: '100%',
          }}
        />
      </View>
    );
  }
  useEffect(() => {
    if (!isAuthenticated) {
      // navigation.navigate('SignIn', {})
    }

  }, [])


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {renderHeader()}

      {/* List of Screens */}
      {renderList()}

      {/* Footer Logo */}
    </SafeAreaView>
  );
}

const embeddedStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 20,
  },
  item: {
    paddingVertical: 10,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    width: SIZES.width,
  },
  bannerStyle: {
    padding: 3,
    paddingLeft: 5,
    backgroundColor: COLORS.primary,
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderBottomLeftRadius: SIZES.semiRadius,
    borderBottomRightRadius: SIZES.semiRadius,
  },
});
