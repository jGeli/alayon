//import liraries
import React, { Component, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Button,
} from 'react-native';
import { COLORS, FONTS, SIZES, icons, constants } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ERROR, SET_CUSTOMER_BASKET } from '../../redux/actions/type';
import { useEffect } from 'react';
import { setCustomerBasket } from '../../utils/AsyncStorage';

// create a component
const DeliveryOptionScreen = ({ navigation, route }) => {
    const { order } = route.params;
    const { basket } = useSelector(({ customer }) => customer);

    const dispatch = useDispatch()
    const [selected, setSelected] = useState(null)
    const handleBack = async () => {
        navigation.goBack()
    }

    const handleSelect = async (val) => {
        let { orders } = basket;
        let newOrders = [];
        let newVal = val;

        orders.map(a => {

            let newObj = {};
            newObj = a;
            console.log('id1', order?.shop._id)
            console.log('id2', a?.shop?._id)
            if (order?.shop?._id == a.shop?._id) {
                newVal = newObj.deliveryOption === val ? null : val
                newObj.deliveryOption = newObj.deliveryOption === val ? null : val;
                newOrders.push(newObj)
            } else {
                newOrders.push(newObj)
            }
        })


        setSelected(newVal);
        dispatch({ type: SET_CUSTOMER_BASKET, payload: { orders: newOrders } })
        dispatch({ type: CLEAR_ERROR })

    }



    useEffect(() => {
        let { deliveryOption } = order
        if (deliveryOption) {
            setSelected(deliveryOption)
        }
        return () => {
            setSelected(null);
        }
    }, [order])

    const renderHeader = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: COLORS.white,
                    elevation: 5,
                    // height: 40,
                }}>
                <TouchableOpacity
                    style={{ margin: SIZES.padding, marginRight: SIZES.padding * 2 }}
                    onPress={() => handleBack()}>
                    <Image
                        source={icons.back}
                        style={{ height: 20, width: 20, tintColor: COLORS.primary }}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        ...FONTS.body2,
                        color: COLORS.black,
                        // fontWeight: 'bold',
                    }}>
                    Delivery Options
                </Text>
            </View>
        );
    }

    function renderOption(item) {
        return <TouchableOpacity
            key={item.id}
            onPress={() => handleSelect(item.id)}
            style={{ width: '100%', backgroundColor: COLORS.white, flexDirection: 'row', borderLeftColor: item.id === selected ? COLORS.primary : COLORS.white, borderLeftWidth: 5, padding: SIZES.padding, marginTop: SIZES.padding, height: 75 }}>
            <View style={{ flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between', flexBasis: '80%', paddingLeft: SIZES.padding }}>
                <Text style={{ ...FONTS.body3, color: COLORS.black, fontWeight: '700' }}>{item.name}</Text>
                <Text style={{ ...FONTS.body4, color: COLORS.transparentBlack7 }}>{item.description}</Text>
            </View>
            <View style={{ flexDirection: 'column', flexBasis: '20%', alignItems: 'flex-end', justifyContent: 'space-around', paddingRight: SIZES.padding }}>
                <Text style={{ ...FONTS.body3, color: COLORS.black }}>₱ {item.price}</Text>
                {selected === item.id ?
                    <Image
                        source={icons.check}
                        style={{ height: 20, width: 20, tintColor: COLORS.primary }}
                    />
                    :
                    <View style={{ height: 20 }}>

                    </View>
                }
            </View>
        </TouchableOpacity>
    }

    return (
        <SafeAreaView
            style={{
                flexGrow: 1,
                flex: 1
            }}>
            {renderHeader()}
            <View
                style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: COLORS.lightGray }}
            >
                {constants.deliveryOptions.map(a => {
                    return renderOption(a)
                })}
                { }

            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
});

//make this component available to the app
export default DeliveryOptionScreen;
