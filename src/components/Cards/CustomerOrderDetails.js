import React, { useState, useEffect, useCallback } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, Button, ScrollView, RefreshControl } from 'react-native'
import { icons, images, SIZES, COLORS, FONTS, constants } from '../../constants'
import { userData, userData2, myAccount, userData3, userData4, userData5 } from '../../globals/data'
import clothAndPricing from '../../constants/constants';
import data from "../../screens/customer/data";
import { getOrderById } from "../../redux/actions/customer.actions";
import { useDispatch } from "react-redux";
import CustomerOrders from "./CustomerOrder";
import moment from 'moment';






export default function CustomerOrderDetails({ navigation, route }) {
    
    const dispatch = useDispatch();
    let { shop } = route.params.order;
    const { orderId, shopId } = route.params;
    const [serviceOpen, setServiceOpen] = useState([]);
    const [ordersData, setOrdersData] = useState({})
    const [rnd, setRnd] = useState(0);
    


    const handleGetOrder = async () => {
        let myOrders = await dispatch(getOrderById(orderId));
    console.log(myOrders.orders.length, 'deliver')

        if(myOrders){
            let newOpen = [];
            myOrders.orders.forEach(a => {
                newOpen.push(String(a.service._id));
          })
          setServiceOpen(newOpen)
          setOrdersData(myOrders)
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

    function renderShop() {
        return (
            <View style={styles.cardContainer}>
                <View style={{ flexGrow: 1, padding: SIZES.semiRadius, flexDirection: 'row' }}>
                    <Image source={{ uri: shop.bannerUrl }} style={styles.profileImage} />
                    <View style={{ marginLeft: SIZES.padding }}>
                        <Text style={{ ...FONTS.h4, color: COLORS.darkBlue }}>{shop.shop_name}</Text>
                        <Text style={{
                            fontSize: SIZES.base * 2,
                            fontWeight: '600',
                            color: COLORS.gray
                        }}
                        >
                            {shop.location.address}
                        </Text>

                    </View>
                </View>
                <View style={styles.rateBadge}>
                    <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>
                        {shop.avgRate}
                    </Text>
                </View>

            </View>
        )




    }

    function renderAddress() {
        return (
            <View style={{
                flexDirection: 'column',
                height: 'auto',
                backgroundColor: COLORS.lightGray4,
                marginBottom: 5,
                // marginTop: SIZES.padding,
                padding: SIZES.padding,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
             
            }}>
                <View style={{ flexGrow: 1, padding: SIZES.semiRadius, flexDirection: 'column' }}>
                    <Text
                        style={{
                            ...FONTS.h3,
                            color: COLORS.secondary,
                            fontWeight: 'bold',
                        }}>
                        Saved Address
                    </Text>
                    <Text style={{
                        fontSize: SIZES.base * 2,
                        fontWeight: '600',
                        color: COLORS.gray
                    }}
                    >
                        {shop.location.address}
                    </Text>
                </View>
            </View>

        )
    }


    function renderOrders({item}) {
        return (
            <View
                style={{
                    flexDirection: 'column',
                    height: 'auto',
                    backgroundColor: COLORS.lightGray4,
                    marginBottom: 5,
                    // marginTop: SIZES.padding,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: SIZES.padding,
                    marginHorizontal:SIZES.padding
                }}>
                  
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottomColor: COLORS.gray,
                        borderBottomWidth: 1,
                        marginBottom: 5,
                        paddingBottom: SIZES.padding
                    }}>
                    <View
                        style={{
                            // flexGrow: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            width:'100%',
                            alignItems: 'center',
                        }}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start',width: '80%'}}>
                        {serviceOpen.filter(a => a == String(item?.service?._id)).length !== 0 ? (
                            <TouchableOpacity onPress={() => {
                                let newServ = serviceOpen.filter(a => a !== String(item?.service?._id))
                                setServiceOpen(newServ)
                                setRnd(Math.random())
                            }}>
                                <Image source={icons.minus} style={{ width: 25, height: 25 }} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => {
                                let ind = serviceOpen.find(a =>{ a == String(item?.service?._id), console.log(a, "PPPPP")});
                                if (!ind) {
                                    serviceOpen.push(String(item?.service?._id))
                                }
                                setServiceOpen(serviceOpen)
                                setRnd(Math.random())
                            }}>
                                <Image source={icons.addbox} style={{ width: 25, height: 25 }} />
                            </TouchableOpacity >
                        )}
                        <Text
                            style={{
                                ...FONTS.body3,
                                marginLeft: SIZES.padding * 1.5,
                                color: COLORS.black,
                                fontWeight: 'bold',
                            }}>
                            {item?.service?.name}
                        </Text>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',width:'20%'}}>
                        <TouchableOpacity onPress={() => {
                               
                            }}>
                                <Image source={icons.edit} style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                let ind = serviceOpen.find(a =>{ a == String(item?.service?._id), console.log(a, "PPPPP")});
                                if (!ind) {
                                    serviceOpen.push(String(item?.service?._id))
                                }
                                setServiceOpen(serviceOpen)
                                setRnd(Math.random())
                            }}>
                                <Image source={icons.dele} style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={{
                            flexGrow: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}>
                       
                    </View>
                    
                </View>
                {serviceOpen.find(a => a == String(item?.service?._id)) && (
                    <View
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            borderBottomColor: COLORS.gray,
                            borderBottomWidth: 1,
                            marginBottom: 5,
                        }}>
                            
                            <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            alignItems: 'center',
                            borderBottomColor: COLORS.gray,
                        }}>
                            <Text
                            style={{
                                ...FONTS.body3,
                                color: COLORS.black,
                                marginLeft: 5,
                                fontWeight: 'bold',
                            }}>
                            No. of Clothes 
                        </Text>
                        <Text
                            style={{
                                ...FONTS.body3,
                                color: COLORS.black,
                                marginLeft: 5,
                                fontWeight: 'bold',
                            }}>
                            Rate Per Clothes
                        </Text>
                        <Text
                            style={{
                                ...FONTS.body3,
                                color: COLORS.black,
                                marginLeft: 5,
                                fontWeight: 'bold',
                            }}>
                           Total Price
                        </Text>
                            </View>
                        
                        {item.cloths.map(a => {
                            return (
                                <View
                                    key={a.cloth}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent:'flex-start',
                                        alignItems: 'center',
                                        padding: SIZES.padding
                                    }}>
                                    <View style={{
                                     flexDirection:'row',
                                      alignItems:'center',
                                      justifyContent:'space-between',
                                      width: '100%',
                                      }}>
                                        <Text
                                            style={{
                                                ...FONTS.body4,
                                                color: COLORS.black,
                                                fontWeight: 'bold'
                                            }}>
                                         {a.qty} {a.name}
                                        </Text>
                                   
                                             <Text
                                            style={{
                                                ...FONTS.body4,
                                                color: COLORS.black,
                                                fontWeight: 'bold'
                                            }}>
                                                 ({item.qty}) {item.pricing}
                                        </Text>
                                         <Text
                                            style={{
                                                ...FONTS.body4,
                                                color: COLORS.black,
                                                fontWeight: 'bold'
                                            }}>
                                                 {item.totalService}
                                        </Text>
                                    </View>
                                   
                                </View>
                                
                            );
                        })}
                    </View>
                )}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                ...FONTS.body3,
                                color: COLORS.black,
                                fontWeight: 'bold',
                            }}>
                           Sub Total Amount
                        </Text>
                        <Text
                            style={{
                                ...FONTS.body3,
                                color: COLORS.black,
                                fontWeight: 'bold',
                                marginRight: 10,
                            }}>
                            ₱{item.totalService}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    // function renderOrders() {
    //     return (
    //         <View style={styles.container}>
    //             <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: SIZES.padding * 2 }}>
    //                 <Text
    //                     style={{
    //                         ...FONTS.h3,
    //                         color: COLORS.secondary,
    //                         fontWeight: 'bold',
    //                     }}>
    //                     Selected Services
    //                 </Text></View>

    //             <View style={styles.SectionStyle}>
    //                 <View style={{ flexGrow: 1, padding: SIZES.semiRadius, flexDirection: 'column' }}>
    //                     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
    //                         {serviceOpen.filter(a => a == String(item?.service?._id)).length !== 0 ? (
    //                             <TouchableOpacity onPress={() => {
    //                                 let newServ = serviceOpen.filter(a => a !== String(ordersData?.service?._id))
    //                                 setServiceOpen(newServ)
    //                                 setRnd(Math.random())
    //                             }}>
    //                                 <Image source={icons.minus} style={{ width: 25, height: 25 }} />
    //                             </TouchableOpacity>
    //                         ) : (
    //                             <TouchableOpacity onPress={() => {
    //                                 let ind = serviceOpen.find(a => a == String(ordersData?.service?._id));
    //                                 if (!ind) {
    //                                     serviceOpen.push(String(ordersData?.service?._id))
    //                                 }
    //                                 setServiceOpen(serviceOpen)
    //                                 setRnd(Math.random())
    //                             }}>
    //                                 <Image source={icons.addbox} style={{ width: 25, height: 25 }} />
    //                             </TouchableOpacity>
    //                         )}
    //                         <Text
    //                             style={{
    //                                 ...FONTS.body3,
    //                                 marginLeft: SIZES.padding * 1.5,
    //                                 color: COLORS.black,
    //                                 fontWeight: 'bold',
    //                             }}>
    //                             {item?.service?.name}
    //                         </Text>
    //                         <View style={{
    //                             flexGrow: 1,
    //                             flexDirection: 'row',
    //                             justifyContent: 'flex-end',
    //                             alignItems: 'center'
    //                         }}>
    //                         </View>
    //                         <View style={{ flexDirection: 'row', flexGrow: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
    //                             <View>

    //                                 <TouchableOpacity>

    //                                     <Image source={icons.edit} style={{ width: 25, height: 25 }} />
    //                                 </TouchableOpacity>
    //                             </View>
    //                             <TouchableOpacity>

    //                                 <Image source={icons.dele} style={{ width: 25, height: 25 }} />

    //                             </TouchableOpacity>
    //                         </View>

    //                     </View>
    //                 </View>
    //             </View>
    //         </View>

    //     )
    // }
    function renderOrderDelivery() {
        return (
            <View style={{
                flexDirection: 'column',
                height: 'auto',
                backgroundColor: COLORS.lightGray4,
                marginBottom: 5,
                // marginTop: SIZES.padding,
                padding: SIZES.padding,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
             
            }}>
                <View style={{ flexGrow: 1, padding: SIZES.semiRadius, flexDirection: 'column' }}>
                    <Text
                        style={{
                            ...FONTS.h3,
                            color: COLORS.secondary,
                            fontWeight: 'bold',
                        }}>
                        Delivery Date
                    </Text>
                    <Text style={{
                        fontSize: SIZES.base * 2,
                        fontWeight: '600',
                        color: COLORS.gray
                    }}
                    >August 25, 2023
                    </Text>
                </View>
            </View>

        )
    }

    function renderOrderPickup() {
        return (
            <View style={{
                flexDirection: 'column',
                height: 'auto',
                backgroundColor: COLORS.lightGray4,
                marginBottom: 5,
                // marginTop: SIZES.padding,
                padding: SIZES.padding,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
             
            }}>
                <View style={{ flexGrow: 1, padding: SIZES.semiRadius, flexDirection: 'column' }}>
                    <Text
                        style={{
                            ...FONTS.h3,
                            color: COLORS.secondary,
                            fontWeight: 'bold',
                        }}>
                       Pickup Date
                    </Text>
                    <Text style={{
                        fontSize: SIZES.base * 2,
                        fontWeight: '600',
                        color: COLORS.gray
                    }}
                    >
                        Aug 18, 2023
                    </Text>
                </View>
            </View>

        )
    }


    useEffect(() => {
        handleGetOrder()
    }, []);



    return (
        <ScrollView>
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderShop()}
            {renderAddress()}
            <View style={{
               flexDirection: 'column',
               backgroundColor: COLORS.lightGray4,
               // marginTop: SIZES.padding,
               justifyContent: 'flex-start',
               alignItems: 'flex-start',
            }}>
                <View  style={{ flexGrow: 1, padding: SIZES.semiRadius, flexDirection: 'column' }}>
                    <Text
                        style={{
                            ...FONTS.h3,
                            color: COLORS.secondary,
                            fontWeight: 'bold',
                            paddingLeft: SIZES.padding
                        }}>
                       Selected Services
                    </Text>
                </View>
                <FlatList
                    scrollEnabled={false}
                    data={ordersData.orders}
                    keyExtractor={item => `${item._id}`}
                    contentContainerStyle={{
                        padding: SIZES.padding,
                    }}
                    renderItem={(renderOrders)}
                      ListFooterComponent={<View style={{ height: 10 }} />}
                    />
                    
            </View>
            
            {/* {renderOrders()} */}
            {renderOrderPickup()}
            {renderOrderDelivery()}

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
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 50
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: SIZES.padding,
        marginVertical: SIZES.padding * 1,
        padding: SIZES.padding,
        backgroundColor: COLORS.lightGray4,
        elevation: 3,
    },
    styleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: SIZES.padding,
        marginVertical: SIZES.padding * 1,
        padding: SIZES.padding, borderColor: COLORS.lightGray3
    },
    SectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        margin: SIZES.padding,
        marginVertical: SIZES.padding * 1,



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