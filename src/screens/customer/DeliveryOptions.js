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
import { SET_CUSTOMER_BASKET } from '../../redux/actions/type';
import { useEffect } from 'react';

// create a component
const DeliveryOptionScreen = ({ navigation, route }) => {
    const { shop, selectedOption } = route.params;
    const dispatch = useDispatch()
    const { basket } = useSelector(({ customer }) => customer);
    const [selected, setSelected] = useState(0)


    const handleSelect = (val) => {
        let { orders } = basket;
        console.log(shop)

        let newOrders = [];
        orders.map(a => {
            let newObj = {};
            newObj = a;
            if (shop._id === a.shop._id) {

                console.log('SAMMEE')
                newObj.deliveryOption = val
            }

            console.log(newObj.deliveryOption)
            newOrders.push(newObj)
        })


        console.log('SELLL')
        console.log(newOrders)
        setSelected(val)
        dispatch({ type: SET_CUSTOMER_BASKET, payload: { orders: newOrders } })
        console.log(newOrders)
        // navigation.goBack()
    }


    const handleConfirm = () => {
        dispatch({ type: SET_CUSTOMER_BASKET, payload: basket })
        navigation.navigate('OrderSummary', { basket, rnd: Math.random() })
    }

    useEffect(() => {
        setSelected(selectedOption)
    }, [selectedOption])


    function renderHeader() {
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
                    onPress={() => navigation.navigate('OrderSummary', { basket, rnd: Math.random() })
                    }>
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
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: 70 }}>
                <TouchableOpacity
                    style={{ borderRadius: SIZES.radius, backgroundColor: COLORS.primary, width: 180, height: 50, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => handleConfirm()}
                ><Text
                    style={{ ...FONTS.h4, color: COLORS.white }}
                >CONFIRM</Text></TouchableOpacity>
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
