import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
  StyleSheet,
  Animated,
} from 'react-native';
import { COLORS, FONTS, SIZES, icons, styles } from '../../constants';
import UploadProfileImage from '../../components/UploadProfileImage';
import UploadImage from '../../components/UploadImage'
import { workingHours } from '../../globals/data';
import DatePicker from 'react-native-date-picker';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import { cutString } from '../../utils/helpers';
import { createShopProfile } from '../../redux/actions/merchant.actions';

import { getData, storeData } from '../../redux/auth-header';
import TermsAndCondition from '../../components/Modals/TermsAndCondition/TermsAndCondition';
import LineDivider from '../../components/LineDivider';

export default function RiderProfile({ navigation }) {
  const dispatch = useDispatch();
  const { location } = useSelector(state => state.data);
  const { user } = useSelector(user => user);
  const [values, setValues] = useState({
    business_hours: workingHours,
    opening: null,
    closing: null,
    location: {},
  });

  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(0))[0];

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


  const handleSubmit = async () => {
    // console.log(await getData('token'));
    values.token = await getData('token');
    dispatch(createShopProfile(values, navigation));
  };

  const handleChanges = prop => e => {
    setValues({ ...values, [prop]: e });
  };


  useEffect(() => {
    setValues({ ...values, location });
  }, [location]);


  return (
    <SafeAreaView
      style={{ ...styles.container}}

    >
      <ScrollView
        style={{
          padding: SIZES.padding,
          flex: 1,
        }}
      >
        {/* Title */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ ...FONTS.h2, fontWeight: 'bold', color: COLORS.black }}>
            MY ACCOUNT
          </Text>
        </View>


        <View style={styles.uploadContainer}>
          <UploadProfileImage />
        </View>


        <View style={{ paddingTop: SIZES.padding, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: SIZES.padding * 8 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.black }}>
            First Name
          </Text><Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.black }}>
            Last Name
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextInput
            placeholder="Enter First Name"
            placeholderTextColor={'gray'}
            style={{
              fontSize: 18,
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              width: '45%',
              color: COLORS.darkGray,
            }}
          />

          <TextInput
            placeholder="Enter First Name"
            placeholderTextColor={'gray'}
            style={{
              fontSize: 18,
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              width: '45%',
              color: COLORS.darkGray,
            }}
          />
        </View>
        {/* Laundry Mobile Number */}
        <View style={{ paddingTop: SIZES.padding }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.black }}>
            Email Address
          </Text>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            placeholder="Enter Email Name"
            placeholderTextColor={'gray'}
            style={{
              fontSize: 18,
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              width: '100%',
              color: COLORS.darkGray,
            }}
          />
        </View>
        <View style={{ paddingTop: SIZES.padding }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.black }}>
            Mobile Number
          </Text>
          <View style={styles.SectionStyle}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: COLORS.darkGray,
              }}>
              +63 |{' '}
            </Text>
            <TextInput
              style={{
                fontSize: 18,
                flexGrow: 1,
                color: COLORS.darkGray,
              }}
              value={values.mobile}
              onChangeText={handleChanges('mobile')}
              maxLength={10}
              keyboardType="phone-pad"
              placeholder="Enter Mobile Number"
              placeholderTextColor={'gray'}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>


      </ScrollView>
      <View
        style={{
          // flex: 1,
          // justifyContent: 'flex-end',
          // borderWidth: 1,
          alignItems: 'center',
          paddingTop: SIZES.padding,
          // paddingBottom: SIZES.padding,
        }}>
        <TouchableOpacity
          style={styles.button}
          // onPress={() => handleSubmit()}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            // marginTop: SIZES.padding * 2,
            marginBottom: SIZES.padding * 2,
          }}>
          <Image source={icons.tnc} style={{ height: 30, width: 30 }} />
          <Text style={{ ...FONTS.body5, marginLeft: SIZES.padding }}>
            By Continuing, You agree to our
          </Text>
          <Pressable
            // onPress={() => console.log('first')}
            onPress={() => handleOpenModal()}>
            <Text
              style={{
                ...FONTS.body5,
                color: COLORS.black,
                fontWeight: 'bold',
                marginLeft: SIZES.padding,
                borderBottomColor: COLORS.black,
                borderBottomWidth: 1,
              }}>
              Terms and Conditions.
            </Text>
          </Pressable>
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
    </SafeAreaView>
  );
}

const embeddedStyles = StyleSheet.create({
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
})