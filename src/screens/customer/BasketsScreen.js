//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../../constants';
import { Image } from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerBaskets } from '../../redux/actions/customer.actions';

// create a component
const BasketsScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { baskets } = useSelector(({ customer }) => customer)


    const handleGetBaskets = () => {
        dispatch(getCustomerBaskets());
    }



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
                    onPress={() => navigation.goBack()}>
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
                    MY BASKET
                </Text>
                <View></View>
            </View>
        );
    }


    useEffect(() => {
        handleGetBaskets()
    }, [])

    console.log('MY BASKETS', baskets)
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flex: 1
    },
});

//make this component available to the app
export default BasketsScreen;
