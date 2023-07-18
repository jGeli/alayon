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
import { COLORS, SIZES, FONTS, images, styles } from '../../constants';
import { customerMyAccount, myAccount } from '../../globals/data';
import UploadProfileImage from '../../components/UploadProfileImage';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/auth.actions';
import { clearData } from '../../utils/AsyncStorage';
import LabeledText from '../../components/LabeledText';
import TermsAndCondition from '../../components/Modals/TermsAndCondition/TermsAndCondition';





export default function MyAccount({ navigation }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(({ auth }) => auth);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(0))[0];
  // const [values, setValues] = useState({});


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


  // useEffect(() => {
    
  //   let { email, firstName, lastName, mobile, imgUrl } = user;
  //   console.log('SET USER')
  //   if(user._id){
  //     setValues({ email, firstName, lastName, mobile, imgUrl });
  //   }
  //   return () => {
  //   console.log('CLEAR USER')
  //       setValues({})
  //   }
  // }, [user]);

  console.log(user, 'USER')

  const handleLogout = () => {
    dispatch(logoutUser(navigation));
    
  };

  
  function renderHeader() {




    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          // borderWidth: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding2 * 2,
          paddingTop: SIZES.padding2 * 2,
          left: 0,
          right: 0,
          bottom: 0,
          top: 0
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: COLORS.lightGray3,
            borderRadius: SIZES.radius,
            marginRight: SIZES.padding,
          }}
        >
          <Image
            source={{ uri: user.imgUrl }}
            resizeMode='contain'  
            style={{
              height: 120,
              width: 120,
              borderRadius: 999
            }}
          />
        </View>
        <LabeledText
          label={user.firstName + ' ' + user.lastName}
          labelStyle={{
            color: COLORS.primary,
            fontSize: SIZES.base * 3,
          }}
          textValue={(user.email)}
          textStyle={{
            color: COLORS.black,
          }}
        />


      </View>

    );
  }

  function renderList() {
    const renderItem = ({ item }) => {
      return (
        <View>


          <TouchableOpacity
            style={{
              justifyContent: 'center',
              borderColor: COLORS.black,
              borderBottomWidth: .5,
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
                fontSize: SIZES.base * 2,
                fontWeight: '600',
                // color: COLORS.black,
                // marginLeft: 50,
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
          data={customerMyAccount}
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
