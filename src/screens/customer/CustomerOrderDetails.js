import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, Button, ScrollView } from 'react-native'
import { icons, images, SIZES, COLORS, FONTS, constants } from '../../constants'
import { userData, userData2, myAccount, userData3, userData4 } from '../../globals/data'
import clothAndPricing from '../../constants/constants';




export default function CustomerOrderDetails({ navigation }) {
    console.log(clothAndPricing)

    const [orderData, setOrderData] = useState({});

    const handleGetOrder = async () => {
        let myOrder = await dispatch(getOrderById(order._id));
        if (myOrder) {
            let newOpen = [];
            myOrder.orders.forEach(a => {
                newOpen.push(String(a.service._id));
            })
            setServiceOpen(newOpen)
            setOrderData(myOrder)
        }
    }

    function renderHeader() {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingRight: SIZES.padding * 1
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                        >
                            <Image source={icons.back} style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            alignItems: "flex-start",
                            justifyContent: 'center',
                            flexDirection: 'row',
                            width: '80%'
                        }}
                    >
                        <Text style={{ ...FONTS.h3, color: COLORS.black, fontWeight: 'bold', }}>Order Details</Text>
                    </View>
                </TouchableOpacity>
            </View>

        )
    }
    function renderLaundryShop() {

    }

    function renderClothes() {
        const renderItem = ({ item }) => {
            return (
                <View style={{ marginLeft: SIZES.padding * 2, marginRight: SIZES.padding * 2, justifyContent: 'center', marginVertical: SIZES.padding * 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            // borderWidth: 1
                        }}
                    >
                        <Text style={{
                            fontSize: SIZES.font * 1,
                            fontWeight: '600',
                            color: COLORS.black
                        }}>{item.qty + ' x ' + item.itemName}
                        </Text>
                        <Text style={{
                            fontSize: SIZES.font * 1,
                            fontWeight: '600',
                            color: COLORS.black
                        }}>{item.rate}
                        </Text>
                        <Text
                            style={{
                                fontSize: SIZES.font * 1,
                                fontWeight: '600',
                                color: COLORS.black
                            }}>{item.price}
                        </Text>
                    </View>
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    data={constants.clothAndPricing1}
                    vertical
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingVertical: SIZES.padding * 1
                    }}
                />
            </View>
        )

    }

    function renderDeliveryDate() {

    }
    function renderDeliveryTimeslot() {

    }

    useEffect(() => {
        handleGetOrder()
    }, [])


    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                {renderHeader()}

                {/* PICKUP DATE */}
                {renderLaundryShop()}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', margin: SIZES.padding, marginVertical: SIZES.padding * 1, borderWidth: 1.5, borderRadius: SIZES.padding, padding: SIZES.padding, borderColor: COLORS.lightGray3 }}>
                    <Image
                        source={userData4.imageUrl}
                        resizeMode="contain"
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 200,
                            borderWidth: 10

                        }}
                    />
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: SIZES.padding }}>
                        <Text style={{
                            fontSize: SIZES.base * 2,
                            fontWeight: 'bold',
                            color: COLORS.primary
                        }}
                        >
                            {userData4.nameOfShop
                            }
                        </Text>
                        <Text style={{
                            fontSize: SIZES.base * 2,
                            fontWeight: '600',
                            color: COLORS.gray
                        }}
                        >
                            {userData4.address
                            }
                        </Text>

                    </View>
                    <View style={styles.rateBadge}>
                        <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>
                            2.5
                        </Text>
                    </View>
                </View>
                <View style={{ marginLeft: SIZES.padding * 2, marginVertical: SIZES.padding * 1 }}>
                    <Text style={{ ...FONTS.body3, color: COLORS.black, fontWeight: 'bold' }}>Saved Address</Text>
                    <Text style={{
                        fontSize: SIZES.base * 2,
                        fontWeight: '600',
                        color: COLORS.gray
                    }}
                    >
                        {userData4.address
                        }
                    </Text>

                </View>
                <View style={{ ...styles.SectionStyle, alignItems: 'center' }}>
                    <Image
                        source={icons.minus}
                        style={{ flexDirection: 'row', height: 25, width: 25 }} />
                    <Text style={{ ...FONTS.body3, color: COLORS.black, fontWeight: 'bold' }}>Selected Services</Text>
                    <View style={{ flexDirection: 'row', marginLeft: SIZES.radius }}>
                        <Image
                            source={icons.edit} //Change your icon image here
                            style={styles.ImageStyle}
                        />
                    </View>
                    <Image
                        source={icons.dele} //Change your icon image here
                        style={styles.ImageStyle}
                    />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: SIZES.padding * 1 }}>
                    <Text style={{ ...FONTS.body3, color: COLORS.black, marginLeft: SIZES.padding * 2, fontWeight: 'bold' }}>No. of Clothes</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.black, marginLeft: SIZES.padding * 2, fontWeight: 'bold' }}>Rate Per Cloth</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.black, marginLeft: SIZES.padding * 2, fontWeight: 'bold' }}>Total Price</Text>
                </View>


                {/* No. of Clothes */}
                {renderClothes()}

                {/* DELIVERY DATE */}
                {renderDeliveryDate()}
                <View style={{ ...styles.SectionStyle, marginLeft: SIZES.padding * 2, justifyContent: 'space-between' }}>
                </View>
                <Text style={{ ...FONTS.body3, fontWeight: 'bold', color: COLORS.black, marginLeft: SIZES.padding * 2 }}>
                    Laundry Services                                                   P80.00
                </Text>

                <View style={{ flexDirection: 'row', marginLeft: SIZES.padding * 2 }}>
                    <Text style={{ ...FONTS.body3, fontWeight: 'bold', color: COLORS.black }}>
                        Delivery Services                                                   P60.00
                    </Text>
                </View>
                <View style={{ ...styles.SectionStyle, marginLeft: SIZES.padding * 2 }}>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: SIZES.padding * 2 }}>
                    <Text style={{ ...FONTS.h4, fontWeight: 'bold', color: COLORS.primary }}>
                        Total Payable Amount                            P889.00
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContents: 'space-between' }}>
                    <View style={{ marginLeft: SIZES.padding * 2, marginVertical: SIZES.padding * 1 }}>
                        <Text style={{ ...FONTS.body3, color: COLORS.black, fontWeight: 'bold' }}>Pickup Date</Text>
                        <Text style={{
                            fontSize: SIZES.base * 2,
                            fontWeight: '600',
                            color: COLORS.gray
                        }}
                        > 16 April 2023
                            11:20 PM
                        </Text></View>
                    <View style={{ marginLeft: SIZES.padding * 2, marginVertical: SIZES.padding * 1 }}>
                        <Text style={{ ...FONTS.body3, color: COLORS.black, fontWeight: 'bold' }}>Delivery Date</Text>
                        <Text style={{
                            fontSize: SIZES.base * 2,
                            fontWeight: '600',
                            color: COLORS.gray
                        }}
                        > 23 April 2023
                            9:20 AM
                        </Text></View>
                </View>
                {renderDeliveryTimeslot()}
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: SIZES.padding * 1 }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.buttonText}>BACK</Text>
                    </TouchableOpacity>
                </View>


            </SafeAreaView>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: COLORS.lightGray4


    },
    headerContainer: {
        flexDirection: 'row',
        // margin: SIZES.radius,
    },
    SectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        padding: 5,
        // margin: SIZES.radius,



    },
    workContainer: {
        paddingTop: SIZES.padding * 1,
        paddingBottom: SIZES.padding * 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    ImageStyle: {
        padding: 5,
        margin: 5,
        height: 25,
        width: 25,
        flexDirection: 'row',
        left: 140
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: SIZES.padding,
        height: 40,
        width: 200,
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        ...FONTS.h4,
        color: COLORS.white,
        fontWeight: 'bold',
    },
    rateBadge: {
        top: 10,
        right: 10,
        height: 20,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: '#317A49',
        borderRadius: 5,
    }
})