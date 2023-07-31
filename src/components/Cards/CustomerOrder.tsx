import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import { COLORS, FONTS, SIZES, icons, images } from '../../constants';
import TextButton from '../TextButton';
import { userData4 } from '../../globals/data';
import TextIconButton from '../TextIconButton';





const CustomerOrders = ({ navigation, order }) => {
    let { orders, shop } = order;



    // navigation.navigate('OrderSummary', { selectedBaskets: orders });

    console.log(order.shop?.shop_name, 'SHOP NI')
    Object.keys(order).forEach(a => {
        console.log(a)
    })
    return (
        <View
            style={{
                flexDirection: 'row',
                borderRadius: SIZES.base,
                borderColor: COLORS.black,
                backgroundColor: COLORS.lightGray4,
                width: '100%',
                // height: '75%',
                borderWidth: .5,
                shadowRadius: 50,
                shadowColor: COLORS.black,
                padding: SIZES.padding,
                marginBottom: SIZES.padding * 3
            }}
        >

            {/* Image */}


            {/* Info */}
            <View
                style={{
                    // flexGrow: 1
                }}
            >
                {/* Order Details */}
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        // width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{
                        fontSize: SIZES.base * 2,
                        fontWeight: 'bold',
                        borderBottomColor: COLORS.primary,

                        color: COLORS.primary,

                    }}

                    >ORDER ID:
                    </Text>
                    <Text style={{
                        fontSize: SIZES.base * 2,
                        // fontWeight: 'bold',
                        borderBottomColor: COLORS.primary,

                        color: COLORS.primary,

                    }}

                    >
                        {order.transaction_id}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: SIZES.padding * 2,
                        alignItems: 'center',
                        height: 100,
                        marginBottom: SIZES.radius,
                    }}
                >
                    <Image
                        source={{uri: order?.shop?.bannerUrl}}
                        resizeMode="contain"
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 50,
                            marginRight: 5,
                            flexDirection: 'row'

                        }}
                    />
                    <View
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            height: 30
                        }}
                    >
                        <Text style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: SIZES.base * 2,
                            fontWeight: 'bold',
                            color: COLORS.primary
                        }}
                        >
                            {order.shop?.shop_name}
                        </Text>
                        <Text style={{
                            fontSize: SIZES.base * 2,
                            fontWeight: '600',
                            color: COLORS.gray
                        }}
                        >
                            {order.shop?.location?.address}
                        </Text>

                    </View>
                    <TouchableOpacity
                        style={{ marginLeft: 5, marginRight: 5 }}
                        // onPress={() => navigation.navigate('Map1', { order})}
                    >
                        <Image
                            source={icons.myLocation}
                            resizeMode='contain'
                            style={{

                                height: 40,
                                width: 40
                            }}
                        />
                        {/* <SLIcon name="location-pin" size={25} color={COLORS.darkGray}  /> */}
                    </TouchableOpacity>
                </View>



            {/* Text Buttons */}
            <View
                style={{
                    // marginVertical: SIZES.padding * 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // marginTop: SIZES.radius,
                    padding: SIZES.padding,


                }}
            >
           
   
   <TextIconButton
                    label="Track"
                    icon={icons.location}
                    iconStyle={{
                        height: 20,
                        width: 20,
                        tintColor: COLORS.primary,
                        marginRight: SIZES.padding ,
                    }}
                    iconPosition="LEFT"
                    onPress={() => 
                        navigation.navigate('OrderStatus', { order, navType: 'track' })
                    }
                    containerStyle={{
                        width: 150,
                        padding: SIZES.padding * 1,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingRight: SIZES.padding,
                        paddingLeft: SIZES.padding,
                        backgroundColor: COLORS.lightGray3,
                        borderColor: COLORS.primary,
                        borderWidth: 1
                    }}
                    labelStyle={{
                        ...FONTS.h4,
                        
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: COLORS.primary,

                    }}
                />

                <TextIconButton
                    label="Details"
                    icon={icons.basket}
                    iconStyle={{
                        height: 20,
                        width: 20,
                        tintColor: COLORS.white,
                        marginRight: SIZES.padding
                    }}
                    iconPosition="LEFT"
                    onPress={() => navigation.navigate('OrderSummary', { selectedBaskets: orders })}
                    containerStyle={{
                        width: 150,
                        padding: SIZES.padding * 1,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingRight: SIZES.padding * 2,
                        paddingLeft: SIZES.padding * 2,
                        backgroundColor: COLORS.primary
                    }}
                    labelStyle={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: COLORS.white,

                    }}
                />
            </View>
        </View>
        </View >
    )
}

export default CustomerOrders;

