import React from 'react';
import  { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import MapView, { Marker, PROVIDER_GOOGLE, AnimatedRegion } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Svg } from "react-native-svg";

import { COLORS, FONTS, GOOGLE_API_KEY, SIZES, constants, icons, images } from '../constants';
import socket from '../utils/socket';
import { useDispatch } from 'react-redux';
import { getCurrentRiderLocation, getOrderById } from '../redux/actions/customer.actions';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { statusIndexing } from '../utils/helpers';
import moment from 'moment';

const RiderImage = images.rider;
const WashingPin = icons.washingMachinePin;
const pinIcon = icons.pinIcon;


let initialRegion = {
  latitude: 11.231742101192534,
  longitude: 125.00245545087691,
  latitudeDelta: 0.0043,
  longitudeDelta: 0.0034
}

const Oval = () => {
  return <View style={styles.oval} />;
};




const secondIndicatorStyles = {
  stepIndicatorSize: 40,
  currentStepIndicatorSize: 50,
  separatorStrokeWidth: 10,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: COLORS.primary,
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 10,
  stepStrokeFinishedColor: COLORS.primary,
  stepStrokeUnFinishedColor: COLORS.primaryDisabled,
  separatorFinishedColor: COLORS.primary,
  separatorUnFinishedColor: COLORS.primaryDisabled,
  stepIndicatorFinishedColor: COLORS.primary,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 20,
  stepIndicatorLabelCurrentColor: COLORS.primary,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor:  COLORS.transparentBlack7,
  labelColor: COLORS.transparentBlack7,
  labelSize: 10,
  currentStepLabelColor: COLORS.primary,
};



const getStepIndicatorIconConfig = ({
  position,
  stepStatus,
}: {

  position: number;
  stepStatus: string;
}) => {
  const iconConfig = {
    resizeMode: 'contain',
    source: icons.order_confirmed,
    style: {height: stepStatus === 'current' ? 35 : 20, width:  stepStatus === 'current' ? 35 : 20, tintColor: stepStatus === 'finished' ? COLORS.white : stepStatus === 'current' ? COLORS.primary : COLORS.black }
  };
  switch (position) {
    case 0: {
      iconConfig.source = icons.laundryBasket;
      break;
    }
    case 1: {
      iconConfig.source = icons.pickup;
      break;
    }
    case 2: {
      iconConfig.source = icons.rateus;
      break;
    }
    case 3: {
      iconConfig.source = icons.delivery4;
      break;
    }
    case 4: {
      iconConfig.source = icons.order_confirmed;
      break;
    }
    case 5: {
        iconConfig.source = icons.rateus1;
        break;
      }
    default: {
      break;
    }
  }
  return iconConfig;
};


const Map1 = ({ navigation, route }) => {
  const { order, navType } = route.params;
  const dispatch = useDispatch()
  const mapView = useRef();
  const markerRef = useRef();
  const [region, setRegion] = useState(null);
  const [toLoc, setToLoc] = useState(null)
  const [fromLoc, setFromLoc] = useState(null)
  const [angle, setAngle] = useState(0)
  const [riderLoc, setRiderLoc] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const [rnd, setRnd] = useState(0)
  const [progress, setProgress] = useState(0);
  const [orderData, setOrderData] = useState({
    statusIndex: {},
    order_status: []
  })

  const handleGetOrder = async (id) => {
  
    let myOrder = await dispatch(getOrderById(id));
    if(myOrder){
      // console.log(statusIndexing(myOrder.activeStatus), 'statind')
      let statInd = statusIndexing(myOrder.activeStatus);
      setProgress(Number((statInd?.count / statInd?.length) * 100))
      setOrderData({...myOrder, statusIndex: statInd})
      setRnd(Math.random())
    }

  }


  const handleCurrentRiderLocation = async () => {
  
  let res = await dispatch(getCurrentRiderLocation(orderData._id))
    // .then(res => {
    //   console.log(res.track, 'RRR')
    //   console.log(res.owner, 'BBB')
    //   if(res && res.track) {
    //     let { coordinate } = res.track;
    //     console.log(res, 'RESPONSESS')
    //     setRiderLoc(coordinate)
    //   }
    // })
          if(res) {
        let { coordinate } = res.track;
        // console.log(res, 'RESPONSESS')
        if(coordinate){
          setRiderLoc(coordinate)
        }
      }
  }
  


  useEffect(() => {
    // if (order) {

    let { shop: { location }, pickupDelivery } = order;
    handleGetOrder(order._id)
    handleCurrentRiderLocation()
    setRegion(initialRegion)
    setToLoc({ latitude: Number(location.latitude), longitude: Number(location.longitude) })
    setFromLoc({ latitude: Number(pickupDelivery.latitude), longitude: Number(pickupDelivery.longitude) })



  
    socket.on('liveTrack', (data) => {
      let liveData = data.coordinate;
      // Alert.alert('TRACKING NOW!', JSON.stringify(data))
      // if(!riderLoc && liveData){
      //   // Alert.alert(' SET RIDER LOCATION', JSON.stringify(liveData), JSON.stringify(riderLoc))
        setRiderLoc(liveData)
      // }
      
      if (Platform.OS === "android") {
        if (markerRef.current && liveData) {
          markerRef.current?.animateMarkerToCoordinate(
            liveData,
            500
          );
        }
      }
     
      setAngle(data.actualAngle)
     
      // if(liveData){
      //   if(state.nextLine){
      //     progress = progress.concat(state.nextLine);
      //     setState({...state, progress: progress, nextLine: liveData})
      //   } else {
      //     setState({...state, nextLine: liveData})
      //   }
      // } else{ 
        
      // }
      
      // setRnd(Math.random())
      
    })

  
       socket.on('updateOrder', (orderId) => {
          if(orderId == order._id){
            handleGetOrder(orderId);
          }
       })
      

    return () => {
      // Geolocation.clearWatch(this.watchID);
    }


  }, [])
  


  // console.log("ORDER DATA", Object.keys(orderData), orderData.pickupDate, orderData.deliveryDate)
  function calculateAngle(coordinates) {
    let startLat = coordinates[0]["latitude"]
    let startLng = coordinates[0]["longitude"]
    let endLat = coordinates[1]["latitude"]
    let endLng = coordinates[1]["longitude"]
    let dx = endLat - startLat
    let dy = endLng - startLng

    return Math.atan2(dy, dx) * 180 / Math.PI
  }


  function renderHeaderButtons() {
    return (
      <>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: SIZES.padding * 2,
            left: SIZES.padding,
            width: 40,
            height: 40,
            borderRadius: SIZES.padding,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: COLORS.gray2,
            backgroundColor: COLORS.white
          }}
          onPress={() => navType === 'track' ?  navigation.goBack() : navigation.navigate('CustomerOrders', {})}
        >
          <Image
            source={icons.arrow_back}
            resizeMode='contain'
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.gray2
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            position: 'absolute',
            top: SIZES.padding * 2,
            right: SIZES.padding
          }}
        >
          {/* <TouchableOpacity
            onPress={() => navigation.push('TestScreen', {order: order})}
            style={{
              width: 40,
              height: 40,
              borderRadius: SIZES.padding,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: COLORS.gray2,
              backgroundColor: COLORS.white
            }}
          >
            <Image
              source={icons.globe}
              resizeMode='contain'
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.gray
              }}
            />
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: SIZES.padding,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: COLORS.gray2,
              backgroundColor: COLORS.white,
              marginTop: SIZES.radius
            }}
          >
            <Image
              source={icons.focus}
              resizeMode='contain'
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.gray
              }}
            />
          </TouchableOpacity> */}
        </View>

      </>
    )
  }
  
  const renderStepIndicator = (params: any) => {
    return(
      <Image {...getStepIndicatorIconConfig(params)} />
    );
    }
    
    

    
  
  
  function renderStepper (){
  return (
    <StepIndicator
    customStyles={secondIndicatorStyles}
    currentPosition={orderData.statusIndex?.index}
    // onPress={(e) => { 
    // setOrderData({...orderData, statusIndex: {...orderData.statusIndex, index: e}})
    // }}
    // renderLabel={renderLabel}
    renderStepIndicator={renderStepIndicator}
    stepCount={5}
    // labels={orderData.order_status}
  />
  )
  
  }


  function renderInfo () {
  // let progress = 30;
    // let progress = Number((orderData.statusIndex?.count / orderData.statusIndex?.length) * 100)
      console.log(orderData.order_status[orderData.statusIndex?.index])
    console.log(progress, 'Prog', orderData.statusIndex, orderData.order_status.length)
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
      <Oval/>
        {/* Info Container */}
        <View
          style={styles.infoCard}
        >
        <View 
          style={{width: '100%', position: 'absolute', 
          justifyContent: 'flex-end', alignItems: 'flex-end',
          paddingHorizontal: SIZES.padding * 2
          }}
        > 
          <Text
            style={{...FONTS.body4, color: COLORS.darkBlue}}
          >
          {orderData.transaction_id}
          </Text>
        </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              // flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginBottom: SIZES.padding 
            }}
          >
          <AnimatedCircularProgress
            size={90}
            width={5}
            fill={progress}
            tintColor={COLORS.primary}
            backgroundColor={COLORS.darkGray2}>
            {
              (fill) => (
              <View style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.primary
                  }}
                >
                 {orderData.statusIndex?.index <= 1 && orderData.statusIndex?.status !== 'rider_pickup'  ? 'Pickup' : orderData.statusIndex?.index === 5 ? 'Delivered' : 'Delivery' }
                </Text>
                {orderData.statusIndex?.index < 5 &&
                <Text
                  style={{
                    ...FONTS.body5,
                    textAlign: 'center'
                  }}
                >
                 {orderData.statusIndex?.index <= 1 && orderData.statusIndex?.status !== 'rider_pickup'  ? moment().to(orderData.pickupDate) : moment().to(orderData.deliveryDate) } 
                </Text>}
              
                </View>
              )
            }
          </AnimatedCircularProgress>
          <View
          style={{
            flex: 1,
            width: '100%',
            // flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: SIZES.padding,
            marginTop: SIZES.padding * 2
          }}
          >
          {  orderData.order_status && orderData.order_status.length !== 0 &&
          <Text
            style={{
            ...FONTS.body3,
            fontWeight: 'bold',
            color: COLORS.primary
            }}
          >{   
            orderData.order_status[orderData.statusIndex?.index]?.name
            }</Text>}
          </View> 
          <View
            style={{width: '100%', marginBottom: SIZES.padding * 2}}
          >
         {renderStepper()}
         </View>
          </View>
          {/* <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: 70,
              marginTop: SIZES.padding,
              borderRadius: 20,
              paddingHorizontal: SIZES.radius,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.primary
            }}
          >
            <Image
              source={images.profile}
              resizeMode='contain'
              style={{
                height: 40,
                width: 40,
                borderRadius: 5
              }}
            />
            <View
              style={{
                flex: 1,
                marginLeft: SIZES.padding
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.white,
                }}
              >Bugtech Systems</Text>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.white
                }}
              >Delivery Man</Text>

            </View>
            <View
              style={{
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: COLORS.white,
                backgroundColor: COLORS.transparent
              }}
            >
              <Image
                source={icons.chat}
                resizeMode='contain'
                style={{
                  height: 25,
                  width: 25,
                  tintColor: COLORS.white
                }}
              />
            </View>

          </TouchableOpacity> */}
        </View>

      </View>
    )
  }
  
  // console.log(state.progress, 'STATE PROGRESS')

  return (
    <View
      style={{
        flex: 1,
      }}
    >
                   <Image
      onLoadEnd={() => console.log('LOOOADED')}
                                    resizeMode='stretch'
                                    source={WashingPin}
                                    style={{ height: 0, width: 0 }}
                                />
    <Image
      onLoadEnd={() => console.log('LOOOADED')}
                                    resizeMode='stretch'
                                    source={RiderImage}
                                    style={{ height: 0, width: 0 }}
                                />
                     
                                    <Image
      onLoadEnd={() => console.log('LOOOADED')}
                                    resizeMode='stretch'
                                    source={pinIcon}
                                    style={{ height: 0, width: 0 }}
                                />
      {/* {renderMap()} */}

      <MapView
        ref={mapView}
        style={{
          flex: 1,
        }}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
      >
        {
          fromLoc &&
          <Marker
            // image={RiderImage}

            key={'FromLoc'}
            coordinate={fromLoc}
            tracksViewChanges={false}
            // icon={images.deliveryMan}
            anchor={{ x: 0.5, y: 0.6 }}
          >
            <View >
            <Image source={pinIcon} style={{ height: 35, width: 40 }}
            onLoadEnd={() => console.log('LOOOADEDINGG')}
            />
          </View>
          </Marker>
        }
        {
          toLoc &&
          <Marker
            key={'toloc'}
            coordinate={toLoc}
            tracksViewChanges={false}
            anchor={{ x: 0.4, y: 0.5 }}
            >
             <View >

          <Image
            source={WashingPin}
            style={{ height: 35, width: 25 }}
            onLoadEnd={() => console.log('LOOOADEDINGG')}
          />

        </View>
          </Marker>

        }
        {riderLoc &&  <Marker.Animated
          key={'riderLoc'}
          flat
          anchor={{ x: 0.5, y: 0.4 }}
          rotation={angle}
          // icon={RiderImage}
          // ref={markerRef.current}
        
        // style={{ height: 55, width: 50 }}
        coordinate={riderLoc}
        // tracksViewChanges={false}
        
        >
 <View                               >
                                    <Svg
            width={50} height={55}
            style={{  transform: [{ rotate: `90deg` }]   }}

            >

                                <Image
                                      onLoadEnd={() => console.log('LOOOADEDINGG')}
                                    resizeMode='stretch'
                                    source={RiderImage}
                                    style={{ height: 55, width: 40 }}
                                />
                                  </Svg>

                            </View>
        </Marker.Animated>  }

        <MapViewDirections
          origin={toLoc}
          destination={fromLoc}
          apikey={GOOGLE_API_KEY}
          strokeWidth={5}
          strokeColor={COLORS.primary}
          optimizeWaypoints={false}
          onReady={result => {
            // setDuration(Math.ceil(result.duration))

            if (!isReady) {
              // Fit the map based on the route
              mapView.current.fitToCoordinates(result.coordinates, {
                edgePending: {
                  right: SIZES.width * 0.5,
                  bottom: 1000,
                  left: SIZES.width * 0.5,
                  top: SIZES.width * 0.5,
                }
              })

              // Reposition the navigator
              if (result.coordinates.length >= 2) {
                let angle = calculateAngle(result.coordinates)

                setAngle(angle)
              }
              setIsReady(true)
            }
          }}
        />

      </MapView>

      {renderHeaderButtons()}

      {renderInfo()}

    </View>
  )
}


const mapStyle = [
  {
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
];



//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    backgroundColor: COLORS.white3,
    padding: SIZES.padding,
    minHeight: 70,
    width: '100%',
    borderBottomColor: COLORS.lightGray3,
    borderBottomWidth: 3
  },
  currentLocationImage: {
    height: 40,
    width: 40,
    padding: 10,
    tintColor: COLORS.primary,
  },
  marker: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    // backgroundColor: "#007bff",
    // borderColor: "#eee",
    // borderRadius: 5,
    elevation: 10,
  },
  markerDrag: {
    paddingVertical: 0,
    paddingHorizontal: 30,
    // backgroundColor: "#007bff",
    // borderColor: "#eee",
    // borderRadius: 5,
    elevation: 10,
  },
  washing: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    // backgroundColor: "#007bff",
    // borderColor: "#eee",
    // borderRadius: 5,
    elevation: 10,
  },
  topContainer: {
    // flex: 1,
    width: '100%',
    position: 'absolute',
    top: 0,
    paddingRight: SIZES.padding,
    paddingLeft: SIZES.padding,
    // backgroundColor: COLORS.black
    // left: 10
  },

  headerContainer: {
    // backgroundColor: 'black',
    // flex: 1,
    // paddingTop: SIZES.padding,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    // padding: SIZES.padding,
    // marginVertical: SIZES.padding * 1,
    flex: 1,
  },
  searchListContainer: {
    marginVertical: SIZES.padding * 1,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 30,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  currentLocationContainer: {
    position: 'absolute',
    right: 20,
    // top: 130,
    bottom: 120,
    backgroundColor: COLORS.white3,
    padding: 2,
    borderRadius: 50,
  },
  saveButton: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: COLORS.primary,
    padding: SIZES.padding,
    height: 40,
    width: 200,
    borderRadius: SIZES.semiRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alayonLogo: {
    height: 50,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    // margin: 50,
    padding: SIZES.padding
  },
  alayonBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 20,
    width: 150,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    opacity: 0.7,
    padding: 20,
  },
  oval: {
    width: 200,
    height: 200,
    borderRadius: 200,
    backgroundColor: COLORS.white2,
    marginBottom: -175,
    transform: [{ scaleX: 4 }],
    zIndex: 0,
    elevation: 10
  },
  infoCard:  {
    elevation: 1,
    zIndex: 2,
    // padding: SIZES.padding,
    width: '100%',
    // borderTopLeftRadius: 150,
    // borderTopRightRadius: 200,
    // width: 500,
    // borderRadius: 150,
    // borderTopRightRadius: 50,
    backgroundColor: COLORS.white2
  },
});


export default Map1;