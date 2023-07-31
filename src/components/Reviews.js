//import liraries
import { React, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, FlatList, ScrollView, TouchableOpacity, Modal, RefreshControl } from 'react-native';
import { COLORS, FONTS, SIZES, icons, images, styles } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import Ratings from './Ratings';
import { getShopReviews, sendLikeReact } from '../redux/actions/customer.actions';






// create a component
export default function Reviews({ shop }) {
    const dispatch = useDispatch();
    const { user } = useSelector(({ auth }) => auth);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const { name, imgUrl } = useSelector(({ customer }) => customer);
    
        
    const [refreshing, setRefreshing] = useState(false);
    console.log(user, 'AUTH USER')
    
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // setReviews([]);
        handleGetReviews()
      }, []);
    
    const handleGetReviews = async () => {
        let newReviews = await dispatch(getShopReviews(shop))
        return setTimeout(() => {
            setReviews(newReviews)   
            setRefreshing(false)
          }, 2000);
    
    }

    const handleReact = async (item) => {

        let { shopId } = item;
        console.log('REACT THIS', item)
        setLoading(true)
        dispatch(sendLikeReact({ shopId, reviewId: item._id }))
            .then(a => {
                setLoading(false)
                if (a) {
                    return handleGetReviews()
                }
            })
            .catch(err => {
                console.log(err, 'REACT EROR')
                setLoading(false)

            })
    }




    function renderReviews(data) {
        const renderItem = ({ item }) => {
            console.log(item, "items thuis")
            return (
                <View
                    style={styles.container}
                >

                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', borderColor: COLORS.lightGray3, margin: SIZES.padding, borderWidth: 1, padding: SIZES.padding, borderRadius: SIZES.base }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <Image
                                source={icons.user}
                                style={{
                                    height: 50,
                                    width: 50,
                                    tintColor: COLORS.lightGray3,
                                }} />
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '90%', height: '100%'}}>
                                <View style={{ flexDirection: 'column', flex: 1, marginLeft: SIZES.padding * 1}}>
                                    <Text style={{
                                        fontSize: SIZES.base * 2,
                                        fontWeight: 'bold',
                                        color: COLORS.black
                                    }}
                                    >
                                        {item.name}
                                    </Text>
                                    <View style={{ flexDirection: 'row' }}>

                                        {/* <Rating
                                        stars={item.ratings}
                                        maxRating={5}
                                        size={25}
                                    /> */}
                                        <Ratings
                                            rating={item.ratings}
                                            iconStyle={{
                                                marginRight: 3
                                            }}
                                        />
                                    </View>


                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row'
                                    }}
                                >
                                    <TouchableOpacity
                                        
                                        disabled={loading}
                                        onPress={() => handleReact(item)}
                                    >
                                        <Image
                                            source={icons.likes}
                                            resizeMode='contain'
                                            style={{

                                                height: 20,
                                                width: 20,
                                                tintColor: item.likes.find(a => String(a) == String(user._id)) ? COLORS.primary : COLORS.black
                                            }}
                                        />
                                        

                                    </TouchableOpacity>
                                    <Text style={{
                                            ...FONTS.body4, marginLeft: SIZES.padding / 2
                                        }}>({item.likes.length})</Text>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        // marginHorizontal: SIZES.base
                                        marginLeft: SIZES.base
                                    }}
                                >
                                    <Image
                                        source={icons.dotsetting}
                                        resizeMode='contain'
                                        style={{

                                            height: 25,
                                            width: 25
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', margin: SIZES.padding2}}>
                                <Text style={{
                                    ...FONTS.body3,
                                    fontWeight: '600',
                                    color: COLORS.black
                                }}
                                >
                                    {item.message}
                                </Text>
                        </View>

                        <View style={{ flexDirection: 'row'}}>
                            {/* <View style={{ flexDirection: 'column', flex: 1, borderWidth: 1}}> */}
                                <Image
                                    source={images.shop4}
                                    resizeMode='contain'
                                    style={{
                                        height: 100,
                                        width: 100,
                                        marginHorizontal: SIZES.base / 2
                                    }}
                                />
                                
                            {/* </View> */}
                        </View>
                    </View>
                </View>
            )
        }
        return (
            <View>

                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    keyExtractor={(item) => item._id}
                    data={data}
                    vertical
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}

                />

            </View>
        )
    }

    useEffect(() => {
        handleGetReviews()

    }, [shop])


    return (
        <SafeAreaView>
            {renderReviews(reviews)}
        </SafeAreaView>
    );
};



// define your styles


//make this component available to the app

