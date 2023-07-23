//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { COLORS, SIZES, images } from '../constants';

// create a component
const LoadingScreen = ({ source, style }) => {
    return (
        <SafeAreaView
            style={{

                height: '100%',
                position: 'absolute',
                backgroundColor: COLORS.lightGray1,
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1,
                zIndex: 100,
                ...style

            }}
        >

            <Image
                source={source ? source : images.loadingDots}
                resizeMode='contain'
                style={{
                    height: 50,
                    width: SIZES.width,
                }}
            />

        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default LoadingScreen;
