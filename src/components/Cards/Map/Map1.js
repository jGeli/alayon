import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet
} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { COLORS, FONTS, GOOGLE_API_KEY, SIZES, constants, icons, images } from '../../../constants';
import dummyData from '../../../constants/dummyData';


const Map1 = ({ navigation, route }) => {
  const { order } = route.params;
  const mapView = useRef()

  const [region, setRegion] = useState(null)
  const [toLoc, setToLoc] = useState(null)
  const [fromLoc, setFromLoc] = useState(null)
  const [angle, setAngle] = useState(180)

  const [isReady, setIsReady] = useState(false)
  const [duration, setDuration] = useState('')

  useEffect(() => {
    // if (order) {
    let { shop: { location }, pickupDelivery, owner } = order;
    let initialRegion = {
      latitude: 11.231742101192534,
      longitude: 125.00245545087691,
      latitudeDelta: 0.0043,
      longitudeDelta: 0.0034
    }

    console.log(owner, 'OWNER')
    setRegion(initialRegion)
    setToLoc({ latitude: Number(location.latitude), longitude: Number(location.longitude) })
    setFromLoc({ latitude: Number(pickupDelivery.latitude), longitude: Number(pickupDelivery.longitude) })





  }, [order])

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
          <TouchableOpacity
            onPress={() => navigation.push('TestScreen', {})}
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
          </TouchableOpacity>
          <TouchableOpacity
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
          </TouchableOpacity>
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
            rotation={angle}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View style={styles.washing}>
              <Image
                source={icons.washingMachinePin}
                style={{ height: 55, width: 40 }}
              />
            </View>
          </Marker>
        }

        {
          toLoc &&
          <Marker
            key={'ToLoc'}
            coordinate={toLoc}
            tracksViewChanges={false}
            // icon={icons.myLocation}
            rotation={angle}
          // anchor={{ x: .4, y: 1.2 }}
          >
            <View style={styles.washing}>
              <Image
                source={icons.washingMachinePin}
                style={{ height: 55, width: 40 }}
              />
            </View>
          </Marker>

        }
        <MapViewDirections
          origin={fromLoc}
          destination={toLoc}
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

  function renderInfo() {
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
              >Static Address</Text>

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

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {renderMap()}

      {renderHeaderButtons()}

      {renderInfo()}

    </View>
  )
}

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