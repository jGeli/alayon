import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  Modal,
  Animated,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, FONTS, images, styles, icons } from '../../constants';
import { CustomerMyAccount } from '../../globals/data';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/auth.actions';
import TermsAndCondition from '../../components/Modals/TermsAndCondition/TermsAndCondition';





export default function MyAccount({ navigation }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(({ auth }) => auth);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(0))[0];



  console.log(user, "USER")


  const handleOpenModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };



  const slideInFromRight = {
    transform: [
      {
        translateX: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [400, 0],
        }),
      },
    ],
  };



  const handleLogout = () => {
    console.log("LOGOUT!")
    dispatch(logoutUser(navigation));

  };

  function renderHeader() {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileSetup', { user })}
        style={{
          backgroundColor: COLORS.primary,
          flexDirection: 'row',
          height: 130,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingHorizontal: SIZES.padding2 * 2,
        }}
      >
        {user.imgUrl ?
          <Image
            source={{ uri: user.imgUrl }}
            resizeMode='contain'
            style={{
              height: 70,
              width: 70,
              borderRadius: 70,
            }}
          /> :
          <Image
            source={icons.user}
            resizeMode='contain'
            style={{
              height: 70,
              width: 70,
              tintColor: COLORS.white,
              borderRadius: 70
              // borderRadius: 999,
            }}
          />
        }

        <View
          style={{
            // borderColor: COLORS.lightGray3,
            // borderRadius: SIZES.radius,
            marginLeft: SIZES.padding * 2,
            marginBottom: SIZES.padding,
            height: '100%',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexGrow: 1
          }}
        >
          <Text
            style={{
              ...FONTS.body2, color: COLORS.white
            }}
          >
            {user.mobile ? `+63 ${user.mobile}` : 'Account Information'}
          </Text>
          <Text
            style={{
              ...FONTS.body3, color: COLORS.gold
            }}
          >
            Fill in your profile details
          </Text>
        </View>
        <Image
          source={icons.arrow_right}
          style={{ height: 30, width: 30, tintColor: COLORS.white }}
        />
      </TouchableOpacity>

    );
  }

  function renderList() {
    const renderItem = ({ item }) => {
      return (
        <View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              borderColor: COLORS.lightGray3,
              borderBottomWidth: 1.5,
              marginTop: SIZES.padding / 2,
              paddingBottom: SIZES.padding,
              paddingTop: SIZES.padding
            }}
            onPress={() => {
              if (item.name === 'Logout') {
                handleLogout();
              }
              else if (item.name === 'Terms And Condition') {
                // onPress={() => handleOpenModal()}
                onPress = handleOpenModal()
              }
              else if (item.name === '') {
                navigation.navigate(item.screen);
              }
              else {
                navigation.navigate(item.screen);
              }
            }}>
            {/* <Image
          source={item.iconUrl}
          resizeMode="cover"
          style={{
            width: 25,
            height: 25,
            position: 'absolute',
            tintColor: COLORS.black,
          }}
        /> */}
            <Text
              style={{
                ...FONTS.body2,
                color: COLORS.black,
                padding: SIZES.padding,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
          <View>
            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="none"
              onRequestClose={handleCloseModal}>
              <Animated.View style={[embeddedStyles.modalView, slideInFromRight]}>
                <TermsAndCondition onPress={() => handleCloseModal()} />
              </Animated.View>
            </Modal>
          </View>
        </View>
      );
    };

    return (
      <View
        style={{ width: '100%', flexGrow: 1, padding: SIZES.padding }}
      >
        <FlatList
          data={CustomerMyAccount}
          vertical
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingVertical: SIZES.padding * 2,
            // width: '100%',
          }}
        />
      </View>
    );
  }
  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('SignIn', {})
    }

  }, [])

  console.log(user, 'USERR')


  return (
    <SafeAreaView style={embeddedStyles.container}>
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
    width: '100%',
    backgroundColor: COLORS.white2,
    height: '100%',
    flexGrow: 1,
    // padding: 20,
  },
  modalView: {
    flexGrow: 1,
    // marginTop: '30%',
    marginLeft: 100,
    // marginBottom: '50%',
    backgroundColor: COLORS.white,
    // opacity: 0.8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 0.5,
    borderRightWidth: 0,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // transform:'translateX(-500px)',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
