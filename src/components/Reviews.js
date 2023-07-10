//import liraries
import { React, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, icons, images, styles } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import { Rating } from 'react-native-stock-star-rating'






// create a component
export default function Reviews() {
    const { selectedShop } = useSelector(({ data }) => data);
   
    
    console.log(selectedShop.reviews, "selectedShop")
    
    const handleReact = async (e) => {
        let selectedShop = await dispatch(getShopDetails(shop))
        e.preventDefault();
    }

  
      
    function renderReviews() {
        const renderItem = ({ item }) => {
            console.log(item, "items")
            return (
                <View
                    style={styles.container}>

                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', borderWidth: 1, borderColor: COLORS.lightGray, margin: SIZES.padding2}}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={item.imgUrl}
                                resizeMode="contain"
                                style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 200,
                                    marginRight: 10,

                                }}
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                                <View style={{ flexDirection: 'column', flex: 1}}>
                                    <Text style={{
                                        
                                        fontSize: SIZES.base * 2,
                                        fontWeight: 'bold',
                                        color: COLORS.black
                                    }}
                                    >
                                        {item.name}
                                    </Text>
                                    <View style={{ flexDirection: 'row'}}>

                                    <Rating
                                        stars={item.ratings}
                                        maxRating={5}
                                        size={25}
                                    />
                                    </View>

                                  
                                </View>
                                <TouchableOpacity>
                                    <Image
                                        source={icons.likes}
                                        resizeMode='contain'
                                        style={{
                                           
                                            height: 25,
                                            width: 25
                                        }}
                                    />
                                </TouchableOpacity>
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
                                    {item.message}
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
                                source={item.imageUrl}
                                resizeMode="contain"
                                style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 200,
                                    marginRight: 10,

                                }}
                            />
                        </View>
                    </View>
                </View>
            )
        }
        return (
            <View>
           
            <FlatList
                keyExtractor={(item, index) => `${index}`}
                data={selectedShop.reviews}
                vertical
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                
            />
            
            </View>
        )
    }


    return (
        <SafeAreaView>
            <ScrollView>
                {renderReviews()}
            </ScrollView>
        </SafeAreaView>
    );
};



// define your styles


//make this component available to the app

