import { React, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, ScrollView } from 'react-native'
import {
  COLORS, FONTS, SIZES, icons, styles, constants
} from '../../constants'
import { userData, userData2, myAccount, userData4 } from '../../globals/data'
import axios from 'axios'
import { FormInput } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getShopById } from '../../redux/actions/merchant.actions'
import { RatingInput } from 'react-native-stock-star-rating'
import { createShopReview } from '../../redux/actions/customer.actions'

const varEnv = constants.varEnv;

export default function CustomerReviewScreen({ navigation, route }) {

  let { shop } = route.params;
  const dispatch = useDispatch();
  const { user } = useSelector(({ auth }) => auth)
  const [details, setDetails] = useState({});
  const [rating, setRating] = useState(0);




  const handleShopDetails = async (e) => {

    let shopDetails = await dispatch(getShopById(shop))

    // setDetails(shopDetails)
    console.log(shopDetails, "SHOP DETALYEEE")

    setDetails(shopDetails.data)



  }

  console.log(details, "DETAILS HERE EFFECT!")

  useEffect(() => {

    handleShopDetails()

  }, []);





  console.log("ratings", rating)
  const [value, setValue] = useState([]);


  const handleSubmit = (e) => {
    const payload = {
      ratings: rating,
      message: value
    }
    console.log(payload, "payload")
    dispatch(createShopReview(shop, {message: value, ratings: rating }))
    .then(res => {
      console.log(res, 'REVIEW RESPONSE');
      navigation.goBack()
    });

  }

  console.log(shop)

  function renderHeader() {
    return (
      <View
        style={style.header}>
        <TouchableOpacity
          style={{ margin: SIZES.padding, marginRight: SIZES.padding * 2 }}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            style={{ height: 20, width: 20, tintColor: COLORS.primary }}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...FONTS.body2,
            color: COLORS.black,
            // fontWeight: 'bold',
          }}>
          RATE US
        </Text>

        <View></View>
      </View>
    );
  }


  function renderShop() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 50,

        }}>
        <View
          style={{
            borderRadius: SIZES.radius,
            height: 100,
            width: 100,
            backgroundColor: COLORS.lightGray3
          }}
        >
          <Image
            source={{ uri: details?.bannerUrl }}
            resizeMode='contain'
            style={{
              height: 100,
              width: 100,
              // height: 40,
              // width: 40,
              borderRadius: SIZES.radius
            }}
          />
        </View>

        <Text
          style={{ ...FONTS.h3, marginVertical: SIZES.padding * 3 }}
        >
          {details?.shop_name}
        </Text>
      </View>
    );
  }
  function renderForm() {
    return (
      <View
        style={{
          width: SIZES.width,
          flexDirection: 'column',
          alignItems: "center",
          justifyContent: 'space-between'
          
        }}
      >
        <RatingInput
          rating={rating}
          setRating={setRating}
          maxStars={5}
          size={50}

        />
        <Text
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          Please give us a feedback!
        </Text>
        <FormInput
          containerStyle={{
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          value={value}
          onChange={e => setValue(e)}
          onSubmitEditing={handleSubmit}
        />
      
      </View>
    )
  }


  return (
    <SafeAreaView

    >
    <ScrollView
  style={{paddingBottom: SIZES.padding * 3}}
    >
    <View 
      style={{flex: 1}}
    >
      {renderHeader()}
      {renderShop()}
      {renderForm()}
      </View>
      <View style={{ flexGrow: 1, marginVertical: SIZES.padding * 2, width: '100%', alignItems: 'center', justifyContent: 'center' }}>

<TouchableOpacity
  activeOpacity={0.7}
  style={{

    backgroundColor: COLORS.primary,
    borderRadius: SIZES.semiRadius,
    width: '50%',
    // margin: SIZES.padding

  }}
  onPress={handleSubmit}>
  <Text
    style={{
      textAlign: 'center',
      padding: SIZES.padding,
      fontSize: SIZES.base * 3,
      fontWeight: '700',
      color: COLORS.white,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    SUBMIT
  </Text>
</TouchableOpacity>
</View>
</ScrollView>
    </SafeAreaView>
  )
}


// define your styles
const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: COLORS.lightGray3,
    paddingBottom: SIZES.padding * 3,
    alignItems: 'center'
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    elevation: 5,
    width: '100%'
  },

});

