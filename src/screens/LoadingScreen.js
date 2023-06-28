//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { COLORS, SIZES, images } from '../constants';

// create a component
const LoadingScreen = () => {
    return (
        <SafeAreaView
            style={{
                backgroundColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1,
            }}
        >
            
            <Image 
                source={images.setLoading}
                resizeMode='contain'
                style={{
                    height: 100,
                    width: SIZES.width
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
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default LoadingScreen;
