import {
  View,
  Text,
  Button,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  icons,
  images,
  styles,
} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {SET_MERCHANT_PROFILE} from '../../redux/actions/type';
import {getCloths} from '../../redux/actions/data.actions';

export default function AddClothTypeModal({
  onClose,
  active,
  onSubmit,
  services,
  activeService,
}) {
  const {cloths} = useSelector(({data}) => data);
  const dispatch = useDispatch();
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  const [selectedServiceType, setSelectedServiceType] = useState([
    activeService,
  ]);
  const [myList, setMyList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [rr, setRr] = useState(0);

  const handleAddCloth = (id, type) => {
    let newSelected = [];
    newSelected = selected;

    if (type === 'add') {
      newSelected.push(id);
    }

    if (type === 'less') {
      newSelected = newSelected.filter(a => a !== id);
    }

    setSelected(newSelected);
    setRr(Math.random());
  };

  const handleSave = () => {
    let newServices = [];
    let newCloths = [];
    console.log('CLOTHS');
    console.log(selected);
    console.log(selectedServiceType);
    // selected.forEach(a => {
    //   let clth = myList.find(ab => ab.   === a);
    //   if (clth) {
    //     newCloths.push({...clth, cloth: a});
    //   }
    // });

    // services.forEach(a => {
    //   let served = selectedServiceType.find(ab => ab === a.service);

    //   if (served) {
    //     a.cloths = newCloths;
    //     newServices.push(a);
    //   } else {
    //     newServices.push(a);
    //   }
    // });

    onSubmit({services: selectedServiceType, cloths: selected});
    onClose();
    // dispatch({type: SET_MERCHANT_PROFILE, payload: {services: newServices}});
  };

  const handleSelect = async e => {
    let isSelected = selectedServiceType.find(a => a === e);
    let newSelected = [];
    if (isSelected) {
      newSelected = selectedServiceType.filter(a => a !== e);
    } else {
      newSelected = selectedServiceType;
      newSelected.push(e);
    }

    setSelectedServiceType(newSelected);
    setRr(Math.random());
  };

  useEffect(() => {
    if (!active) {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [active]);

  useEffect(() => {
    setMyList(cloths);
    let selectedCloth = selected;
    selectedServiceType.forEach(a => {
      let service = services.find(ab => ab.service === a);
      if (service && service.cloths && service.cloths.length !== 0) {
        service.cloths.forEach(ab => {
          let ind = selectedCloth.find(abc => abc === ab.cloth);
          if (!ind) {
            selectedCloth.push(ab.cloth);
            setSelected(selectedCloth);
          }
        });
      }
    });
  }, [selectedServiceType]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - SIZES.height * 0.9],
  });

  function renderServicesTab() {
    return (
      <FlatList
        horizontal
        contentContainerStyle={{
          // justifyContent: 'center',
          // paddingTop: 20,
          marginBottom: 10,
          padding: SIZES.padding,
        }}
        data={services}
        keyExtractor={item => `${item.service}`}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          let isSelected = selectedServiceType.find(a => a === item.service);
          return (
            <TouchableOpacity
              style={{
                marginLeft: SIZES.padding,
                marginRight: index == services.length - 1 ? SIZES.padding : 0,
                backgroundColor: isSelected
                  ? COLORS.primary
                  : COLORS.lightGray3,
                borderRadius: SIZES.radius,
                paddingLeft: SIZES.radius,
                paddingRight: SIZES.radius,
                height: 40,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                handleSelect(item.service);
              }}>
              <Text
                style={{
                  // ...FONTS.h3,
                  fontSize: SIZES.h4,
                  fontWeight: '500',
                  color: isSelected ? COLORS.white : COLORS.black,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  function renderClothType() {
    let service = services.find(a => a.service === activeService);

    console.log(service);
    const renderItem = ({item, index}) => {
      let isSelected = selected.find(a => a == item._id);

      // let orderItems = orderDetails?.orderItems?.filter(a => a.serviceId == item.id);
      return (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingVertical: SIZES.padding,
              borderBottomColor: COLORS.black,
              borderBottomWidth: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginRight: SIZES.padding,
                marginLeft: SIZES.padding,
              }}>
              {isSelected ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.lightGray2,
                    padding: SIZES.base / 2,
                    borderRadius: SIZES.radius,
                    margin: SIZES.base / 2,
                    borderWidth: 1,
                    borderColor: COLORS.lightGray3,
                  }}
                  onPress={() => handleAddCloth(item._id, 'less')}>
                  <Image
                    source={icons.minus_dash}
                    resizeMode="contain"
                    style={{
                      height: 10,
                      width: 10,
                      // tintColor: COLORS.white
                      tintColor: COLORS.danger,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleAddCloth(item._id, 'add')}
                  style={{
                    backgroundColor: COLORS.primary,
                    padding: SIZES.base / 2,
                    borderRadius: 999,
                    margin: SIZES.base / 2,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={icons.add}
                    resizeMode="contain"
                    style={{
                      height: 10,
                      width: 10,
                      tintColor: COLORS.white,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
            <Text
              style={{
                color: COLORS.black,
                fontSize: SIZES.base * 2,
                fontWeight: '700',
              }}>
              {item.name}
            </Text>
          </View>
        </View>
      );
    };

    return (
      <FlatList
        data={myList}
        keyExtractor={(item, index) => `${index}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingTop: SIZES.padding,
          paddingBottom: 150,
          marginTop: 10,
          // flex: 1,
          // flexBasis: '100%'
        }}
      />
    );
  }

  return (
    <SafeAreaView
      // style={{
      //   // height: SIZES.height,
      //   paddingBottom: SIZES.radius
      // }}
      style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={active}>
        <View style={{flex: 1, backgroundColor: COLORS.transparentBlack7}}>
          <TouchableWithoutFeedback onPress={() => onClose()}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          </TouchableWithoutFeedback>
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              top: modalY,
              width: '100%',
              height: '100%',
              padding: SIZES.padding,
              borderTopRightRadius: SIZES.padding,
              borderTopLeftRadius: SIZES.padding,
              backgroundColor: COLORS.white,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  ...FONTS.h3,
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                Add Cloth Type
              </Text>
              <TouchableOpacity onPress={() => onClose()}>
                <Image
                  source={icons.cross}
                  resizeMode="contain"
                  style={{
                    height: 25,
                    width: 25,
                  }}
                />
              </TouchableOpacity>
            </View>

            {/* {renderClothType()} */}
            {renderServicesTab()}

            {renderClothType()}
            <View
              style={{
                position: 'absolute',
                height: 70,
                bottom: 80,
                left: 0,
                right: 0,
                padding: 5,
                backgroundColor: COLORS.white,
                // flexGrow: 1,
                margin: -10,
                width: '110%',

                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  borderRadius: SIZES.radius,
                  width: '50%',
                }}
                onPress={() => handleSave()}>
                <Text
                  style={{
                    textAlign: 'center',
                    padding: SIZES.padding,
                    fontSize: SIZES.base * 2,
                    fontWeight: '700',
                    color: COLORS.white,
                  }}>
                  SAVE
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
