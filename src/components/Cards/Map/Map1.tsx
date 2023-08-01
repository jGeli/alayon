import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet
} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE, AnimatedRegion } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import haversine from "haversine";

import { COLORS, FONTS, GOOGLE_API_KEY, SIZES, constants, icons, images } from '../../../constants';
import socket from '../../../utils/socket';
import { computeHeading } from '../../../utils/helpers';

let initialRegion = {
  latitude: 11.231742101192534,
  longitude: 125.00245545087691,
  latitudeDelta: 0.0043,
  longitudeDelta: 0.0034
}


const Map1 = ({ navigation, route }) => {
  const { order } = route.params;
  const mapView = useRef();
  const markerRef = useRef();
  const [mapState, setMapState] = useState({
    
    watchCount: 0,
    latitude: initialRegion.latitude,
    longitude: initialRegion.longitude,
    routeCoordinates: [],
    distanceTravelled: 0,
    prevLatLng: {},
    coordinate: new AnimatedRegion({
      latitude: initialRegion.latitude,
      longitude: initialRegion.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0
    })
  })
  const [state, setState] = useState({
      progress: [],
      nextLine: null
  });
  const [region, setRegion] = useState(null);
  const [toLoc, setToLoc] = useState(null)
  const [fromLoc, setFromLoc] = useState(null)
  const [angle, setAngle] = useState(0)
  const [riderLoc, setRiderLoc] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const [duration, setDuration] = useState('')



  useEffect(() => {
    // if (order) {

    let { shop: { location }, pickupDelivery, owner } = order;
    setRegion(initialRegion)
    setRiderLoc(initialRegion)
    setToLoc({ latitude: Number(location.latitude), longitude: Number(location.longitude) })
    setFromLoc({ latitude: Number(pickupDelivery.latitude), longitude: Number(pickupDelivery.longitude) })


    // this.watchID = Geolocation.watchPosition(
    //   position => {
    //     const { latitude, longitude } = position.coords;

    //     const newCoordinate = {
    //       latitude,
    //       longitude
    //     };

    //     if (Platform.OS === "android") {
    //       if (markerRef.current) {
    //         markerRef.current?.animateMarkerToCoordinate(
    //           newCoordinate,
    //           500
    //         );
    //       }
    //     } else {
    //       // coordinate.timing(newCoordinate).start();
    //     }
    //     setMapState((prevState) => {
    //       return ({
    //         ...prevState,
    //         watchCount: prevState.watchCount + 1,
    //         latitude,
    //         longitude,
    //         routeCoordinates: prevState.routeCoordinates.concat([newCoordinate]),
    //         distanceTravelled:
    //           prevState.distanceTravelled + calcDistance(newCoordinate),
    //         prevLatLng: newCoordinate
    //       })
    //     });
    //   },
    //   error => console.log(error),
    //   {
    //     enableHighAccuracy: true,
    //     timeout: 20000,
    //     maximumAge: 1000,
    //     distanceFilter: 10
    //   }
    // );
  
    socket.emit('trackConnect', {orderId: order._id})
  
    socket.on('liveTrack', (data) => {
      let liveData = data.coordinate;
      // Alert.alert('TRACKING NOW!', JSON.stringify(data))
      if(!riderLoc && liveData){
        // Alert.alert(' SET RIDER LOCATION', JSON.stringify(liveData), JSON.stringify(riderLoc))
        setRiderLoc(liveData)
      }
      
      if (Platform.OS === "android") {
        if (markerRef.current && riderLoc) {
          
          markerRef.current?.animateMarkerToCoordinate(
            liveData,
            500
          );
        }
      }
     
      setState({...data.state, angle: data.actualAngle})
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


    return () => {
      // Geolocation.clearWatch(this.watchID);
    }


  }, [])
  
  
  useEffect(() => {
    const distance = getDistance();

    if (!distance) {
        return;
    }

    let progress = state.path.filter(
        coordinates => coordinates.distance < distance
    );

    const nextLine = state.path.find(
        coordinates => coordinates.distance > distance
    );

    let point1, point2;

    if (nextLine) {
        point1 = progress[progress.length - 1];
        point2 = nextLine;
    } else {
        // it's the end, so use the latest 2
        point1 = progress[progress.length - 2];
        point2 = progress[progress.length - 1];
    }

    const point1LatLng = point1;
    const point2LatLng = point2;


    const angle = computeHeading(
        point1LatLng,
        point2LatLng
    );

    const actualAngle = angle - 90;

    
    if (markerRef.current) {
        // currentAngle = actualAngle;
        setAngle(actualAngle)
        // socket.emit('liveTrack', { orderId: _id, coordinate: state.prevLatLng, state, actualAngle })
        // when it hasn't loaded, it's null
        // this.marker?.rotatation() = actualAngle
        // this.setState({
        //   angle: actualAngle
        // })
    }

}, [riderLoc])

const getDistance = () => {
  // seconds between when the component loaded and now
  const differentInTime = (new Date() - state.initialDate) / 1000; // pass to seconds
  return differentInTime * state.velocity; // d = v*t -- thanks Newton!
};




  function calculateAngle(coordinates) {
    let startLat = coordinates[0]["latitude"]
    let startLng = coordinates[0]["longitude"]
    let endLat = coordinates[1]["latitude"]
    let endLng = coordinates[1]["longitude"]
    let dx = endLat - startLat
    let dy = endLng - startLng

    return Math.atan2(dy, dx) * 180 / Math.PI
  }



  function calcDistance(newLatLng) {
    const { prevLatLng } = mapState;
    return haversine(prevLatLng, newLatLng) || 0;
  };

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
          onPress={() => navigation.goBack()}
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

  function renderMap() {
    return (
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
            key={'FromLoc'}
            coordinate={fromLoc}
            tracksViewChanges={false}
            // icon={images.deliveryMan}
            anchor={{ x: 0.5, y: 0.5 }}
          >
          
          </Marker>
        }

        {/* <Marker.Animated
          ref={markerRef}
          coordinate={mapState.coordinate}
        /> */}
     
        {
          toLoc &&
          <Marker
            coordinate={toLoc}
            tracksViewChanges={false}
            // icon={icons.myLocation}
          // anchor={{ x: .4, y: 1.2 }}
          >
          </Marker>

        }
           {state.progress && state.progress.length > 1 && ( 
         <Marker.Animated
          flat
          anchor={{ x: 0.5, y: 0.4 }}
          rotation={angle}
          ref={marker => {
            markerRef.current = marker;
        }}
        style={{ height: 55, width: 50 }}
        coordinate={state.progress[state.progress.length - 1]}
        tracksViewChanges={false}
        
        >
 <View   style={{  transform: [{ rotate: `90deg` }]   }}
                            >
                                <Image
                                    resizeMode='stretch'
                                    source={images.rider}
                                    style={{ height: 55, width: 40 }}
                                />
                            </View>
        </Marker.Animated>  
           )}
        {riderLoc && <>

        <MapViewDirections
          origin={riderLoc}
          destination={toLoc}
          apikey={GOOGLE_API_KEY}
          strokeWidth={0}

          strokeColor={COLORS.danger}
          optimizeWaypoints={false}
          onReady={result => {
            setDuration(Math.ceil(result.duration))

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
        </>}
        
        <MapViewDirections
          origin={toLoc}
          destination={fromLoc}
          apikey={GOOGLE_API_KEY}
          strokeWidth={5}
          strokeColor={COLORS.primary}
          optimizeWaypoints={false}
          onReady={result => {
            setDuration(Math.ceil(result.duration))

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
    )
  }

  const renderInfo = (mapVal) => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%'
        }}
      >
        {/* Info Container */}
        <View
          style={{
            padding: SIZES.padding,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: COLORS.white
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Image
              source={icons.clock}
              resizeMode='contain'
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.black
              }}
            />
            <View
              style={{
                marginLeft: SIZES.padding
              }}
            >
              <Text
                style={{
                  color: COLORS.gray, ...FONTS.body4
                }}
              >Your Delivery Time</Text>
              <Text
                style={{ ...FONTS.h3 }}
              >
                {duration} minutes
              </Text>

            </View>

          </View>
          {/* Address */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: SIZES.padding
            }}
          >
            <Image
              source={icons.focus}
              resizeMode='contain'
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.black
              }}
            />

            <View
              style={{
                marginLeft: SIZES.padding
              }}
            >
              <Text
                style={{
                  color: COLORS.gray, ...FONTS.body4
                }}
              >Your Address</Text>
              <Text
                style={{
                  ...FONTS.h3
                }}
              >{parseFloat(mapVal.distanceTravelled).toFixed(2)} km -
                {mapVal.watchCount}
              </Text>

            </View>

          </View>
          {/* Delivery Man Details */}
          <TouchableOpacity
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

          </TouchableOpacity>
        </View>

      </View>
    )
  }
  
  console.log(state.progress.length, 'STATE PROGRESS')

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {renderMap()}

      {renderHeaderButtons()}

      {renderInfo(mapState)}

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
});


export default Map1;