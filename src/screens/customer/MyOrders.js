import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { userData2 } from '../../globals/data'
import { COLORS, FONTS, SIZES, icons, images, styles } from '../../constants'
import { TextButton } from '../../components'
import CustomerOrders from '../../components/Cards/CustomerOrder'


export default function MerchantHomeScreen({ navigation }) {
  const [isOnline, setIsOnline] = useState(false);
  const [myList, setMyList] = useState([]);
  const [selectedServiceStatus, setSelectedServiceStatus] = useState(1);



  const handleChangeService = (orderId) => {
    const selectedStatus = userData2.orders.filter(a => a.category == orderId)
    // setMyList(selectedStatus)
    setSelectedServiceStatus(orderId)
    // console.log(serviceId)
    // console.log(selectedCloth)

  }


  // useEffect(() => {
  //   handleChangeService(selectedServiceStatus)
  // }, [])


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
              marginVertical: SIZES.padding * 2,
              width: '80%'
            }}
          >
            <Text style={{ ...FONTS.h3, color: COLORS.black, fontWeight: 'bold', }}>My Orders</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  function renderOrders() {
    return (

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

        <TouchableOpacity
          style={{
            // borderRadius: SIZES.radius,
            // height: 40,
            flexDirection: 'row',
            // alignItems: 'center'
          }}
          onPress={() => {
            handleChangeService(),
              console.log(item)
          }}
        >
          <TextButton
            label="Active Orders"
            buttonContainerStyle={{
              // width: 150,
              padding: SIZES.base,

              backgroundColor: COLORS.primary,
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: SIZES.padding * 1,
              // flexDirection: 'row',

              // alignItems: 'center',
              marginHorizontal: SIZES.radius * 1
            }}
            labelStyle={{
              color: COLORS.white,
            }}
            // onPress={() => onPress("OrderDetails")}
            onPress={() => console.log("Order Receive Pressed")}

          />
          <TextButton
            label="Past Orders"
            buttonContainerStyle={{
              // width: 150,
              padding: SIZES.base,
              backgroundColor: COLORS.lightGray3,
              borderColor: COLORS.white,
              borderWidth: 1,
              borderRadius: SIZES.padding * 1,
              // flexDirection: 'row',

              // alignItems: 'center',
              marginHorizontal: SIZES.radius * 1
            }}
            labelStyle={{
              color: COLORS.black,
            }}
            // onPress={() => onPress("OrderDetails")}
            onPress={() => console.log("Order Receive Pressed")}

          />
        </TouchableOpacity>
      </View>


    )
  }



  function renderOrderDetails() {
    return (
      <View
        style={{
          padding: SIZES.padding
        }}
      >
        <CustomerOrders onPress={() => navigation.navigate('OrderSummary', {})}
        />
      </View>
    )
  }

  return (
    <SafeAreaView
      // style={styles.container}

      style={{
        flexGrow: 1,
        width: SIZES.width,
        padding: SIZES.padding,
        backgroundColor: COLORS.white2,
        alignItems: 'center',
      }}
    >
      {renderHeader()}
      {renderOrders()}
      {renderOrderDetails()}
    </SafeAreaView>
  )
}
