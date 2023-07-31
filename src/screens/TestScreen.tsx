/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState, useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    PermissionsAndroid,
    Image
} from "react-native";
import MapView, {
    Marker,
    AnimatedRegion,
    Polyline,
    PROVIDER_GOOGLE,
    
} from "react-native-maps";
import haversine from "haversine";
import Geolocation from 'react-native-geolocation-service';
import socket from "../utils/socket";
import { computeHeading, getDirections, interpolatedPoint } from "../utils/helpers";
import { COLORS, images } from "../constants";

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 11.228703;
const LONGITUDE = 124.997525;

// create a component
const TestScreen = ({navigation, route}) => {
  let { shop: { location }, pickupDelivery, owner } = route.params.order;
  

    const [currentAngle, setCurrentAngle] = useState(0)
    const [state, setState] = useState({
             path: [],
            progress: [],
            velocity:  20,
            initialDate: new Date(),
            latitude: LATITUDE,
            longitude: LONGITUDE,
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            angle: 0,
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: 0,
                longitudeDelta: 0
            })    
    
    })

  const markerRef = useRef()    






    moveObject = () => {
      const distance = getDistance();
      console.log(distance, 'distance old');
      if (!distance) {
        return;
      }
  
      let progress = state.path.filter(
        (coordinates) => coordinates.distance < distance
      );
      
  
      const nextLine = state.path.find(
        (coordinates) => coordinates.distance > distance
      );
      
      
      // console.log('PROGRESS', progress, nextLine)
      if (!nextLine) {
        setState({...state, progress });
        return; // it's the end!
      }
      
      const lastLine = progress[progress.length - 1];
  
      const lastLineLatLng = lastLine
       
  
      const nextLineLatLng = nextLine
  
      // distance of this line
      const totalDistance = nextLine.distance - lastLine.distance;
      const percentage = (distance - lastLine.distance) / totalDistance;
  
      const position = interpolatedPoint(
        lastLineLatLng,
        nextLineLatLng,
        percentage
      );
  
      // if (Platform.OS === "android") {
      //               if (marker) {
      //                 marker?.animateMarkerToCoordinate(
      //                   position,
      //                   500
      //                 );
            
      //               }
      //           }
      
      
         //         setState({
        //             latitude,
        //             longitude,
        //             routeCoordinates: routeCoordinates.concat([newCoordinate]),
        //             distanceTravelled:
        //                 distanceTravelled + calcDistance(newCoordinate),
        //             prevLatLng: newCoordinate
        //         });
        
        
                
      progress = progress.concat(position);
      setState({ 
      ...state,
            progress,
                    distanceTravelled:
                        state.distanceTravelled + calcDistance(position),
                    prevLatLng: position
            });
    };
    












   const getMapRegion = () => ({
      latitude: state.latitude,
      longitude: state.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
  });

  const calcDistance = (newLatLng, prev) => {
      const prevLatLng = prev ? prev : state.prevLatLng;
      return haversine(prevLatLng, newLatLng) || 0;
  };
  
  const  getDistance = () => {
    // seconds between when the component loaded and now
    const differentInTime = (new Date() - state.initialDate) / 1000; // pass to seconds
    return differentInTime * state.velocity; // d = v*t -- thanks Newton!
  };
  

  const handleInitialDirection = () => {
    const { coordinate, latitude, longitude } = state;

  
    getDirections({latitude, longitude}, pickupDelivery)
    .then((coord) => {
      let path = coord.map((coordinates, i, array) => {
        if (i === 0) {
          return { ...coordinates, distance: 0 }; // it begins here!
        }
        // const { latitude: lat1, longitude: lng1 } = coordinates;
        const latLong1 = coordinates;
  
        // const { latitude: lat2, longitude: lng2 } = array[0];
        const latLong2 = array[0]
        // console.log(latLong1);
        // // in meters:
        let distance =  calcDistance(
          latLong1,
          latLong2
        );
  
      console.log(distance, 'DDIIS')
        // console.log(latLong2);
  
        return { ...coordinates, distance: distance * 1000 };
      })
          
          
      setState({...state, path, ...path[0]})

      // this.setState({routeCoordinates: path})
      this.interval = setInterval(moveObject, 1000);   //50000
      
      
    })
    .catch(err => {
      console.log(err, "COORD ERROR")
    })
  
  
  }



  useEffect(() => {
        handleInitialDirection()      
   
    return () => {
      clearInterval(this.interval)
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
      setCurrentAngle(actualAngle)
      // when it hasn't loaded, it's null
        // this.marker?.rotatation() = actualAngle
        // this.setState({
        //   angle: actualAngle
        // })
    }
    
  }, [state])



  return (
    <View style={styles.container}>
    <MapView
        customMapStyle={mapStyle}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showUserLocation
        followUserLocation
        loadingEnabled
        region={getMapRegion()}
        // onPress={(e) => {
           

        // }}
    >
{state.progress && state.progress.length > 1 && (
<>

        <Polyline coordinates={state.progress} strokeWidth={5} strokeColor={COLORS.primary} />
        <Marker.Animated
        flat
            anchor={{ x: 0.5, y: 0.4 }}
            rotation={currentAngle}
             ref={marker => {
                markerRef.current = marker;
            }}
            style={{ height: 55, width: 50 }}
            tracksViewChanges={false}
            coordinate={state.progress[state.progress.length - 1]}
            // image={{uri: images.rider}}
        >
        <View
          style={{
            transform: [{ rotate: `90deg` }],
          }}
        >
            <Image
              resizeMode='stretch'
              source={images.rider}
              style={{ height: 55, width: 40 }}
              />
              </View>
        </Marker.Animated>
                 
</>
)}

        <Marker.Animated
            tracksViewChanges={false}
            coordinate={  { latitude: Number(location.latitude), longitude: Number(location.longitude) }}
        />
        
        
        <Marker.Animated
            tracksViewChanges={false}
            coordinate={{ latitude: Number(pickupDelivery.latitude), longitude: Number(pickupDelivery.longitude) }}
        />
    </MapView>
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
                {parseFloat(state.distanceTravelled).toFixed(2)} km
            </Text>
        </TouchableOpacity>
    </View>
</View>
  );
};

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

// define your styles
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
},
map: {
    ...StyleSheet.absoluteFillObject
},
bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
},
latlng: {
    width: 200,
    alignItems: "stretch"
},
button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
},
buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
}
});

//make this component available to the app
export default TestScreen;
