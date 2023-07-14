//import liraries
import { React, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, FlatList, ScrollView, TouchableOpacity, Modal, RefreshControl } from 'react-native';
import { COLORS, FONTS, SIZES, icons, images, styles } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import { Rating } from 'react-native-stock-star-rating'
import Ratings from './Ratings';
import { getShopReviews, sendLikeReact } from '../redux/actions/customer.actions';






// create a component
export default function Reviews({ shop }) {
    const dispatch = useDispatch();
    const { user } = useSelector(({auth}) => auth);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
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
        
            let { shopId} = item;
             console.log('REACT THIS', item)   
        setLoading(true)
        dispatch(sendLikeReact({shopId, reviewId: item._id}))
        .then(a => {
            setLoading(false)
            if(a){
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

                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', borderWidth: 1, borderColor: COLORS.lightGray, margin: SIZES.padding2 }}>

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
                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <Text style={{

                                        fontSize: SIZES.base * 2,
                                        fontWeight: 'bold',
                                        color: COLORS.black
                                    }}
                                    >
                                        {item.postedBy.firstName}
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
                                                marginLeft: 3
                                            }}
                                        />
                                    </View>


                                </View>
                                <TouchableOpacity
                                style={{
                                flexDirection: 'row'
                                }}
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
<Text style={{...FONTS.body4, marginLeft: SIZES.padding
}}>({item.likes.length})</Text>
                                    
                                </TouchableOpacity>
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

