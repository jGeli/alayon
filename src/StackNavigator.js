import { StyleSheet, Image, TouchableOpacity, Button, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';



//SCREENS
import HomeScreen from './screens/customer/Home';
import MyOrderScreen from './screens/customer/MyOrders';
import NotificationScreen from './screens/Notifications';
import RecentSearch from './screens/customer/RecentSearch';
import Filter from './screens/customer/Filter';
import AddressLocation from './screens/customer/AddressLocation';
import MapScreen from './components/Map/Map';
import MyAccount from './screens/customer/MyAccount';

import OnBoarding from './screens/OnBoarding/OnBoarding';
import SignIn from './screens/Authentication/SignIn';
// import ForgotPassword from './screens/Authentication/ForgotPassword';
import Otp from './screens/Authentication/Otp';
import SchedulePickup from './screens/customer/SchedulePickup';
import OrderSummary from './screens/customer/OrderSummary';
import ShopServices from './screens/customer/ShopServices';
import LoadingScreen from './screens/LoadingScreen';
import DeliveryOptionScreen from './screens/customer/DeliveryOptions';
import AddOnsScreen from './screens/customer/AddOnsScreen';
import AddressLocationScreen from './screens/customer/AddressLocationScreen';
import ChatList from './screens/ChatSupport/ChatList';
// import Conversation from './screens/ChatSupport/Conversation';
import AddressLocationForm from './screens/customer/AddressLocationForm';
import SelectRegion from './screens/customer/SelectRegion';
import AddressDetails from './screens/customer/AddressDetails';
import io from 'socket.io-client';



import { icons, COLORS } from './constants';
import { getAuthUser } from './redux/actions/auth.actions';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerBasket, getCustomerLocations } from './utils/AsyncStorage';
import { SET_CUSTOMER_BASKET, SET_CUSTOMER_DATA } from './redux/actions/type';
import OrderStatus from './screens/customer/OrderStatus';
import Map2 from './components/Map/Map2';
import Map3 from './components/Map/Map3';

let socket = null;

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(({ auth }) => auth);

  const [mainScreen, setMainScreen] = useState(null);
  const [loading, setLoading] = useState(true)
  const [textMsg, setTextMsg] = useState('');
  // getting data
  const getUserData = async () => {
    try {
      const userToken = JSON.parse(await AsyncStorage.getItem('token'));
      const onBoarded = await AsyncStorage.getItem('onBoarded');
      const basket = await getCustomerBasket();
      const locations = await getCustomerLocations();

      if (onBoarded) {
        // setMainScreen('OrderStatus');
        setMainScreen('MainCustomer');

      } else {
        setMainScreen('OnBoarding')
      }

      setLoading(false)
      if (userToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
      }



      if (basket && !isAuthenticated) {
        dispatch({ type: SET_CUSTOMER_BASKET, payload: basket });
      }


      if (locations && !isAuthenticated) {
        dispatch({ type: SET_CUSTOMER_DATA, payload: { locations } });
      }

      dispatch(getAuthUser());
    } catch (error) {
      console.log(error);
    }
  };

  function CustomerBottomTabs({ navigation, route }) {
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
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  resizeMode="contain"
                  source={icons.list}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: COLORS.primary,
                  }}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  source={icons.list}
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
          name="CustomerNotifications"
          component={NotificationScreen}
          options={{
            tabBarLabel: 'Notifications',
            headerShown: false,
            tabBarShowLabel: true,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  resizeMode="contain"
                  source={icons.notification}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: COLORS.primary,
                  }}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  source={icons.notification}
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

  const handleSocket = () => {
    socket.emit('ping', 'HELLO WORLD!')
  }

  useEffect(() => {
    getUserData();


  }, [isAuthenticated]);

  useEffect(() => {
    console.log("SOCKET")
    if (user && user._id) {
      socket = io("http://192.168.1.100:42005", {
        auth: {
          token: user._id
        },
        query: {
          "userId": user._id
        }
      });
      socket.on('pong', (data) => {
        console.log('pong', data)
        setTextMsg(data)
      })
    }

  }, [user])


  return (
    <>
      {loading && !mainScreen ?
        <LoadingScreen />
        :

        <NavigationContainer>
          {/* CUSTOMER SCREENS */}

          <Stack.Navigator initialRouteName={mainScreen}>
            {/* <Stack.Screen
              name="Chats"
              component={ChatList}
            // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Conversation"
              component={Conversation}
              options={{ headerShown: false }}
            /> */}
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
              name="Map"
              component={MapScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Map2"
              component={Map3}
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
