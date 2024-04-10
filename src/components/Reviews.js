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
        setReviews([]);
        setRefreshing(true);
        setLoading(true)
        handleGetReviews()
      }, []);
    
    const handleGetReviews = async () => {
        let newReviews = await dispatch(getShopReviews(shop))
        console.log(newReviews, "NEWNEWNEWN")
        return setTimeout(() => {
            setReviews(newReviews)   
            setLoading(false)
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

    useEffect(() => {
    setLoading(true)
        handleGetReviews()

    }, [shop])
    



    // function renderReviews(data) {

    //     return (
                
                
    //     )
    //     }

    console.log(reviews, "SHOP")

    return (
        <SafeAreaView style={{...styles.container}}>

            {
                loading ? 
                (
                <View style={{ flex: 1, ustifyContent: 'center', alignItems: 'center'}}>
                    <Image 
                        source={icons.loader}
                        style={{ height: 40, width: 40,}}
                    />
</View>
                )
                :
                (
            reviews.map((item, index) => (
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', borderColor: COLORS.lightGray3, margin: SIZES.padding, borderWidth: 1, padding: SIZES.padding, borderRadius: SIZES.base }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={{ uri: item.imgUrl !== null ? item?.imgUrl : 'https://files.bugtech.online/api/v1/files/download/6606c10ce0c8154f4b8d1fa7'}}
                        style={{
                            height: 45,
                            width: 45,
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
                    <View style={{ flexDirection: 'column', flex: 1, borderWidth: 1, padding: 10}}>
                        <Image
                            source={icons.uploadImage}
                            resizeMode='contain'
                            style={{
                                height: 45,
                                width: 45,
                                opacity: .6,
                                marginHorizontal: SIZES.base / 2
                            }}
                        />
                        
                    </View>
                </View>
            </View>
            ))
                )
            }
            
        </SafeAreaView>
    );
};



// define your styles


//make this component available to the app

