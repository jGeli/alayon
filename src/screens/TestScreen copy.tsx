/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
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


// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 11.228703;
const LONGITUDE = 124.997525;
// const LATITUDE = defPath[0].latitude;
// const LONGITUDE = defPath[0].longitude;
// let { shop: { location }, pickupDelivery, owner } = order;
// let { coordinate } = mapState;
// setRegion(initialRegion)
// setRiderLoc(initialRegion)
// setToLoc({ latitude: Number(location.latitude), longitude: Number(location.longitude) })
// setFromLoc({ latitude: Number(pickupDelivery.latitude), longitude: Number(pickupDelivery.longitude) })


class Map2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: [],
            progress: [],
            velocity:  5,
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
        };
    }

    componentDidMount() {
      let { shop: { location }, pickupDelivery, owner } = this.props.route.params.order;

        const { coordinate, latitude, longitude } = this.state;


        // this.watchID = Geolocation.watchPosition(
        //     position => {
        //         const { routeCoordinates, distanceTravelled } = this.state;
        //         const { latitude, longitude } = position.coords;

        //         const newCoordinate = {
        //             latitude,
        //             longitude
        //         };

        //         if (Platform.OS === "android") {
        //             if (this.marker) {
        //                 this.marker.animateMarkerToCoordinate(
        //                     newCoordinate,
        //                     500
        //                 );
        //             }
        //         } else {
        //             coordinate.timing(newCoordinate).start();
        //         }

        //         this.setState({
        //             latitude,
        //             longitude,
        //             routeCoordinates: routeCoordinates.concat([newCoordinate]),
        //             distanceTravelled:
        //                 distanceTravelled + this.calcDistance(newCoordinate),
        //             prevLatLng: newCoordinate
        //         });

        //         socket.emit('liveTrack', newCoordinate)

        //     },
        //     error => console.log(error),
        //     {
        //         enableHighAccuracy: true,
        //         timeout: 20000,
        //         maximumAge: 1000,
        //         distanceFilter: 10
        //     }
        // );

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
            let distance =  this.calcDistance(
              latLong1,
              latLong2
            );
      
          console.log(distance, 'DDIIS')
            // console.log(latLong2);
      
            return { ...coordinates, distance: distance * 1000 };
          })
              
              
          this.setState({path, ...path[0]})

          // this.setState({routeCoordinates: path})
          
          
        })
        .catch(err => {
          console.log(err, "COORD ERROR")
        })

        // this.watchID = navigator.geolocation.watchPosition(
        //     position => {
        //         const { routeCoordinates, distanceTravelled } = this.state;
        //         const { latitude, longitude } = position.coords;

        //         const newCoordinate = {
        //             latitude,
        //             longitude
        //         };

        //         if (Platform.OS === "android") {
        //             if (this.marker) {
        //                 this.marker._component.animateMarkerToCoordinate(
        //                     newCoordinate,
        //                     500
        //                 );
        //             }
        //         } else {
        //             coordinate.timing(newCoordinate).start();
        //         }

        //         this.setState({
        //             latitude,
        //             longitude,
        //             routeCoordinates: routeCoordinates.concat([newCoordinate]),
        //             distanceTravelled:
        //                 distanceTravelled + this.calcDistance(newCoordinate),
        //             prevLatLng: newCoordinate
        //         });
        //     },
        //     error => console.log(error),
        //     {
        //         enableHighAccuracy: true,
        //         timeout: 20000,
        //         maximumAge: 1000,
        //         distanceFilter: 10
        //     }
        // );
        
        this.interval = setInterval(this.moveObject, 1000);   //50000
        
        
    }



    componentWillUnmount() {
        // navigator.geolocation.clearWatch(this.watchID);
        clearInterval(this.interval)
        Geolocation.clearWatch(this.watchID);
    }
    
    moveObject = () => {
      const distance = this.getDistance();
      // console.log(distance, 'distance old');
      if (!distance) {
        return;
      }
  
      let progress = this.state.path.filter(
        (coordinates) => coordinates.distance < distance
      );
      
  
      const nextLine = this.state.path.find(
        (coordinates) => coordinates.distance > distance
      );
      
      
      // console.log('PROGRESS', progress, nextLine)
      if (!nextLine) {
        this.setState({ progress });
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
      //               if (this.marker) {
      //                 this.marker?.animateMarkerToCoordinate(
      //                   position,
      //                   500
      //                 );
            
      //               }
      //           }
      
      
         //         this.setState({
        //             latitude,
        //             longitude,
        //             routeCoordinates: routeCoordinates.concat([newCoordinate]),
        //             distanceTravelled:
        //                 distanceTravelled + this.calcDistance(newCoordinate),
        //             prevLatLng: newCoordinate
        //         });
        
        
                
      progress = progress.concat(position);
      this.setState({ 
            progress,
                    distanceTravelled:
                        this.state.distanceTravelled + this.calcDistance(position),
                    prevLatLng: position
            });
    };
    
    currentAngle = 0
    componentDidUpdate = () => {
      const distance = this.getDistance();
      if (!distance) {
        return;
      }
  
      let progress = this.state.path.filter(
        coordinates => coordinates.distance < distance
      );
  
      const nextLine = this.state.path.find(
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
      
      console.log(angle, 'ANGLE')
      console.log(point1LatLng, point2LatLng, 'POINTS')
      const actualAngle = angle - 90;
  
  
      if (this.marker) {
        this.currentAngle = actualAngle;
        // when it hasn't loaded, it's null
          // this.marker?.rotatation() = actualAngle
          // this.setState({
          //   angle: actualAngle
          // })
      }
    };
    
    

    getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });

    calcDistance = (newLatLng, prev) => {
        const prevLatLng = prev ? prev : this.state.prevLatLng;
        return haversine(prevLatLng, newLatLng) || 0;
    };
    
    getDistance = () => {
      // seconds between when the component loaded and now
      const differentInTime = (new Date() - this.state.initialDate) / 1000; // pass to seconds
      return differentInTime * this.state.velocity; // d = v*t -- thanks Newton!
    };

    render() {
    let { shop: { location }, pickupDelivery, owner } = this.props.route.params.order;
    
      console.log(this.currentAngle, 'ANGLE')
        return (
            <View style={styles.container}>
                <MapView
                    customMapStyle={mapStyle}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    showUserLocation
                    followUserLocation
                    loadingEnabled
                    region={this.getMapRegion()}
                    // onPress={(e) => {
                       

                    // }}
                >
 {this.state.progress && this.state.progress.length > 1 && (
          <>
     
                    <Polyline coordinates={this.state.progress} strokeWidth={5} strokeColor={COLORS.primary} />
                    <Marker.Animated
                    flat
                        anchor={{ x: 0.5, y: 0.4 }}
                        rotation={this.currentAngle}
                         ref={marker => {
                            this.marker = marker;
                        }}
                        style={{ height: 55, width: 50 }}
                        tracksViewChanges={false}
                        coordinate={this.state.progress[this.state.progress.length - 1]}
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
                            {parseFloat(this.state.distanceTravelled).toFixed(2)} km
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
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

export default Map2;
