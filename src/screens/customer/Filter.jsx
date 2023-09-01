import React, { useCallback, useState } from 'react'
import { PermissionsAndroid, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Button } from 'react-native'
import { COLORS, FONTS, SIZES, icons } from '../../constants'
import Slider from '../../components/Slider'
import { averageRatings, deliveryType, servicesProvided } from '../../globals/data';
import CheckBox from '@react-native-community/checkbox';
import RadioGroup from 'react-native-radio-buttons-group';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../../redux/actions/data.actions';
import { useEffect } from 'react';
import { CLEAR_FILTER, SET_FILTER, SET_USER } from '../../redux/actions/type';
import Geolocation from 'react-native-geolocation-service';


export default function Filter({ navigation }) {
  const dispatch = useDispatch()
  const {   user: { location }  } = useSelector(({ auth }) => auth);
  const { services } = useSelector(({data}) => data)
  const { filter } = useSelector(({ui}) => ui)
  const [selectedId, setSelectedId] = useState(false)
  const [rnd, setRnd] = useState(0);
  const [selectedServices, setSelectedServices] = useState([])
  const [rating, setRating] = useState(null);
  const [high, setHigh] = useState(8);
  const [low, setLow] = useState(1);
  const [latlng, setLatLng] = useState([]);
  const [error, setError] = useState({});

  const handleSave = () => {
    dispatch({type: SET_FILTER, payload: { services: selectedServices, rating, low, high, lat: latlng[1], long: latlng[0] }})
    navigation.goBack()
    setError({})
    // Alert.alert('SAVE DONE')
  }
  
  
  const handleClear = () => {
    // Alert.alert('CLEAR FILTER')
    setLow(1)
    setHigh(8)
    setSelectedServices([])
    setRating(null)
    setError({})

  }
  
  const handleCheckbox = (item) => {
    setError({})
    let newArr = [];
    let ind = selectedServices.indexOf(item._id);
    
    if(ind !== -1){
      newArr = selectedServices.filter(a => a !== item._id);
    } else {
      newArr = selectedServices;
      if(newArr.length === 3){
      setError({services: 'max limit 5 items'})
      return;
      }
      newArr.push(item._id)
    }
    
    setSelectedServices(newArr)
    if(newArr.length !== 0){
      setSelectedId(true);
    }
    setRnd(Math.random())
  }
  
  const handleRating = (val) => {
        setError({})
          if(rating !== val){
            setSelectedId(true)
            setRating(val);
          } else {
            setRating(null);
          }
        
  }
  
  
  
  const handleStepper = useCallback((lowValue, highValue) => {
    
    if((lowValue !== 1 || highValue !== 8)  && (lowValue != low || highValue != high)){
      // setError({})
      setSelectedId(true)
    }
    
    setHigh(highValue)
    setLow(lowValue)

  }, []);
  
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
       
            Geolocation.getCurrentPosition(
              position => {
                let { coords } = position;
                setLatLng([coords.longitude, coords.latitude])
                dispatch({type: SET_USER, payload: { location: coords }})
              },
              error => {
                // See error code charts below.
                console.log(error.code, error.message);
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  
  
  
  useEffect(() => {
    dispatch(getServices()) 
    requestLocationPermission()
    return () => {
        handleClear()
    }
  }, [])
  
  
  useEffect(() => {
      if(filter){
        setHigh(filter.high)
        setLow(filter.low)
        setRating(filter.rating)
        setSelectedServices(filter.services)
        setSelectedId(true)
      } else {
        setHigh(8)
        setLow(0)
        setRating(null)
        setSelectedServices([])
        setSelectedId(false)
      }
  }, [filter])
  
  
  
  
  function renderHeader() {
    return (
      <View
        style={styles.header}>
        <TouchableOpacity
          style={{
            margin: SIZES.padding,
            height: 25, width: 25,
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            style={{
              height: 25, width: 25, tintColor: COLORS.white
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // flexGrow: 1
          }}
        >
          <Text
            style={{
              ...FONTS.body2,
              color: COLORS.white,
              letterSpacing: 1,
              marginTop: SIZES.base,
              // fontWeight: 'bold',
            }}>
            FILTER
          </Text>
        </View>

        <TouchableOpacity
          style={{
            margin: SIZES.padding,
          }}
          onPress={() => {
          setSelectedId(false);
          dispatch({type: CLEAR_FILTER})
          handleClear()}}
        >
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
              letterSpacing: 0,
              marginTop: SIZES.base,
              marginRight: SIZES.base,
              // fontWeight: 'bold',
            }}>
            Clear
          </Text>
        </TouchableOpacity>
      </View>
    );
  }


  function renderSlider() {
    return (
      <View style={{ marginVertical: SIZES.padding }}>
        <Text style={{ ...FONTS.body3, fontWeight: 'bold', color: COLORS.secondary,
        marginVertical: SIZES.padding 
        }}>Distance From Me</Text>
        <View
          style={{
            paddingHorizontal: SIZES.padding * 2,
            marginVertical: -SIZES.padding * 3,
            marginBottom: SIZES.base 
          }}
        >
          <Slider
            range={{low, high}}
            onStepChange={(low, high) => handleStepper(low, high)}
            disabled={!location.latitude && !location.longitude}
          />
        </View>
      </View>
    )
  }



  function renderDesiredService() {
    return (
      <View style={{ marginVertical: SIZES.padding * 1 }}>
      <View
        style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
      >
        <Text style={{ ...FONTS.body3, color: COLORS.secondary, marginVertical: SIZES.padding, fontWeight: 'bold' }}>Desired Services</Text>
        {error.services && <Text>{error.services}</Text>}
        </View>
        {services.map(item => {
          return (
            <View 
              key={item._id}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} 
            >
              <CheckBox
                onValueChange={(e) => handleCheckbox(item)}
                value={selectedServices.find(a => a === item._id) ? true : false}
                //   onValueChange={() => setSelection(sample, index)}
                tintColors={{ true: COLORS.primary, false: COLORS.black }}
                style={styles.checkbox}
              />
              <TouchableOpacity
                  onPress={() => handleCheckbox(item)}
              >
              
              <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    )
  }


  function renderAverageRating() {
    return (
      <View style={{ marginVertical: SIZES.padding * 1 }}>
        <Text style={{ ...FONTS.body3, color: COLORS.secondary, marginVertical: SIZES.padding, fontWeight: 'bold' }}>Average Ratings</Text>
        {averageRatings.map(item => {
          return (
            <View
            key={item.value}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} 
            >
              <CheckBox
                onValueChange={(e) => handleRating(item.value)}
                value={rating === item.value}
                //   onValueChange={() => setSelection(sample, index)}
                tintColors={{ true: COLORS.primary, false: COLORS.black }}
                style={styles.checkbox}
              />
              <TouchableOpacity
              onPress={() => handleRating(item.value)}
              >
              <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>{item.label}</Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      {renderHeader()}
      <ScrollView
        style={{
          paddingHorizontal: SIZES.base * 2,
          paddingVertical: SIZES.padding,
        }}
        showsVerticalScrollIndicator={false}
      >
      <View
        style={{
          paddingBottom: SIZES.padding * 4
        }}
      >
      
        {/* DISTANCE SLIDER */}
        {renderSlider()}

        {/* DESIRED SERVICES */}
        {renderDesiredService()}

        {/* AVERAGE RATINGS */}
        {renderAverageRating()}
      </View>
        
        {/* DELIVERY SERVICE TYPE */}
        {/* {renderDeliveryServiceType()} */}
      </ScrollView>
      <View
        style={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: COLORS.white,
          paddingVertical: SIZES.padding * 2,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
      <TouchableOpacity 
      disabled={!selectedId}
      style={[styles.saveButton, { opacity: selectedId ? 1 : 0.5}]} 
      onPress={() => handleSave()}
      >
        <Text style={{ 
        ...FONTS.h4, color: COLORS.white }}>
        APPLY
        </Text>
      </TouchableOpacity>
      </View>
      {/* <Button title='Apply Filter'
        onPress={() => navigation.goBack()}
      /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: COLORS.lightGray3,
    // paddingBottom: SIZES.padding * 3,
    // alignItems: 'center'
  },
  header: {
    // height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.primary,
    elevation: 5,
    width: '100%'
  },
  saveButton: {
    // position: 'absolute',
    // bottom: 60,
    backgroundColor: COLORS.primary,
    // padding: SIZES.padding,
    height: 40,
    width: 200,
    borderRadius: SIZES.semiRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
})