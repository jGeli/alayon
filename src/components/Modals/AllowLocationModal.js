//import liraries
import React, { Component, useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    Modal,
    TouchableOpacity,
    Animated,
    SafeAreaView,
    PermissionsAndroid
} from 'react-native';
import { COLORS, FONTS, SIZES, icons, images, styles } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_ALLOW_LOCATION_MODAL, SET_ALLOW_LOCATION } from '../../redux/actions/type';

// create a component

const AllowLocationModal = ({ navigation }) => {
    const dispatch = useDispatch();
    const { allowLocation } = useSelector(({ ui }) => ui);

    const modalAnimatedValue = useRef(new Animated.Value(0)).current;

    const onClose = () => {
        dispatch({ type: CLOSE_ALLOW_LOCATION_MODAL })
    }

    const handleAllow = () => {
        requestLocationPermission()
    }

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

            if (granted === 'granted') {
                dispatch({ type: SET_ALLOW_LOCATION, payload: true })
                dispatch({ type: CLOSE_ALLOW_LOCATION_MODAL })
                navigation.navigate('SelectRegion', { navType: 'current' })

                console.log('You can use Geolocation');
                // return true;
            } else {
                dispatch({ type: SET_ALLOW_LOCATION, payload: false })
                dispatch({ type: CLOSE_ALLOW_LOCATION_MODAL })
                console.log('You cannot use Geolocation');
                // return false;
            }
        } catch (err) {
            return false;
        }
    };






    useEffect(() => {
        if (!allowLocation) {
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
    }, [allowLocation]);





    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={allowLocation}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.transparentBlack7,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
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
                        flex: 1,
                        position: 'absolute',
                        left: 0,
                        // top: 0,
                        height: 380,
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        // padding: SIZES.padding,
                        borderTopRightRadius: SIZES.padding,
                        borderTopLeftRadius: SIZES.padding,
                        backgroundColor: COLORS.lightBlue,
                    }}>
                    <View
                        style={{ flexGrow: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                padding: SIZES.padding,
                                marginBottom: SIZES.padding
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => onClose()}
                            >
                                <Image
                                    source={icons.cross}
                                    style={{ height: 25, width: 25, tintColor: COLORS.darkGray2 }}
                                />
                            </TouchableOpacity>
                            <Text
                                style={{ ...FONTS.h3, color: COLORS.darkGray2, marginTop: 5 }}
                            >LOCATION</Text>
                            <View
                                style={{ height: 25, width: 25 }}
                            ></View>

                        </View>

                        <Image
                            source={images.location2}
                            resizeMode='contain'
                            style={{ height: 50, width: 200 }}
                        />
                        <View
                            style={{ height: 150, padding: SIZES.padding }}
                        >
                            <Text style={{ ...FONTS.h4, color: COLORS.transparentBlack7, textAlign: 'center', padding: SIZES.padding }}>Let ALAYON access your location to find shops nearby</Text>

                        </View>
                        <Image
                            source={images.map}
                            resizeMode='stretch'
                            style={{ height: 150, width: '100%', position: 'absolute', bottom: 50, zIndex: -10 }}
                        />
                        <TouchableOpacity
                            style={[style.textButton]}
                            onPress={() => handleAllow()}
                        >
                            <Text style={{ ...FONTS.body2, color: COLORS.white, letterSpacing: 2 }}>ENABLE LOCATION</Text>
                        </TouchableOpacity>
                    </View>

                </Animated.View>
            </View>
        </Modal >
    );
};


// define your styles
const style = StyleSheet.create({
    textButton: {

        minHeight: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.semiRadius,
        width: '80%',
        elevation: 3,
        margin: SIZES.padding * 2
    }
});


//make this component available to the app
export default AllowLocationModal;
