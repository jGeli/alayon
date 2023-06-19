import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import { COLORS, FONTS, SIZES, icons, images } from '../../constants';
import LineDivider from '../LineDivider';
import TextButton from '../TextButton';
import LabeledText from '../LabeledText';
import FlagBadge from '../FlagBadge';
import { userData2 } from '../../globals/data';

const OrderDetailsCard = ({ containerStyle, imageStyle, item, onPress, navigation }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                borderRadius: SIZES.base,
                borderColor: COLORS.lightGray3,
                backgroundColor: COLORS.white,
                borderWidth: 2,
                shadowRadius: 100,
                shadowColor: COLORS.black,
                ...containerStyle,
                padding: SIZES.padding
            }}
        >
            {/* Image */}

            {/* Info */}
            <View
                style={{
                    flexGrow: 1
                }}
            >
                {/* Header Tags and Icons */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 30,
                        marginBottom: SIZES.radius,
                    }}
                >

                    <View
                        style={{

                        }}
                    >
                        <FlagBadge
                            textValue={String(item.serviceTimeType).toUpperCase()}
                            textStyle={{
                                color: item.serviceTimeType == "express" ? COLORS.white : COLORS.darkGray
                            }}
                            bgColor={item.serviceTimeType == "express" ? COLORS.primary : COLORS.lightGray2}
                        />

                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            height: 30
                        }}
                    >
                        <TouchableOpacity
                            style={{ marginLeft: 5, marginRight: 5 }}
                        >
                            {/* <MCIcon name="truck-delivery-outline" size={30} color={COLORS.darkGray}  /> */}
                            <Image
                                source={icons.cart}
                                resizeMode='contain'
                                style={{
                                    height: 25,
                                    width: 25
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginLeft: 5, marginRight: 5 }}
                        >
                            <Image
                                source={icons.myLocation}
                                resizeMode='contain'
                                style={{
                                    height: 25,
                                    width: 25
                                }}
                            />
                            {/* <SLIcon name="location-pin" size={25} color={COLORS.darkGray}  /> */}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <LineDivider/> */}

                {/* Order Details */}
                <View
                    style={{
                        // flex: 1,
                        flexDirection: 'row',
                    }}
                >
                    <View
                        style={{
                            flexGrow: 1,
                            justifyContent: 'flex-start'
                        }}
                    >
                        <LabeledText
                            label="Customer Name"
                            textValue={item.customerName}

                        />
                        <LabeledText
                            label="Order ID"
                            textValue={item.orderId}
                        />
                        <LabeledText
                            label="Delivery By"
                            textValue={item.deliveryBy}
                        />
                        <LabeledText
                            label="Total Amount"
                            textValue={item.TotalAmmount}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'space-evenly'
                        }}
                    >
                        <LabeledText
                            label="Date Booked"
                            textValue={item.bookedAt}
                        // textValue={"Sun, 21 May 2023"}

                        />
                        <LabeledText
                            label="Service Duration"
                            textValue={item.serviceDuration}
                        // textValue={"24 hours."}
                        />

                    </View>
                </View>

                {/* Text Buttons */}
                <View
                    style={{
                        flexDirection: 'row',
                        // alignItems: 'center',
                        justifyContent: 'space-between',
                        // justifyContent: 'space-between',
                        marginTop: SIZES.radius,
                        marginBottom: SIZES.base
                    }}
                >
                    <TextButton
                        label="Order Details"
                        buttonContainerStyle={{
                            width: 160,
                            padding: SIZES.base,
                            backgroundColor: null,
                            borderColor: COLORS.primary,
                            borderWidth: 1,
                            borderRadius: SIZES.padding,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: SIZES.base
                        }}
                        labelStyle={{
                            color: COLORS.primary,
                        }}
                        // onPress={() => navigation.navigate("OrderDetails")}
                        onPress={() => navigation.navigate("MerchantOrderDetails", {item})}
                        // onPress={() => console.log(item)}
                    />
                    <TextButton
                        label="Receive Order"
                        buttonContainerStyle={{
                            width: 150,
                            padding: SIZES.base,
                            backgroundColor: null,
                            borderColor: COLORS.primary,
                            borderWidth: 1,
                            borderRadius: SIZES.padding,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: SIZES.base
                        }}
                        labelStyle={{
                            color: COLORS.primary,
                        }}
                        onPress={() => navigation.navigate("VerifyOrder", {item})}
                    />

                </View>
            </View>
        </View>
    )
}

export default OrderDetailsCard;
