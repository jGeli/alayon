import {
    View,
    Text,
    SafeAreaView,
    Alert,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    Image,
    StyleSheet
  } from 'react-native';
  import React, { useState, useEffect, useRef } from 'react';
  import { COLORS, SIZES, FONTS, images, styles, constants, icons } from '../../constants';
  import OrderDetailsCard from '../../components/Cards/OrderDetailsCard';
  import { useDispatch, useSelector } from 'react-redux';
  import socket from '../../utils/socket';
import CustomerOrderDetails from '../../components/Cards/CustomerOrderDetails';
import { getOrderById, getOrders } from '../../redux/actions/customer.actions';
  
  
  
  
  export default function CustomerActiveOrders({ navigation }) {
    const dispatch = useDispatch();
    const { orderId } = route.params;
    const [ordersList, setOrdersList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
  
  
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      handleGetOrders();
    }, []);
  
  
    const handleGetOrders = async () => {
      setOrdersList([]);

       await dispatch(getOrderById(orderId))
        .then((data) => {
          setOrdersList(data);
        
          setTimeout(() => {
            setRefreshing(false);
          }, 2000);     
        })
     
    }
    
    

  
  
    useEffect(() => {
        handleGetOrders();
        //   handleChangeHomeMenu(orderTab);
          socket.on('newOrder', (order) => {
            handleGetOrders();
            // setIncoming(order.transaction_id);
            // setOpenIncoming(true);
        })
        
    }, []);
    
  
  
    function renderHeader() {
      return (
          <View
              style={style.header}>
              <TouchableOpacity
                        style={{width: 50}}
                        onPress={() => navigation.goBack()}
                          >
                      <Image
                          source={icons.back}
                          style={{...style.headerIcon, marginTop: SIZES.padding, tintColor: COLORS.primary}}
                      />
                  </TouchableOpacity>
               
                  <Text
                      style={style.headerText}>
                    Active Orders
                  </Text>
                  <View
                    style={{width: 50}}
                  >
                  
                  </View>
                  {/* <TouchableOpacity
                          >
                      <Image
                          source={icons.chat}
                          style={{...style.headerIcon, marginTop: SIZES.padding, tintColor: COLORS.primary}}
                      />
                  </TouchableOpacity> */}
               
          </View>
      );
  }

  
  function renderOrderDetails() {
    return (
   
      <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={ordersList}
        contentContainerStyle={{
          margin: SIZES.padding,
        }}
        keyExtractor={item => `${item._id}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <OrderDetailsCard
            item={item}
          />
        )}
        ListFooterComponent={<View style={{ height: 10 }} />}
      />
    );
  }

  
    return (
    
      <SafeAreaView style={styles.container}>
        {renderHeader()}
  
        {/* {renderServicesTab()} */}
  
        {/* <HomeContent
          setCurrentIndex={e => {
            handleChangeHomeMenu(e);
          }}
          currentIndex={selectedMenuId}> */}
          {renderOrderDetails()}
        {/* </HomeContent> */}
      </SafeAreaView>
    );
  }
  
  const style = StyleSheet.create({
    header: {
        minHeight: 50,
        width: '100%',
        // padding: SIZES.padding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: COLORS.darkGray,
        // borderBottomWidth: 1
        // elevation: 3,
        // backgroundColor: COLORS.gray
    },
    headerText: {
        ...FONTS.h4,
        color: COLORS.primary        
    },
    tabContainer: {
        flexDirection: 'row',
        width: '100%',
        padding: SIZES.padding,
        alignItems: 'space-between',
        justifyContent: 'space-around'
    },
    tabItemActive: {
        width: 175,
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
        padding: SIZES.padding
    },
    tabItem: {
        // flexGrow: 1,
        width: 175,
        alignItems: 'center',
        backgroundColor: COLORS.gray2,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
    },
    cardContainer: {
        margin: SIZES.padding,
        minHeight: 200,
        backgroundColor: COLORS.lightGray4,
        elevation: 3,
        borderRadius: SIZES.semiRadius
    },
    headerContainer: {
        flexDirection: 'row',
        padding: SIZES.padding,
        alignItems: 'center'
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },
    headerTextWrapper: {  
        // backgroundColor: COLORS.gray,
        marginLeft: SIZES.padding,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexGrow: 1
    
    },
    headerTextTitle: {  
            ...FONTS.body3,
            fontWeight: 'bold',
            color: COLORS.black
    },
    headerIcon: {
        height: 25,
        width: 25,
        marginHorizontal: SIZES.padding * 1.5,
        tintColor: COLORS.transparentBlack7,
        marginBottom: SIZES.padding
    },
    stepperWrapper: {
        flexGrow: 1
    },
    buttonWrapper: {
        // backgroundColor: COLORS.gray,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: SIZES.padding * 2,
        paddingHorizontal: SIZES.padding * 2
        // marginBottom: SIZES.padding
    },
    button: {
        width: 150,
        backgroundColor: COLORS.lightGray3,
        alignItems: 'center',
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        borderWidth: 1,
        borderColor: COLORS.darkGray,
        elevation: 2
    },
    buttonText: {
        ...FONTS.body4,
        fontWeight: 'bold'
    }
    
  });