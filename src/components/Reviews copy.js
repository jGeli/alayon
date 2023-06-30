//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, SIZES, icons, images, styles } from '../constants';
import { userData5 } from '../globals/data';
import axios from 'axios';

// create a component
export default function Reviews() {


    return (
        <View
            style={styles.container}>

            <View style={{ flexDirection: 'column', alignItems: 'flex-start', borderWidth: 1, borderColor: COLORS.lightGray, margin: SIZES.padding2 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={userData5.imageUrl}
                        resizeMode="contain"
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 200,
                            marginRight: 10,

                        }}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                        <View style={{ flexDirection: 'column', flex: 1, }}>
                            <Text style={{
                                fontSize: SIZES.base * 2,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}
                            >
                                {userData5.firstName + ' ' + userData5.lastName}
                            </Text>

                            <Image
                                source={icons.stars}
                                resizeMode='contain'
                                style={{
                                    height: 20,
                                    width: 80
                                }}
                            />

                        </View>

                        <Image
                            source={icons.likes}
                            resizeMode='contain'
                            style={{

                                height: 25,
                                width: 25
                            }}
                        />
                        <Image
                            source={icons.dotsetting}
                            resizeMode='contain'
                            style={{

                                height: 25,
                                width: 25
                            }}
                        />

                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: SIZES.padding2 }}>
                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <Text style={{
                            fontSize: SIZES.base * 2,
                            fontWeight: '600',
                            color: COLORS.black
                        }}
                        >
                            {userData5.review}
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', margin: SIZES.padding2, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Image
                            source={images.shop4}
                            resizeMode='contain'
                            style={{
                                height: 100,
                                width: 100
                            }}
                        />
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', borderWidth: 1, borderColor: COLORS.lightGray, margin: SIZES.padding2 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={userData5.imageUrl}
                        resizeMode="contain"
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 200,
                            marginRight: 10,

                        }}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                        <View style={{ flexDirection: 'column', flex: 1, }}>
                            <Text style={{
                                fontSize: SIZES.base * 2,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}
                            >
                                {userData5.firstName + ' ' + userData5.lastName}
                            </Text>

                            <Image
                                source={icons.stars}
                                resizeMode='contain'
                                style={{
                                    height: 20,
                                    width: 80
                                }}
                            />

                        </View>

                        <Image
                            source={icons.likes}
                            resizeMode='contain'
                            style={{

                                height: 25,
                                width: 25
                            }}
                        />
                        <Image
                            source={icons.dotsetting}
                            resizeMode='contain'
                            style={{

                                height: 25,
                                width: 25
                            }}
                        />

                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: SIZES.padding2 }}>
                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                        <Text style={{
                            fontSize: SIZES.base * 2,
                            fontWeight: '600',
                            color: COLORS.black
                        }}
                        >
                            {userData5.review}
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', margin: SIZES.padding2, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Image
                            source={images.shop7}
                            resizeMode='contain'
                            style={{
                                height: 100,
                                width: 100
                            }}
                        />
                    </View>
                </View>
            </View>
        </View>

    );
};



// define your styles


//make this component available to the app

