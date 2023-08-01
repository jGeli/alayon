import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'
import { COLORS, FONTS, SIZES, icons, images } from '../../constants';
import StatusStep from '../StatusStep';
import moment from 'moment';





const CustomerOrders = ({ navigation, order }) => {
    let { shop } = order;
        console.log(order, 'ORDER')
    return (
        <View
            style={styles.cardContainer}
        >

        {/* HEADER */}
        <View style={styles.headerContainer}>
            <View style={{flexGrow: 1, padding: SIZES.semiRadius, flexDirection: 'row'}}>
                <Image source={{uri: shop.bannerUrl}} style={styles.profileImage}/>
                <View style={{marginLeft: SIZES.padding}}>
                    <Text style={{...FONTS.h4, color: COLORS.darkBlue}}>{shop.shop_name}</Text>
                    <Text style={{...FONTS.body4}}>{moment(order.createdAt).format('lll')}</Text>

                </View>
            </View>
            <TouchableOpacity
                // style={{padding: SIZES.semiRadius}}
                onPress={() => navigation.navigate('OrderStatus', {order, navType: 'track'})}
            >
            <Image source={icons.send} style={styles.sendIcon}/>
            </TouchableOpacity>
        </View>
        
        {/* STEPPER */}
        <View style={{ marginTop: SIZES.padding * 2, justifyContent: 'center'}}>
            <StatusStep
                currentPage={0}
                stepInput={['Out for Delivery', 'Delivered']}
            />
            </View>
        {/* BUTTON */}
        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.button}>
                <Text style={{...FONTS.body4, fontWeight: 'bold'}}>Order Details</Text>
            </TouchableOpacity>
        </View>
        
        </View >
    )
}

// define your styles
const styles = StyleSheet.create({
    cardContainer: {
      minHeight: 200,
      width: '100%',
      flexGrow: 1,
      flex: 1,
    borderRadius: SIZES.semiRadius,
    padding: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.gray,
      backgroundColor: COLORS.lightGray3,
      marginBottom: SIZES.padding * 2,
      elevation: 3
    //   alignItems: 'center'
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 50
    },
    sendIcon: {
        height: 35,
        width: 35,
    },
    btnContainer: {
        marginTop: SIZES.padding,
        height: 60,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 180,
        borderWidth: 1,
        height: 40,
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center'
    }
  });

export default CustomerOrders;

