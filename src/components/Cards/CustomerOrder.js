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





const CustomerOrders = ({ containerStyle, imageStyle, item, onPress, navigation }) => {







    return (
        <View
            style={{
                marginLeft: SIZES.padding * 1,
                flexDirection: 'row',
                borderRadius: SIZES.base,
                borderColor: COLORS.black,
                backgroundColor: COLORS.lightGray4,
                width: '100%',
                height: '75%',
                borderWidth: 1,
                shadowRadius: 50,
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
                {/* Order Details */}
                <Text style={{
                    fontSize: SIZES.base * 2,
                    fontWeight: 'bold',
                    borderBottomColor: COLORS.primary,

                    color: COLORS.primary,

                }}

                >OrderID:
                    {userData4.Id
                    }
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: SIZES.padding * 2,
                        alignItems: 'center',
                        height: '20%',
                        marginBottom: SIZES.radius,
                    }}
                >
                    <Image
                        source={userData4.imageUrl}
                        resizeMode="contain"
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 200,
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
                    <TouchableOpacity
                        style={{ marginLeft: 5, marginRight: 5 }}
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
                <View style={{ flexDirection: 'row', marginLeft: SIZES.padding * 2 }}>

                    <Image
                        source={images.status} //Change your icon image here

                        style={{
                            height: 80,
                            resizeMode: 'stretch',
                            width: '100%'
                        }} />

                </View>


                {/* Text Buttons */}
                <View
                    style={{
                        marginVertical: SIZES.padding * 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: SIZES.radius,
                        padding: SIZES.padding * 3,


                    }}
                >
                    <TextButton
                        label="Order Details"

                        buttonContainerStyle={{
                            padding: SIZES.padding * 1,
                            borderRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        labelStyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: COLORS.white,

                        }}
                        // onPress={() => onPress("OrderDetails")}
                        onPress={onPress}


                    />
                </View>
            </View>
        </View>
    )
}

export default CustomerOrders;

