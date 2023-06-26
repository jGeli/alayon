
import React, { useState, useEffect } from "react";
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
    PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import polyline from '@mapbox/polyline';
import { icons } from "../../constants";
import { useSelector } from "react-redux";
import { gapikey } from "../../globals/env";

// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 11.195090;
const LONGITUDE = 125.002769;

// create a component
const Map3 = () => {
    const { shops } = useSelector(({ data }) => data);

    const [values, setValues] = useState({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        routeCoordinates: [],
        directRoute: [],
        distanceTravelled: 0,
        directDistance: 0,
        prevLatLng: {},
        coordinate: new AnimatedRegion({
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: 0,
            longitudeDelta: 0
        })
    })


    const getMapRegion = () => ({
        latitude: values.latitude,
        longitude: values.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });

    const calcDistance = newLatLng => {
        const { prevLatLng } = values;
        return haversine(prevLatLng, newLatLng) || 0;
    };




    const GetPolylineData = ({ latitude, longitude }) => {

        const { distanceTravelled } = values;



        axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${values.latitude},${values.longitude}&destination=${latitude},${longitude}&mode=driving&key=${gapikey}`)
            .then(response => {

                let distance = 0;
                let prev = {}


                let array = polyline.decode(response.data.routes[0].overview_polyline.points);

                let myCoords = array.map((point, index) => {
                    let newObj = {
                        latitude: point[0],
                        longitude: point[1]
                    }

                    distance = distance + haversine(index === 0 ? { latitude: values.latitude, longitude: values.longitude } : prev, newObj) || 0
                    prev = newObj;


                    return newObj
                }
                );

                setValues({
                    ...values, routeCoordinates: myCoords, distanceTravelled: distance,
                    directRoute: [{ latitude: values.latitude, longitude: values.longitude }, { latitude, longitude }],
                    directDistance: haversine({ latitude: values.latitude, longitude: values.longitude }, { latitude, longitude }) || 0

                })
            })

            .catch(error => {
                console.log('Error getting data: ' + error)
            })
            ;
    }

    const renderMarker = shops.map((a, index) => {
        const { latitude, longitude } = a.location;
        return (
            <Marker.Animated
                // draggable
                onPress={(e) => GetPolylineData(a.location)}
                key={index}
                coordinate={{
                    latitude: Number(latitude),
                    longitude: Number(longitude),
                }}

                description={'This is a description of the marker'}>
                <View style={styles.washing}>
                    <Image
                        source={icons.washingMachinePin}
                        style={{ height: 35, width: 25 }}
                    />
                </View>
            </Marker.Animated>
        );
    });



    useEffect(() => {

        const { coordinate } = values;

        this.watchID = Geolocation.watchPosition(
            position => {
                const { routeCoordinates, distanceTravelled } = values;
                const { latitude, longitude } = position.coords;

                const newCoordinate = {
                    latitude,
                    longitude
                };

                if (Platform.OS === "android") {
                    if (this.marker) {

                        this.marker.animateMarkerToCoordinate(
                            newCoordinate,
                            500
                        );
                    }
                } else {
                    coordinate.timing(newCoordinate).start();
                }

                setValues({
                    ...values,
                    latitude,
                    longitude,
                    routeCoordinates: routeCoordinates.concat([newCoordinate]),
                    distanceTravelled:
                        distanceTravelled + calcDistance(newCoordinate),
                    prevLatLng: newCoordinate
                });
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 10
            }
        );




        return () => {
            Geolocation.clearWatch(this.watchID);
        }
    }, [])


    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showUserLocation
                followUserLocation
                // loadingEnabled
                region={getMapRegion()}
            >
                <Polyline coordinates={values.routeCoordinates} strokeWidth={5} />
                <Polyline coordinates={values.directRoute} strokeWidth={5} />

                <Marker.Animated
                    ref={marker => {
                        this.marker = marker;
                    }}
                    coordinate={values.coordinate}
                />
                {renderMarker}
            </MapView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.bubble, styles.button]}>
                    <Text style={styles.bottomBarContent}>
                        {parseFloat(values.directDistance).toFixed(2)} km
                    </Text>
                    <Text style={styles.bottomBarContent}>
                        {parseFloat(values.distanceTravelled).toFixed(2)} km
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
    washing: {
        paddingVertical: 5,
        paddingHorizontal: 30,
        // backgroundColor: "#007bff",
        // borderColor: "#eee",
        // borderRadius: 5,
        elevation: 10,
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
export default Map3;
