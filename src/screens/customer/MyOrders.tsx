import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, Button, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { userData2 } from '../../globals/data'
import { COLORS, FONTS, SIZES, icons, images } from '../../constants'
import { TextButton } from '../../components'
import CustomerOrders from '../../components/Cards/CustomerOrder'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native'
import { getOrders } from '../../redux/actions/customer.actions'


export default function MerchantHomeScreen({ navigation }) {
  const dispatch = useDispatch()
  const [ordersData, setOrdersData] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // setShops([]);
    // handleGetShops()
    handleOrders()    
 
  }, []);




  
  const handleOrders = async () => {
     await dispatch(getOrders())
        .then((orders) => {
          setOrdersData(orders);
          setTimeout(() => {
            setRefreshing(false)
          }, 2000);
        })
  }


  useEffect(() => {
    handleOrders()
  }, [])



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
            color: COLORS.white,
            letterSpacing: 0,
            marginTop: SIZES.base,
          }}>
          Active Orders
        </Text>

        <View></View>
      </View>
    );
  }





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
      {/* {renderOrderTab()} */}
      <FlatList
        showsVerticalScrollIndicator={false}
       refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
          style={{marginTop: SIZES.padding * 2, padding: SIZES.padding * 2}}
          data={ordersData}
          renderItem={({item, index}) => {
          return(
            <CustomerOrders key={index} navigation={navigation} order={item}/>
            )
          }}
          keyExtractor={(item) => item._id}
        />
    </SafeAreaView>
  )
}


// define your styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: COLORS.lightGray3,
    paddingBottom: SIZES.padding * 2,
    // alignItems: 'center'
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    // elevation: 5,
    width: '100%',
    marginBottom: SIZES.padding
  },
  orderTabItem: {
    width: '40%',
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray3,
    height: 40
  }, 
  tabItemText: {
    ...FONTS.body3,
    fontWeight: 'bold'
  }
});