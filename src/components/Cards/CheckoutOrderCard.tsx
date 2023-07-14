//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES, icons, constants } from '../../constants';
import { TextInput } from 'react-native';
import { useSelector } from 'react-redux';

// create a component
const CheckoutOrderCard = ({ navigation, shopData, param }) => {
    const { errors } = useSelector(({ ui }) => ui);
    const [shop, setShop] = useState({})
    const [listItems, setListItems] = useState([])

    let totalOrder = 0;




    function renderAddOns(order) {
        let { totalAddons, pricing, qty, service, addons, shop } = order;

        return (
            <TouchableOpacity
            // onPress={() => navigation.navigate('AddOnsScreen', { order })}
            >
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'column',
                        borderTopColor: COLORS.blue,
                        borderBottomColor: COLORS.blue,
                        borderBottomWidth: 1,
                        borderTopWidth: .5,
                        backgroundColor: 'rgba(240,248,255, 0.6)',

                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            flex: 1,
                            padding: 5,
                            paddingLeft: SIZES.padding,
                            paddingRight: SIZES.padding,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Text style={{ ...FONTS.body3, color: COLORS.secondary }}>Add-ons</Text>
                        <Text style={{ ...FONTS.body3, color: COLORS.black, fontWeight: '600' }}>₱ {totalAddons}</Text>

                    </View>
                    <View
                        style={{
                            // width: '100%',
                            marginLeft: SIZES.padding,
                            marginRight: SIZES.padding,
                            borderBottomColor: COLORS.darkGray,
                            borderBottomWidth: .5,
                            paddingLeft: SIZES.padding,
                            paddingRight: SIZES.padding,
                            height: 1
                        }}
                    >

                    </View>
                    <View
                        style={{
                            width: '100%',
                            flex: 1,
                            padding: 5,
                            paddingLeft: SIZES.padding,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        {addons.length !== 0 ?
                            <>
                                <Text
                                    style={{
                                        color: COLORS.black,
                                        // marginLeft: SIZES.padding,
                                    }}>
                                    {addons.map((a, index) => {
                                        return `${a.name} (${a.qty})${index !== addons.length - 1 ? ', ' : ''
                                            }`;
                                    })}
                                </Text>
                                {/* <Image
                                    source={icons.arrow_right}
                                    style={{ height: 25, width: 25, tintColor: COLORS.darkGray }}
                                /> */}
                            </>

                            :
                            <>
                                <Text style={{ ...FONTS.body3, color: COLORS.redTransparent }}>No Add-ons Selected</Text>
                                <Image
                                    source={icons.arrow_right}
                                    style={{ height: 25, width: 25, tintColor: COLORS.darkGray }}
                                />
                            </>

                        }

                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    function renderServiceItems(order) {
        let { pricing, qty, service, shop, addons, cloths} = order;

        let totalService = 0;
        let totalAddons = 0;


        const orderService = shop.services.find(a => a.service === service);
        let price = 0
        if (orderService) {
            let service = shop.services.find(a => a.service === order.service);

            if (pricing === 'Kilo') {
                price = (service.priceKilo
                    ? service.priceKilo
                    : service.cloths[0].priceKilo)
                totalService += price * order.qty;

            }
            if (pricing === 'Batch') {
                price = (service.priceBatch
                    ? service.priceBatch
                    : service.cloths[0].priceBatch)
                totalService +=
                    (service.priceBatch
                        ? service.priceBatch
                        : service.cloths[0].priceBatch) * order.qty;
            }

            if (pricing === 'Piece') {
                cloths.map((a, index) => {
                    price = a.pricePiece;
                    totalService += a.pricePiece * a.qty;
                });
            }

            addons.map((a, index) => {
                totalAddons += a.price * a.qty;
            });

            totalOrder += totalService + totalAddons;

        }
        
        console.log("ADDONS SHOP", shop.addons)

        return (
            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderTopColor: COLORS.gray2,
                    borderTopWidth: 1,
                    width: '100%',
                    // marginTop: 3,
                    elevation: 1,
                    backgroundColor: COLORS.white
                    // height: '100%'
                }
                }
            >
            
                <View
                    style={{ padding: SIZES.padding, backgroundColor: COLORS.white }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ ...FONTS.body3, color: COLORS.black }}>{orderService.name}</Text>
                    </View>

                    <Text style={{ ...FONTS.body4 }}>{pricing}</Text>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
                    >
                        <View
                            style={{
                                flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                            }}
                        >
                            <Text style={{ ...FONTS.body4, color: COLORS.black, marginRight: SIZES.padding }}>₱{price}</Text>
                            <Text style={{ ...FONTS.body4, color: COLORS.black, marginRight: SIZES.padding }}>x</Text>
                            <Text style={{ ...FONTS.body4, color: COLORS.black, marginRight: SIZES.padding }}>{qty}</Text>

                        </View>
                        <Text style={{ ...FONTS.body3, color: COLORS.black, fontWeight: '600' }}>₱ {totalService}</Text>

                    </View>
                </View>
                {shop.addons.length !== 0 && renderAddOns({ totalAddons, ...order })}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: COLORS.white,
                        padding: 5,
                        paddingLeft: SIZES.padding,
                        paddingRight: SIZES.padding,
                        borderBottomColor: COLORS.darkGray,
                        borderBottomWidth: .5

                    }}
                >
                    <Text style={{ ...FONTS.body3, color: COLORS.darkGraygray }}>Message</Text>
                    <TextInput

                        placeholder='Please leave a message...'
                        style={{
                            padding: 0,
                            margin: 0,
                            flexGrow: 1,
                            // width: '100%',
                            textAlign: 'right',
                            color: COLORS.gray
                        }}

                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: 5, backgroundColor: COLORS.white,
                        paddingLeft: SIZES.padding,
                        paddingRight: SIZES.padding,
                        borderBottomColor: COLORS.darkGray,
                        borderBottomWidth: 1
                    }}
                >
                    <Text style={{ ...FONTS.body3, color: COLORS.darkGray, fontWeight: '600' }}>Sub-Total</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.black }}>₱ {totalService + totalAddons}</Text>

                </View>


            </View >
        )


    }


    function handleDeliveryType() {
        const { deliveryOption } = shopData;
        const { deliveryOptions } = constants;
        let deliveryOpt = deliveryOption ? deliveryOptions.find(a => a.id === deliveryOption) : { price: 0, name: 'Select', description: 'No Delivery Option Selected' }
        totalOrder += deliveryOpt.price;
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('DeliveryOptionScreen', { order: shopData })}
                style={{
                    width: '100%',
                    flexDirection: 'column',
                    // borderTopColor: COLORS.blue,
                    borderBottomColor: COLORS.blue,
                    borderBottomWidth: 1,
                    marginTop: -1,
                    // borderTopWidth: 1,
                    backgroundColor: 'rgba(135,206,250, 0.7)',
                    // elevation: 3

                }}
            >
                <View
                    style={{
                        width: '100%',
                        flex: 1,
                        padding: 5,
                        paddingLeft: SIZES.padding,
                        paddingRight: SIZES.padding,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text style={{ ...FONTS.body3, color: COLORS.darkBlue }}>Delivery Option</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ ...FONTS.body3, color: errors.deliveryOption ? COLORS.redTransparent : COLORS.black, fontWeight: '600' }}>{deliveryOpt.name}</Text>
                        {/* <Image
                            source={icons.arrow_right}
                            style={{ height: 25, width: 25, tintColor: COLORS.darkGray }}
                        /> */}
                    </View>

                </View>
                <View
                    style={{
                        // width: '100%',
                        marginLeft: SIZES.padding,
                        marginRight: SIZES.padding,
                        borderBottomColor: COLORS.darkGray,
                        borderBottomWidth: .5,
                        paddingLeft: SIZES.padding,
                        paddingRight: SIZES.padding,
                        height: 1
                    }}
                >

                </View>
                <View
                    style={{
                        width: '100%',
                        flex: 1,
                        padding: 5,
                        paddingLeft: SIZES.padding,
                        paddingRight: SIZES.padding,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ ...FONTS.body4, color: errors.deliveryOption ? COLORS.red : COLORS.black }}>{deliveryOpt.description}</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.black }}>{deliveryOpt.price ? `₱ ${deliveryOpt.price}` : ''}</Text>


                </View>
            </TouchableOpacity>

        )
    }

    useEffect(() => {
        setShop(shopData.shop);
        setListItems(shopData.data)
    }, [shopData, errors])

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingBottom: SIZES.semiRadius,
                    borderBottomColor: COLORS.lightGray3,
                    borderBottomWidth: 1,
                    padding: SIZES.padding,
                    backgroundColor: COLORS.white3
                    // height: 50,
                    // elevation: 5
                }}
            >
                <Image
                    source={icons.laundry_store}
                    style={{ height: 25, width: 25, tintColor: COLORS.black, marginRight: SIZES.padding }}
                />
                <Text style={{ ...FONTS.body3, color: COLORS.black }}>{shop.shop_name}</Text>
            </View>

            {/* ORDER DETAILS */}
            <View
                style={{
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    // borderBottomColor: COLORS.gray,
                    // borderBottomWidth: 1,
                    backgroundColor: COLORS.lightGray
                    // hei
                    // elevation: 5
                }}
            >

                {listItems && listItems.map((a, index) => {
                    return <View
                    key={index}
                    style={{
                        flex: 1,
                        borderBottomColor: COLORS.white,
                        borderBottomWidth: 1,
                        borderTopColor: COLORS.gray2,
                        borderTopWidth: 1,
                        width: '100%',
                        // marginTop: 3,
                        elevation: 1,
                        backgroundColor: COLORS.white
                        // height: '100%'
                    }
                    }
                    >{renderServiceItems(a)}</View>
                })}
                <View style={{ marginTop: 5 }}>
                    {handleDeliveryType(shopData)}


                    <View
                        style={{
                            width: '100%',
                            padding: 5,
                            paddingLeft: SIZES.padding,
                            paddingRight: SIZES.padding,
                            flexDirection: 'row',

                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: COLORS.white3,
                            borderBottomColor: COLORS.black,
                            borderBottomWidth: 1
                        }}
                    >

                        {/* DELIVERY SERVICE OPTION */}

                        {/* ORDER TOTAL */}
                        <Text style={{ ...FONTS.body3, color: COLORS.black }}>Order Total ({listItems && listItems.length} Items)</Text>
                        <Text style={{ ...FONTS.body3, color: COLORS.black, fontWeight: 'bold' }}>₱ {totalOrder}</Text>

                    </View>
                </View>
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray3,
        elevation: 3,
        marginTop: SIZES.padding
        // marginBottom: 2
    },
});

//make this component available to the app
export default CheckoutOrderCard;
