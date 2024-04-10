import { StyleSheet, Image, TouchableOpacity, PermissionsAndroid, View, Text, Dimensions, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { createDrawerNavigator } from '@react-navigation/drawer';



//SCREENS
import HomeScreen from './screens/customer/Home';
import MyOrderScreen from './screens/customer/MyOrders';
import RecentSearch from './screens/customer/RecentSearch';
import Filter from './screens/customer/Filter';
import MapScreen from './components/Cards/Map/Map';
import MyAccount from './screens/customer/MyAccount';
import CustomerReviewScreen from './screens/customer/CustomerReviewScreen';
import CustomerSettings from './screens/customer/CustomerSettings';
import OnBoarding from './screens/OnBoarding/OnBoarding';
import SignIn from './screens/Authentication/SignIn';
import Otp from './screens/Authentication/Otp';
import OrderSummary from './screens/customer/OrderSummary';
import ShopServices from './screens/customer/ShopServices';
import LoadingScreen from './screens/LoadingScreen';
import DeliveryOptionScreen from './screens/customer/DeliveryOptions';
import AddOnsScreen from './screens/customer/AddOnsScreen';
import AddressLocationScreen from './screens/customer/AddressLocationScreen';
import Conversation from './screens/ChatSupport/Conversation';
import AddressLocationForm from './screens/customer/AddressLocationForm';
import SelectRegion from './screens/customer/SelectRegion';
import AddressDetails from './screens/customer/AddressDetails';



import { icons, COLORS, images } from './constants';
import { getAuthUser } from './redux/actions/auth.actions';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerBasket, getCustomerLocation, getCustomerLocations } from './utils/AsyncStorage';
import { SET_CUSTOMER_BASKET, SET_CUSTOMER_DATA, SET_USER, STOP_LOADING } from './redux/actions/type';
import OrderStatus from './screens/customer/OrderStatus';
import BasketsScreen from './screens/customer/BasketsScreen';
import ProfileSetup from './screens/Authentication/ProfileSetup';
import Maps from './components/Cards/Map/Map1';
import Map1 from './components/Cards/Map/Map1';
import TestScreen from './screens/TestScreen';
import socket from './utils/socket';
import CustomerOrderDetails from './components/Cards/CustomerOrderDetails';
import PermissionScreen from './screens/OnBoarding/PermissionScreen';
import Notification from './screens/Notifications';
import AreaLocations from './components/AreaLocations';
import SchedulePickup from './screens/customer/SchedulePickup';
import OrderDetails from './screens/customer/OrderDetails';
import OrderCompleteScreen from './screens/OrderCompleteScreen';
import TestingScreen from './screens/TestingScreen';
import OrderStepStatus from './screens/customer/OrderStepStatus';
import CustomDrawerHeader from './screens/Navigation/CustomDrawerHeader';
import { Layout } from 'react-native-reanimated';


const StackNavigator = () => {
  const dispatch = useDispatch();
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const { isAuthenticated, user } = useSelector(({ auth }) => auth);
  const [mainScreen, setMainScreen] = useState(null);
  const [loading, setLoading] = useState(true);
  // getting data

  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;


  const initScreen = async () => {
    const userToken = await AsyncStorage.getItem('token');
    const basket = await getCustomerBasket();
    const locations = await getCustomerLocations();
    const location = await getCustomerLocation();
    const onBoarded = await AsyncStorage.getItem('onBoarded');
    const locationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    const notificationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)

    if (onBoarded && (locationPermission && notificationPermission)) {
      // setMainScreen('OrderStatus');
      setMainScreen('MainCustomer');

    } else {
      if (!locationPermission || !notificationPermission) {
        setMainScreen('PermissionScreen')
      } else {
        setMainScreen('OnBoarding')
      }
    }



    if (userToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
      dispatch(getAuthUser())
    } else {

      if (basket && !isAuthenticated) {
        dispatch({ type: SET_CUSTOMER_BASKET, payload: basket });
      }


      if (locations && !isAuthenticated) {
        dispatch({ type: SET_CUSTOMER_DATA, payload: { locations } });
      }

      if (location && !isAuthenticated) {
        dispatch({ type: SET_USER, payload: { location } });
      }
    }
  }

  useEffect(() => {
    initScreen();
    console.log(isAuthenticated, 'IS AUTH?')
    if (isAuthenticated) {
      console.log(user._id)
      socket.auth.token = user._id;
      socket.disconnect().connect();
      socket.on("connection", (socket) => {
        console.log(`connected! ${socket}`)
        // console.log(socket.handshake.auth); // prints { token: "abcd" }
      });

    }


    setTimeout(() => {
      setLoading(false)
    }, 3000)

  }, [isAuthenticated])



  const CustomerBottomTabs = ({ navigation, route }) => {

    return (
      <Tab.Navigator>
        <Tab.Screen
          name="CustomerHome"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarShowLabel: true,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  resizeMode="contain"
                  source={icons.homeSharp}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: COLORS.primary,
                  }}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  source={icons.home}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: COLORS.black,
                  }}
                />
              ),
          }}
        />

        <Tab.Screen
          name="CustomerOrders"
          component={MyOrderScreen}
          options={{
            tabBarShowLabel: true,
            tabBarLabel: 'My Orders',
            headerShown: false,
            tabBarButton: (props) => isAuthenticated ? <TouchableOpacity {...props} /> : <TouchableOpacity {...props} onPress={() => navigation.navigate('SignIn', { redirection: 'CustomerOrders' })} />,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  resizeMode="contain"
                  source={icons.list1}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: COLORS.primary,
                  }}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  source={icons.list1}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: COLORS.black,
                  }}
                />
              ),
          }}
        />



        <Tab.Screen
          name="CustomerAccount"
          component={MyAccount}

          options={{
            tabBarLabel: 'My Account',
            headerShown: false,
            tabBarShowLabel: true,
            tabBarButton: (props) => isAuthenticated ? <TouchableOpacity {...props} /> : <TouchableOpacity {...props} onPress={() => navigation.navigate('SignIn', { redirection: 'CustomerAccount' })} />,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  resizeMode="contain"
                  source={icons.user}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: COLORS.primary,
                  }}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  source={icons.account}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: COLORS.black,
                  }}
                />
              ),
          }}
        />
      </Tab.Navigator >
    );
  }


  return (
    <>
      {(loading || !mainScreen) ?
        <LoadingScreen
          // style={{ backgroundColor: COLORS.white }}
          source={images.setLoading}
        />
        :

        <NavigationContainer>
          {/* CUSTOMER SCREENS */}

          <Stack.Navigator initialRouteName={mainScreen}>
            <Stack.Screen
              name="TestScreen"
              component={TestScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OrderStepStatus"
              component={OrderStepStatus}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TestingScreen"
              component={TestingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AreaLocations"
              component={AreaLocations}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NotificationScreen"
              component={Notification}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Conversation"
              component={Conversation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OnBoarding"
              component={OnBoarding}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Otp"
              component={Otp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OrderStatus"
              component={OrderStatus}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoadingScreen"
              component={LoadingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MainCustomer"
              component={CustomerBottomTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ShopServices"
              component={ShopServices}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SchedulePickup"
              component={SchedulePickup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OrderDetails"
              component={OrderDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Search"
              component={RecentSearch}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Filter"
              component={Filter}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OrderSummary"
              component={OrderSummary}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CustomerOrderDetails"
              component={CustomerOrderDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddOnsScreen"
              component={AddOnsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddressLocationScreen"
              component={AddressLocationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddressLocationForm"
              component={AddressLocationForm}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SelectRegion"
              component={SelectRegion}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddressDetails"
              component={AddressDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DeliveryOptionScreen"
              component={DeliveryOptionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BasketsScreen"
              component={BasketsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileSetup"
              component={ProfileSetup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Map"
              component={MapScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Map1"
              component={Map1}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="CustomerReview"
              component={CustomerReviewScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OrderCompleteScreen"
              component={OrderCompleteScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MapTracking"
              component={Maps}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PermissionScreen"
              component={PermissionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CustomerSettings"
              component={CustomerSettings}
              options={{ headerShown: false }}
            />


          </Stack.Navigator>
        </NavigationContainer>
      }
    </>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
