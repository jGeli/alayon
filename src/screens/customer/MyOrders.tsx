import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { userData2 } from '../../globals/data'
import { COLORS, FONTS, SIZES, icons, images } from '../../constants'
import { TextButton } from '../../components'
import CustomerOrders from '../../components/Cards/CustomerOrder'
import { useSelector } from 'react-redux'
import { ScrollView } from 'react-native'


export default function MerchantHomeScreen({ navigation }) {
  const { customer: { orders } } = useSelector(({customer}) => customer) 
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
      <View
        style={styles.header}>
        {/* <TouchableOpacity
          style={{ margin: SIZES.padding, marginRight: SIZES.padding * 2 }}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            style={{ height: 20, width: 20, tintColor: COLORS.primary }}
          />
        </TouchableOpacity> */}
        <Text
          style={{
            ...FONTS.body2,
            color: COLORS.black,
            fontWeight: 'bold',
          }}>
          MY ORDERS
        </Text>

        <View></View>
      </View>
    );
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
      {orders.map(a => {
      
        return <View key={a._id}><CustomerOrders navigation={navigation} order={a}
        /></View>
      })}
        
      </View>
    )
  }
  
  
  console.log("CUSTOMER ORDER", orders)

  return (
    <SafeAreaView
      style={styles.container}

    // style={{
    //   flexGrow: 1,
    //   width: SIZES.width,
    //   padding: SIZES.padding,
    //   backgroundColor: COLORS.white2,
    //   alignItems: 'center',
    // }}
    >
      {renderHeader()}
      {renderOrders()}
      <ScrollView>
      {renderOrderDetails()}
      </ScrollView>
    </SafeAreaView>
  )
}


// define your styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: COLORS.lightGray3,
    paddingBottom: SIZES.padding * 3,
    alignItems: 'center'
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    elevation: 5,
    width: '100%',
    marginBottom: SIZES.padding
  },

});